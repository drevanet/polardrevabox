
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

      if (!data.signupToken) {
        throw new Error(
          "Account created, but the authentication token was not returned."
        );
      }

      const result = await signIn("credentials", {
        signupToken: data.signupToken,
        redirect: false,
      });

      if (result?.error || !result?.ok) {
        throw new Error(
          "Your account was created, but automatic sign-in failed. Please sign in to continue."
        );
      }

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
    <main className="flex min-h-[100svh] w-full flex-col items-center justify-center overflow-x-hidden bg-[#100b0b] px-3 py-3 text-white sm:px-5 sm:py-6">

      {/* Top Announcement Banner */}
      <div className="mb-3 w-full max-w-lg rounded-xl border border-red-500/30 bg-red-600/15 px-3 py-3 text-center sm:mb-4 sm:px-5">
        <p className="text-sm font-bold leading-5 text-red-300 sm:text-sm">
          Charged once for the first month and twice for the subsequent months
        </p>
      </div>

      {/* Signup Card */}
      <div className="w-full max-w-lg rounded-2xl border border-red-500/20 bg-[#1c1515] p-4 shadow-2xl shadow-red-950/30 sm:rounded-3xl sm:p-10">

        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xl font-black tracking-tight sm:gap-3 sm:text-2xl"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 shadow-lg shadow-red-600/20 sm:h-11 sm:w-11 sm:rounded-xl">
            <Trophy className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </span>

          <span>
            Dreva<span className="text-red-500">Sports</span>
          </span>
        </Link>

        {/* Heading */}
        <div className="mt-2">
          <p className="text-sm leading-5 text-gray-400 sm:text-sm sm:leading-6">
           
            Create your account to enjoy 50% discount for first month.
          </p>
        </div>

        {/* Signup Form */}
        <form
          onSubmit={submit}
          className="mt-4 space-y-3 sm:mt-7 sm:space-y-4"
        >

          {/* Full Name */}
          <div>
            <label className="mb-1 block text-base font-semibold text-gray-200 sm:mb-2 sm:text-sm">
              Full name
            </label>

            <input
              className="field !h-11 !py-2 text-base sm:!h-12 sm:text-sm"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="mb-1 block text-base font-semibold text-gray-200 sm:mb-2 sm:text-sm">
              Phone number
            </label>

            <input
              className="field !h-11 !py-2 text-base sm:!h-12 sm:text-sm"
              type="tel"
              required
              maxLength={25}
              autoComplete="tel"
              placeholder="+44 7000 000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="mb-1 block text-base font-semibold text-gray-200 sm:mb-2 sm:text-sm">
              Email address
            </label>

            <input
              className="field !h-11 !py-2 text-base sm:!h-12 sm:text-sm"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Country */}
          <div>
            <label className="mb-1 block text-base font-semibold text-gray-200 sm:mb-2 sm:text-sm">
              Country
            </label>

            <select
              className="field !h-11 !py-2 text-base sm:!h-12 sm:text-sm"
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

          {/* Other Country */}
          {country === "Other" && (
            <div>
              <label className="mb-1 block text-base font-semibold text-gray-200 sm:mb-2 sm:text-sm">
                Enter your country
              </label>

              <input
                className="field !h-11 !py-2 text-base sm:!h-12 sm:text-sm"
                type="text"
                required
                maxLength={100}
                placeholder="Enter country name"
                value={otherCountry}
                onChange={(e) => setOtherCountry(e.target.value)}
              />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-sm leading-5 text-red-300 sm:p-3 sm:text-sm"
            >
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-base font-bold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-12 sm:rounded-xl sm:py-3 sm:text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                Creating account...
              </>
            ) : (
              <>
                Create account
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 border-t border-white/10 pt-3 text-center sm:mt-7 sm:pt-5">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} DrevaSports. All rights reserved.
          </p>
        </div>

      </div>
    </main>
  );
}
