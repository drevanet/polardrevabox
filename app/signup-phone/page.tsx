
"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

const CUSTOM_REDIRECT_URL =
  "https://buy.polar.sh/polar_cl_EcnCJnF38C5lWMYwgXEF2q8JwhineaGyPkDPm4ZjrVR";

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
        headers: { "Content-Type": "application/json" },
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

      const result = await signIn("credentials", {
        email: cleanEmail,
        phone: cleanPhone,
        redirect: false,
      });

      if (result?.error || !result?.ok) {
        setError(
          "Your account was created, but automatic sign-in failed."
        );
        return;
      }

      window.location.assign(CUSTOM_REDIRECT_URL);
    } catch (err) {
      console.error("Signup error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-3 py-5 text-white sm:px-5 sm:py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-gray-900 p-4 shadow-2xl sm:rounded-3xl sm:p-9">
<div className="text-lg font-black italic sm:text-xl">
  DREVA<span className="text-red-500">SPORTS</span>
</div>

<h1 className="mt-5 text-2xl font-black sm:mt-7 sm:text-3xl">
  Sign up to Drevasports
</h1>

        <p className="mt-1 text-xs text-gray-400 sm:text-sm">
          Create your account to get started.
        </p>

        <form onSubmit={submit} className="mt-5 space-y-3 sm:mt-7 sm:space-y-4">

          <div>
            <label className="mb-1 block text-xs font-medium sm:text-sm">
              Full name
            </label>
            <input
              className="field w-full !py-2.5 text-sm sm:!py-3"
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
            <label className="mb-1 block text-xs font-medium sm:text-sm">
              Phone number
            </label>
            <input
              className="field w-full !py-2.5 text-sm sm:!py-3"
              type="tel"
              inputMode="tel"
              required
              maxLength={72}
              autoComplete="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium sm:text-sm">
              Email address
            </label>
            <input
              className="field w-full !py-2.5 text-sm sm:!py-3"
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
            <label className="mb-1 block text-xs font-medium sm:text-sm">
              Country
            </label>
            <select
              className="field w-full !py-2.5 text-sm sm:!py-3"
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
              <label className="mb-1 block text-xs font-medium sm:text-sm">
                Enter your country
              </label>
              <input
                className="field w-full !py-2.5 text-sm sm:!py-3"
                type="text"
                required
                maxLength={100}
                placeholder="Enter country name"
                value={otherCountry}
                onChange={(e) => setOtherCountry(e.target.value)}
              />
            </div>
          )}

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-500/10 p-2.5 text-xs text-red-300 sm:text-sm"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3.5 sm:text-base"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

        </form>
      </div>
    </main>
  );
}
