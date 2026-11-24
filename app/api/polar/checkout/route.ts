
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createPolar } from "@polar-sh/sdk/2026-10";

import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const products = {
  monthly: process.env.POLAR_PRODUCT_MONTHLY,
  biweekly: process.env.POLAR_PRODUCT_BIWEEKLY,
  yearly: process.env.POLAR_PRODUCT_YEARLY,
};

type Plan = keyof typeof products;

function isValidPlan(plan: string | null): plan is Plan {
  return (
    plan === "monthly" ||
    plan === "biweekly" ||
    plan === "yearly"
  );
}

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user.
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set(
        "callbackUrl",
        request.nextUrl.pathname + request.nextUrl.search
      );

      return NextResponse.redirect(loginUrl);
    }

    // Get selected subscription plan.
    const plan = request.nextUrl.searchParams.get("plan");

    if (!isValidPlan(plan)) {
      return NextResponse.json(
        { error: "Invalid subscription plan." },
        { status: 400 }
      );
    }

    const productId = products[plan];

    if (!productId) {
      console.error(`Polar product ID is missing for plan: ${plan}`);

      return NextResponse.json(
        { error: "The selected subscription product is not configured." },
        { status: 500 }
      );
    }

    const accessToken = process.env.POLAR_ACCESS_TOKEN;

    if (!accessToken) {
      console.error("POLAR_ACCESS_TOKEN is missing.");

      return NextResponse.json(
        { error: "Payment configuration is incomplete." },
        { status: 500 }
      );
    }

    const appUrl = process.env.NEXTAUTH_URL;

    if (!appUrl) {
      console.error("NEXTAUTH_URL is missing.");

      return NextResponse.json(
        { error: "Application URL is not configured." },
        { status: 500 }
      );
    }

    // Verify the authenticated user ID.
    const userId = session.user.id;

    console.log("Creating Polar checkout:", {
      userId,
      email: session.user.email,
      plan,
      productId,
    });

    // Initialize Polar.
    const polar = createPolar({
      accessToken,
      environment:
        process.env.POLAR_ENVIRONMENT === "sandbox"
          ? "sandbox"
          : "production",
    });

    // Create Polar checkout session.
    const checkout = await polar.checkouts.create({
      products: [productId],

      success_url: `${appUrl.replace(/\/+$/, "")}/editor`,

      customer_email: session.user.email ?? undefined,

      // This must match the Prisma User ID used by the webhook.
      external_customer_id: userId,

      metadata: {
        userId,
        plan,
        source: "reva-box",
      },
    });

    if (!checkout.url) {
      throw new Error("Polar did not return a checkout URL.");
    }

    return NextResponse.redirect(checkout.url);

  } catch (error) {
    console.error("Polar checkout error:", error);

    return NextResponse.json(
      { error: "Unable to create checkout session." },
      { status: 500 }
    );
  }
}
