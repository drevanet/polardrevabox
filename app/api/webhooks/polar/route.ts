
import { NextRequest, NextResponse } from "next/server";
import { webhooks } from "@polar-sh/sdk/2026-10";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const allowedPlans = ["monthly", "biweekly", "yearly"];

export async function POST(req: NextRequest) {
  const secret = process.env.POLAR_WEBHOOK_SECRET;

  if (!secret) {
    console.error("POLAR_WEBHOOK_SECRET is missing.");

    return NextResponse.json(
      { error: "Webhook is not configured." },
      { status: 500 }
    );
  }

  // Verify the original request body and webhook signature.
  let event: any;

  try {
    const rawBody = await req.text();

    const headers = {
      "webhook-id": req.headers.get("webhook-id") ?? "",
      "webhook-timestamp":
        req.headers.get("webhook-timestamp") ?? "",
      "webhook-signature":
        req.headers.get("webhook-signature") ?? "",
    };

    event = await webhooks.validateEvent(
      rawBody,
      headers,
      secret
    );
  } catch (error) {
    console.error(
      "Polar signature verification failed:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      { error: "Invalid webhook signature." },
      { status: 403 }
    );
  }

  try {
    console.log("Received Polar event:", event.type);

    const allowedEvents = [
      "subscription.created",
      "subscription.updated",
      "subscription.active",
      "subscription.canceled",
      "subscription.uncanceled",
      "subscription.revoked",
      "subscription.past_due",
    ];

    if (!allowedEvents.includes(event.type)) {
      return NextResponse.json({ received: true });
    }

    const d = event.data;

    if (!d?.id || !d?.product_id) {
      console.error("Missing subscription details:", {
        eventType: event.type,
        hasSubscriptionId: Boolean(d?.id),
        hasProductId: Boolean(d?.product_id),
      });

      return NextResponse.json(
        { error: "Missing subscription details." },
        { status: 400 }
      );
    }

    // Resolve the subscription plan.
    const productPlans: Record<string, string | undefined> = {
      [process.env.POLAR_PRODUCT_MONTHLY ?? ""]: "monthly",
      [process.env.POLAR_PRODUCT_BIWEEKLY ?? ""]: "biweekly",
      [process.env.POLAR_PRODUCT_YEARLY ?? ""]: "yearly",
    };

    const metadataPlan = d?.metadata?.plan;

    const plan =
      typeof metadataPlan === "string" &&
      allowedPlans.includes(metadataPlan)
        ? metadataPlan
        : productPlans[d.product_id];

    if (!plan || !allowedPlans.includes(plan)) {
      console.error("Unknown Polar product or plan:", {
        productId: d.product_id,
        plan: metadataPlan ?? null,
      });

      return NextResponse.json(
        { error: "Unknown subscription product." },
        { status: 400 }
      );
    }

    // Get the exact database user ID from Polar.
    const externalId =
      d?.customer?.external_id ??
      d?.external_customer_id ??
      d?.metadata?.userId ??
      null;

    const customerEmail =
      d?.customer?.email ??
      d?.customer_email ??
      null;

    let user: { id: string; email: string } | null = null;

    // First attempt: match the exact database user ID.
    if (externalId) {
      user = await prisma.user.findUnique({
        where: {
          id: String(externalId),
        },
        select: {
          id: true,
          email: true,
        },
      });
    }

    // Fallback: email is safe only if exactly one account matches.
    if (!user && customerEmail) {
      const matchingUsers = await prisma.user.findMany({
        where: {
          email: String(customerEmail).trim().toLowerCase(),
        },
        select: {
          id: true,
          email: true,
        },
        take: 2,
        orderBy: {
          createdAt: "desc",
        },
      });

      if (matchingUsers.length === 1) {
        user = matchingUsers[0];
      } else if (matchingUsers.length > 1) {
        console.error(
          "Multiple accounts share this email. Polar external customer ID is required.",
          {
            customerEmail,
            matchingAccounts: matchingUsers.length,
          }
        );

        return NextResponse.json(
          {
            error:
              "Multiple accounts found. Checkout must include the correct external customer ID.",
          },
          { status: 409 }
        );
      }
    }

    if (!user) {
      console.error("Drevasports Polar user mapping failed:", {
        eventType: event.type,
        subscriptionId: d.id,
        productId: d.product_id,
        externalId: externalId ? String(externalId) : null,
        hasCustomerEmail: Boolean(customerEmail),
      });

      return NextResponse.json(
        {
          error:
            "User not found. Check Polar external customer ID mapping.",
        },
        { status: 404 }
      );
    }

    // Map Polar event to application subscription status.
    const statuses: Record<string, string> = {
      "subscription.created": d.status ?? "inactive",
      "subscription.updated": d.status ?? "inactive",
      "subscription.active": "active",
      "subscription.canceled": "canceled",
      "subscription.uncanceled": "active",
      "subscription.revoked": "revoked",
      "subscription.past_due": "past_due",
    };

    const status = statuses[event.type];

    const periodStart = d.current_period_start
      ? new Date(d.current_period_start)
      : null;

    const periodEnd = d.current_period_end
      ? new Date(d.current_period_end)
      : null;

    const customerId =
      d.customer_id ?? d.customer?.id ?? null;

    // Create or update the user's subscription.
    await prisma.subscription.upsert({
      where: {
        userId: user.id,
      },

      create: {
        userId: user.id,
        polarCustomerId: customerId,
        polarSubscriptionId: d.id,
        polarProductId: d.product_id,
        planKey: plan,
        status,
        downloadCount: 0,
        periodStart,
        periodEnd,
      },

      update: {
        polarCustomerId: customerId ?? undefined,
        polarSubscriptionId: d.id,
        polarProductId: d.product_id,
        planKey: plan,
        status,
        periodStart,
        periodEnd,
      },
    });

    console.log("Drevasports subscription updated successfully:", {
      userId: user.id,
      plan,
      status,
      subscriptionId: d.id,
    });

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Polar webhook processing failed:", error);

    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
