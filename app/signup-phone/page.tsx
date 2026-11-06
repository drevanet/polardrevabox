
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

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
        setError(data.error || "Registration failed.");
        return;
      }

      // Automatically sign in the new user.
      const result = await signIn("credentials", {
        email: cleanEmail,
        phone: cleanPhone,
        redirect: false,
      });

      if (result?.error || !result?.ok) {
        setError(
          "Your account was created, but automatic sign-in failed. Please sign in to continue."
        );
        return;
      }

      // Redirect directly to the monthly Polar checkout.
      window.location.assign("/api/polar/checkout?plan=monthly");

    } catch (err) {
      console.error("Signup error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-5 py-14 text-white">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-gray-900 p-8 shadow-2xl sm:p-12">

        <Link href="/" className="text-xl font-black">
          reva<span className="text-violet-400">box.</span>
        </Link>

        <h1 className="mt-8 text-3xl font-black">
          Create your account
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Register to get started with Reva Box.
        </p>

        {/* Monthly subscription information */}
        <div className="mt-6 rounded-xl border border-violet-500/30 bg-violet-500/10 p-4">
          <p className="text-sm font-semibold text-violet-300">
            Monthly Subscription
          </p>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-black text-white">
              $10
            </span>
            <span className="text-sm text-gray-400">
              / month
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-400">
            Includes 50 project downloads per monthly billing period.
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-5">

          <div>
            <label className="mb-2 block text-sm">
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
            <label className="mb-2 block text-sm">
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
            <label className="mb-2 block text-sm">
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
            <label className="mb-2 block text-sm">
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
              <label className="mb-2 block text-sm">
                Enter your country
              </label>

              <input
                className="field"
                type="text"
                required
                maxLength={100}
                placeholder="Enter country name"
                value={otherCountry}
                onChange={(e) =>
                  setOtherCountry(e.target.value)
                }
              />
            </div>
          )}

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-violet-500 px-5 py-3.5 font-bold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Creating account..."
              : "Create account and proceed to payment"}
          </button>

        </form>

      </div>
    </main>
  );
}
