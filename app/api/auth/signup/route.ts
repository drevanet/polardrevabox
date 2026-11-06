import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSignupToken } from "@/lib/signup-token";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const country = String(body.country || "").trim();

    if (!name || !email || !phone || !country) {
      return NextResponse.json(
        { error: "Please complete all fields." },
        { status: 400 }
      );
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      phone.length > 72 ||
      country.length > 100
    ) {
      return NextResponse.json(
        { error: "One or more fields are too long." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (phone.length < 8) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    // Create a new account without checking for duplicate emails or phones.
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        country,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });

    // Sign a temporary token for this exact user.
    const signupToken = createSignupToken(user.id);

    return NextResponse.json(
      {
        message: "Account created successfully.",
        user,
        signupToken,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup API error:", error);

    return NextResponse.json(
      { error: "Could not create your account. Please try again." },
      { status: 500 }
    );
  }
}