
import { NextRequest, NextResponse } from "next/server";
import { webhooks } from "@polar-sh/sdk/2026-10";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedPlans = ["monthly", "biweekly", "yearly"];

const allowedEvents = [
  "subscription.created",
  "subscription.updated",
  "subscription.active",
  "subscription.canceled",
  "subscription.uncanceled",
  "subscription.revoked",
  "subscription.past_due",
];

export async function POST(req: NextRequest) {
  const secret = process.env.POLAR_WEBHOOK_SECRET;

  if (!secret) {
    console.error("POLAR_WEBHOOK_SECRET is missing.");

    return NextResponse.json(
      { error: "Webhook is not configured." },
      { status: 500 }
    );
  }

  // 1. Verify Polar webhook signature.
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

    // 2. Ignore unrelated events.
    if (!allowedEvents.includes(event.type)) {
      return NextResponse.json({ received: true });
    }

    const d = event.data;

    if (!d?.id || !d?.product_id) {
      console.error("Missing subscription information.");

      return NextResponse.json(
        { error: "Missing subscription details." },
        { status: 400 }
      );
    }

    // 3. Identify the subscription plan.
    const productPlans: Record<string, string> = {};

    if (process.env.POLAR_PRODUCT_MONTHLY) {
      productPlans[process.env.POLAR_PRODUCT_MONTHLY] = "monthly";
    }

    if (process.env.POLAR_PRODUCT_BIWEEKLY) {
      productPlans[process.env.POLAR_PRODUCT_BIWEEKLY] = "biweekly";
    }

    if (process.env.POLAR_PRODUCT_YEARLY) {
      productPlans[process.env.POLAR_PRODUCT_YEARLY] = "yearly";
    }

    const metadataPlan = d.metadata?.plan;

    const plan =
      productPlans[d.product_id] ??
      (typeof metadataPlan === "string" &&
      allowedPlans.includes(metadataPlan)
        ? metadataPlan
        : null);

    if (!plan || !allowedPlans.includes(plan)) {
      console.error("Unknown Polar product:", {
        productId: d.product_id,
        metadataPlan,
      });

      return NextResponse.json(
        { error: "Unknown subscription product." },
        { status: 400 }
      );
    }

    // 4. Collect all possible Prisma user IDs from Polar.
    const possibleIds = [
      d.external_customer_id,
      d.metadata?.userId,
      d.customer?.external_id,
    ]
      .filter(
        (id: unknown): id is string =>
          typeof id === "string" && id.trim().length > 0
      )
      .map((id: string) => id.trim());

    // Remove duplicate IDs.
    const uniqueIds = [...new Set(possibleIds)];

    if (uniqueIds.length === 0) {
      console.error("No external customer ID found:", {
        subscriptionId: d.id,
        customerId: d.customer_id,
      });

      return NextResponse.json(
        {
          error:
            "Missing external customer ID. Please start a new checkout.",
        },
        { status: 400 }
      );
    }

    // 5. Check every candidate against the actual database.
    const matchingUsers = await prisma.user.findMany({
      where: {
        id: {
          in: uniqueIds,
        },
      },
      select: {
        id: true,
        email: true,
      },
    });

    // Avoid accidentally assigning a subscription to the wrong user.
    if (matchingUsers.length > 1) {
      console.error("Conflicting Polar customer IDs:", {
        subscriptionId: d.id,
        candidateIds: uniqueIds,
        matchedUserIds: matchingUsers.map((user) => user.id),
      });

      return NextResponse.json(
        {
          error:
            "Multiple accounts match the Polar customer IDs. Manual verification is required.",
        },
        { status: 409 }
      );
    }

    if (matchingUsers.length === 0) {
      console.error("No RevaBox account matches Polar customer IDs:", {
        subscriptionId: d.id,
        candidateIds: uniqueIds,
      });

      return NextResponse.json(
        {
          error:
            "No RevaBox account matches this Polar external customer ID. Please start a new checkout using your correct account.",
        },
        { status: 404 }
      );
    }

    const user = matchingUsers[0];

    // 6. Map Polar events to subscription statuses.
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

    // 7. Convert subscription dates.
    const periodStart = d.current_period_start
      ? new Date(d.current_period_start)
      : null;

    const periodEnd = d.current_period_end
      ? new Date(d.current_period_end)
      : null;

    const customerId =
      d.customer_id ?? d.customer?.id ?? null;

    // 8. Save subscription to PostgreSQL.
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

    console.log("RevaBox subscription updated successfully:", {
      userId: user.id,
      email: user.email,
      plan,
      status,
      subscriptionId: d.id,
    });

    return NextResponse.json({
      received: true,
      subscriptionUpdated: true,
    });

  } catch (error) {
    console.error("Polar webhook processing failed:", error);

    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
