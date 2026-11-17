
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("UK");
  const [otherCountry, setOtherCountry] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

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
          name,
          email,
          phone,
          country: finalCountry,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed.");
        return;
      }

      const result = await signIn("credentials", {
        email,
        phone,
        redirect: false,
      });

      if (result?.error || !result?.ok) {
        router.push("/login?registered=1");
        return;
      }

      router.push("/editor");
      router.refresh();

    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-5 py-14 text-white">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-gray-900 p-8 sm:p-12">

        <Link href="/" className="text-xl font-black">
          reva<span className="text-violet-400">box.</span>
        </Link>

        <h1 className="mt-8 text-3xl font-black">
          Create your account
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Register using your personal details.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5">

          <div>
            <label className="mb-2 block text-sm">
              Full name
            </label>
            <input
              className="field"
              required
              maxLength={100}
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="mb-2 block text-sm">
              Password
            </label>

            <div className="relative">
              <input
                className="field pr-12"
                type={showPassword ? "text" : "password"}
                required
                maxLength={100}
                autoComplete="new-password"
                placeholder="Enter your password"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
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
            <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-violet-500 px-5 py-3.5 font-bold hover:bg-violet-600 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already registered?{" "}
          <Link href="/login" className="text-violet-300">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
