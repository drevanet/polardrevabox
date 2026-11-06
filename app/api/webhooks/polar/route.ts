
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

    // 2. Ignore events that are not subscription events.
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

    // 3. Resolve subscription plan from Polar product ID.
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
      typeof metadataPlan === "string" &&
      allowedPlans.includes(metadataPlan)
        ? metadataPlan
        : productPlans[d.product_id];

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

    // 4. Get the unique database user ID from Polar.
    // Never use email to identify an account because
    // multiple DrevaSports accounts may share an email.

    const externalId =
      d.customer?.external_id ??
      d.external_customer_id ??
      d.metadata?.userId ??
      null;

    if (!externalId) {
      console.error(
        "Polar subscription is missing external customer ID.",
        {
          subscriptionId: d.id,
          customerId: d.customer_id,
          customerEmail: d.customer?.email,
        }
      );

      return NextResponse.json(
        {
          error:
            "Missing external customer ID. Start a new checkout using the correct account.",
        },
        { status: 400 }
      );
    }

    // 5. Find the exact user by unique Prisma ID.
    const user = await prisma.user.findUnique({
      where: {
        id: String(externalId),
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      console.error("DrevaSports user not found:", {
        externalId: String(externalId),
        subscriptionId: d.id,
      });

      return NextResponse.json(
        {
          error:
            "No DrevaSports account matches this Polar external customer ID.",
        },
        { status: 404 }
      );
    }

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

    console.log(
      "DrevaSports subscription updated successfully:",
      {
        userId: user.id,
        email: user.email,
        plan,
        status,
        subscriptionId: d.id,
      }
    );

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
