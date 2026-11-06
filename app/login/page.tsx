
"use client";

import {
  FormEvent,
  Suspense,
  useState,
} from "react";

import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { signIn } from "next-auth/react";

function Form() {
  const router = useRouter();
  const params = useSearchParams();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        redirect: false,
      });

      if (!result || result.error || !result.ok) {
        setError("The email or phone number is incorrect.");
        return;
      }

      const callbackUrl = params.get("callbackUrl");

      router.replace(
        callbackUrl?.startsWith("/") &&
        !callbackUrl.startsWith("//")
          ? callbackUrl
          : "/editor"
      );

      router.refresh();

    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-5 py-14">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-panel p-8 sm:p-12">

        <Link href="/" className="text-xl font-black">
          reva<span className="text-violet-300">box.</span>
        </Link>

        <h1 className="mt-8 text-3xl font-black">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Sign in using your email address and phone number.
        </p>

        {params.get("registered") === "1" && (
          <p className="mt-4 rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-300">
            Account created. Sign in to continue.
          </p>
        )}

        <form onSubmit={submit} className="mt-8 space-y-5">

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              className="field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm"
            >
              Phone number
            </label>

            <input
              id="phone"
              type="tel"
              required
              maxLength={25}
              autoComplete="tel"
              placeholder="Enter your registered phone number"
              className="field"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

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
            className="w-full rounded-xl bg-violet-500 px-5 py-3.5 font-bold disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          New to Reva Box?{" "}
          <Link
            href="/signup"
            className="text-violet-300"
          >
            Create an account
          </Link>
        </p>

      </div>
    </main>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <Form />
    </Suspense>
  );
}
