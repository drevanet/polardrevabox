
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Require the user to sign in first.
  if (!session?.user?.email) {
    redirect("/login");
  }

  // Retrieve the current user's information from the database.
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      subscription: {
        select: {
          status: true,
          planKey: true,
          periodEnd: true,
          downloadCount: true,
        },
      },
    },
  });

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gray-900 p-8">
          <h1 className="text-2xl font-bold">Account not found</h1>
          <p className="mt-3 text-gray-400">
            We could not find your account. Please sign in again.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-700"
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  const joinedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
  }).format(user.createdAt);

  const subscriptionStatus =
    user.subscription?.status ?? "inactive";

  return (
    <main className="min-h-screen bg-gray-950 px-5 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <Link href="/" className="text-2xl font-black italic">
            BETI<span className="text-red-500">SPORTS</span>
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
          >
            Back to home
          </Link>
        </header>

        {/* Welcome */}
        <section className="py-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-400">
            Your account
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            Welcome, {user.name || "Member"}!
          </h1>

          <p className="mt-3 text-gray-400">
            Your account information retrieved from the database.
          </p>
        </section>

        {/* User information */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-gray-900 p-6">
            <h2 className="text-lg font-bold">Personal information</h2>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm text-gray-400">Full name</p>
                <p className="mt-1 font-medium">
                  {user.name || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Email address</p>
                <p className="mt-1 break-all font-medium">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Account ID</p>
                <p className="mt-1 break-all text-sm text-gray-300">
                  {user.id}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Registration date
                </p>
                <p className="mt-1 font-medium">{joinedDate}</p>
              </div>
            </div>
          </div>

          {/* Subscription information */}
          <div className="rounded-2xl border border-white/10 bg-gray-900 p-6">
            <h2 className="text-lg font-bold">Account status</h2>

            <div className="mt-6">
              <p className="text-sm text-gray-400">
                Subscription status
              </p>

              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                  subscriptionStatus === "active" ||
                  subscriptionStatus === "trialing"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                {subscriptionStatus}
              </span>
            </div>

            <div className="mt-5">
              <p className="text-sm text-gray-400">Plan</p>
              <p className="mt-1 font-medium">
                {user.subscription?.planKey || "No active plan"}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-sm text-gray-400">Downloads used</p>
              <p className="mt-1 font-medium">
                {user.subscription?.downloadCount ?? 0}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-sm text-gray-400">
                Subscription renewal/end date
              </p>
              <p className="mt-1 font-medium">
                {user.subscription?.periodEnd
                  ? new Intl.DateTimeFormat("en", {
                      dateStyle: "long",
                    }).format(user.subscription.periodEnd)
                  : "Not available"}
              </p>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/"
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
          >
            Go to homepage
          </Link>

          <Link
            href="/pricing"
            className="rounded-xl border border-white/10 px-6 py-3 font-semibold hover:bg-white/5"
          >
            View plans
          </Link>
        </section>
      </div>
    </main>
  );
}
