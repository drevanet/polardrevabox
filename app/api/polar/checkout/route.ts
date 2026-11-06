
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createPolar } from "@polar-sh/sdk/2026-10";

import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const products: Record<string, string | undefined> = {
  monthly: process.env.POLAR_PRODUCT_MONTHLY,
  biweekly: process.env.POLAR_PRODUCT_BIWEEKLY,
  yearly: process.env.POLAR_PRODUCT_YEARLY,
};

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

    // Get selected plan.
    const plan = request.nextUrl.searchParams.get("plan");

    if (!plan || !products[plan]) {
      return NextResponse.json(
        { error: "Invalid subscription plan." },
        { status: 400 }
      );
    }

    const productId = products[plan];

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

    // Initialize Polar.
    const polar = createPolar({
      accessToken,
      environment:
        process.env.POLAR_ENVIRONMENT === "sandbox"
          ? "sandbox"
          : "production",
    });

    // Create checkout session.
    const checkout = await polar.checkouts.create({
      products: [productId],
      success_url: `${appUrl}/editor?checkout=success`,
      customer_email: session.user.email ?? undefined,
      external_customer_id: session.user.id,
      metadata: {
        plan,
        userId: session.user.id,
        source: "drevasports",
      },
    });

    // Redirect to Polar hosted checkout.
    return NextResponse.redirect(checkout.url);
  } catch (error) {
    console.error("Polar checkout error:", error);

    return NextResponse.json(
      { error: "Unable to create checkout session." },
      { status: 500 }
    );
  }
}
