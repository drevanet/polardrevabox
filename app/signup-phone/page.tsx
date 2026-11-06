
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Trophy, ArrowRight, Loader2 } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("UK");
  const [otherCountry, setOtherCountry] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    const finalCountry =
      country === "Other" ? otherCountry.trim() : country;

    if (!finalCountry) {
      setError("Please enter your country.");
      setLoading(false);
      return;
    }

    try {
      // Create the account.
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          country: finalCountry,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed.");
      }

      // Confirm that the signup API returned a token.
      if (!data.signupToken) {
        throw new Error(
          "Account created, but the authentication token was not returned."
        );
      }

      // Sign in the exact newly created account.
      const result = await signIn("credentials", {
        signupToken: data.signupToken,
        redirect: false,
      });

      if (result?.error || !result?.ok) {
        throw new Error(
          "Your account was created, but automatic sign-in failed. Please sign in to continue."
        );
      }

      // Redirect directly to monthly Polar checkout.
      window.location.assign("/api/polar/checkout?plan=monthly");

    } catch (err) {
      console.error("Signup error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Network error. Please try again."
      );

      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#100b0b] px-5 py-14 text-white">
      <div className="w-full max-w-lg rounded-3xl border border-red-500/20 bg-[#1c1515] p-8 shadow-2xl shadow-red-950/30 sm:p-12">

        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-2xl font-black tracking-tight"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/20">
            <Trophy className="h-6 w-6 text-white" />
          </span>

          <span>
            Dreva<span className="text-red-500">Sports</span>
          </span>
        </Link>

        {/* Heading */}
        <div className="mt-9">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
            Join DrevaSports
          </span>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Create your account
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-400">
            Register to get started with DrevaSports.
            Create your account and continue to the next step.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={submit} className="mt-9 space-y-5">

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-200">
              Full name
            </label>

            <input
              className="field"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-200">
              Phone number
            </label>

            <input
              className="field"
              type="tel"
              required
              maxLength={25}
              autoComplete="tel"
              placeholder="+44 7000 000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-200">
              Email address
            </label>

            <input
              className="field"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-200">
              Country
            </label>

            <select
              className="field"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setOtherCountry("");
              }}
            >
              <option value="UK">UK</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {country === "Other" && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-200">
                Enter your country
              </label>

              <input
                className="field"
                type="text"
                required
                maxLength={100}
                placeholder="Enter country name"
                value={otherCountry}
                onChange={(e) => setOtherCountry(e.target.value)}
              />
            </div>
          )}

          {/* Error message */}
          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-4 font-bold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create account
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} DrevaSports. All rights reserved.
          </p>
        </div>

      </div>
    </main>
  );
}
