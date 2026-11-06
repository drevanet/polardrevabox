
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import {
  Users,
  ShieldCheck,
  LayoutDashboard,
  Phone,
  MapPin,
  CalendarDays,
  Mail,
} from "lucide-react";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DeleteUserButton from "./delete-user-button";
import SignOutButton from "./sign-out-button";
import UserSearch from "./user-search";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const session = await getServerSession(authOptions);

  // Require authentication.
  if (!session?.user?.id) {
    redirect("/login");
  }

  // Verify administrator permissions.
  const admin = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      role: true,
    },
  });

  if (admin?.role !== "ADMIN") {
    redirect("/");
  }

  // Get search query.
  const search = searchParams.q?.trim() || "";

  // Retrieve registered users with live search filter.
  const users = await prisma.user.findMany({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              country: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              role: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : undefined,

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      country: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#090909] text-white">

      {/* TOP NAVIGATION */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#101010]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">

          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 sm:h-10 sm:w-10">
              <ShieldCheck size={21} />
            </div>

            <div className="min-w-0">
              <h1 className="text-base font-black tracking-tight sm:text-lg">
                DREVA<span className="text-red-500">SPORTS</span>
              </h1>

              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500 sm:text-[10px]">
                Administration
              </p>
            </div>
          </Link>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold">
                {session.user.name || "Administrator"}
              </p>

              <p className="text-xs text-red-400">
                Administrator
              </p>
            </div>

            <SignOutButton />
          </div>

        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[240px_1fr]">

        {/* SIDEBAR */}
        <aside className="hidden min-h-[calc(100vh-73px)] border-r border-white/10 p-5 lg:block">

          <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
            Main menu
          </p>

          <nav className="space-y-2">

            <Link
              href="/admin/users"
              className="flex items-center gap-3 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white"
            >
              <Users size={18} />
              User management
            </Link>

            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              <LayoutDashboard size={18} />
              View website
            </Link>

          </nav>

          <div className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/5 p-4">

            <ShieldCheck
              className="mb-3 text-red-500"
              size={23}
            />

            <p className="text-sm font-bold">
              Admin access
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              You are viewing the protected user management area.
            </p>

          </div>

        </aside>

        {/* MAIN CONTENT */}
        <section className="min-w-0 p-3 sm:p-6 lg:p-8">

          {/* PAGE HEADING */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">

            <div>
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 sm:text-xs">
                <LayoutDashboard size={14} />
                Admin dashboard
              </div>

              <h2 className="text-2xl font-black sm:text-3xl">
                User management
              </h2>

              <p className="mt-2 max-w-lg text-xs leading-5 text-gray-500 sm:text-sm">
                View, search and manage all registered users on your platform.
              </p>
            </div>

          </div>

          {/* REGISTERED USERS */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111111] sm:rounded-2xl">

            {/* TABLE HEADER AND LIVE SEARCH */}
            <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

              <div>
                <h3 className="text-base font-bold sm:text-lg">
                  Registered users
                </h3>

                <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
                  Search and manage registered users.
                </p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">

                <UserSearch />

                {search && (
                  <Link
                    href="/admin/users"
                    className="rounded-lg border border-white/10 px-3 py-2.5 text-center text-xs font-semibold text-gray-400 transition hover:border-red-500 hover:text-red-400"
                  >
                    Clear
                  </Link>
                )}

              </div>

            </div>

            {/* EMPTY STATE */}
            {users.length === 0 ? (

              <div className="px-4 py-16 text-center sm:px-6">

                <Users
                  className="mx-auto mb-3 text-gray-600"
                  size={35}
                />

                <p className="font-semibold">
                  {search
                    ? "No matching users found"
                    : "No users found"}
                </p>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  {search
                    ? `No results for "${search}". Try another search.`
                    : "Registered users will appear here."}
                </p>

                {search && (
                  <Link
                    href="/admin/users"
                    className="mt-4 inline-block rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-700"
                  >
                    Clear search
                  </Link>
                )}

              </div>

            ) : (

              <>

                {/* MOBILE USER CARDS */}
                <div className="space-y-3 p-3 sm:hidden">

                  {users.map((user) => (

                    <div
                      key={user.id}
                      className="rounded-xl border border-white/10 bg-[#171717] p-3.5"
                    >

                      {/* USER INFORMATION */}
                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-sm font-black text-red-400">
                          {(user.name || user.email || "U")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-white">
                            {user.name || "Unnamed user"}
                          </p>

                          <p className="truncate text-xs text-gray-500">
                            {user.email}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-bold ${
                            user.role === "ADMIN"
                              ? "border border-red-500/20 bg-red-500/10 text-red-400"
                              : "border border-white/10 bg-white/5 text-gray-400"
                          }`}
                        >
                          {user.role}
                        </span>

                      </div>

                      {/* USER DETAILS */}
                      <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 border-t border-white/10 pt-4">

                        <div className="min-w-0">
                          <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wider text-gray-600">
                            Phone
                          </p>

                          <div className="flex items-center gap-2 text-xs text-gray-300">
                            <Phone
                              size={13}
                              className="shrink-0 text-gray-500"
                            />

                            <span className="truncate">
                              {user.phone || "Not provided"}
                            </span>
                          </div>
                        </div>

                        <div className="min-w-0">
                          <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wider text-gray-600">
                            Country
                          </p>

                          <div className="flex items-center gap-2 text-xs text-gray-300">
                            <MapPin
                              size={13}
                              className="shrink-0 text-gray-500"
                            />

                            <span className="truncate">
                              {user.country || "Not provided"}
                            </span>
                          </div>
                        </div>

                        <div className="col-span-2 min-w-0">
                          <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wider text-gray-600">
                            Date registered
                          </p>

                          <div className="flex items-center gap-2 text-xs text-gray-300">
                            <CalendarDays
                              size={13}
                              className="shrink-0 text-gray-500"
                            />

                            <span>
                              {formatDate(user.createdAt)}
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* CARD ACTIONS */}
                      <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-3">

                        <span className="min-w-0 truncate text-[9px] text-gray-600">
                          ID: {user.id.slice(0, 12)}...
                        </span>

                        <DeleteUserButton
                          userId={user.id}
                          userName={user.name || user.email}
                        />

                      </div>

                    </div>

                  ))}

                </div>

                {/* DESKTOP TABLE */}
                <div className="hidden w-full overflow-x-auto sm:block">

                  <table className="w-full min-w-[1050px] text-left">

                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03] text-[10px] font-bold uppercase tracking-wider text-gray-500">

                        <th className="px-5 py-4">
                          User
                        </th>

                        <th className="px-5 py-4">
                          Email address
                        </th>

                        <th className="px-5 py-4">
                          Phone
                        </th>

                        <th className="px-5 py-4">
                          Country
                        </th>

                        <th className="px-5 py-4">
                          Role
                        </th>

                        <th className="px-5 py-4">
                          Date registered
                        </th>

                        <th className="px-5 py-4">
                          Actions
                        </th>

                      </tr>
                    </thead>

                    <tbody className="divide-y divide-white/[0.06]">

                      {users.map((user) => (

                        <tr
                          key={user.id}
                          className="transition hover:bg-white/[0.025]"
                        >

                          {/* USER */}
                          <td className="px-5 py-4">

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-sm font-black text-red-400">
                                {(user.name || user.email || "U")
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>
                                <p className="whitespace-nowrap text-sm font-bold text-white">
                                  {user.name || "Unnamed user"}
                                </p>

                                <p className="mt-1 text-[10px] text-gray-600">
                                  ID: {user.id.slice(0, 12)}...
                                </p>
                              </div>

                            </div>

                          </td>

                          {/* EMAIL */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <Mail
                                size={14}
                                className="shrink-0 text-gray-600"
                              />
                              {user.email}
                            </div>
                          </td>

                          {/* PHONE */}
                          <td className="px-5 py-4 text-sm text-gray-400">
                            {user.phone || "Not provided"}
                          </td>

                          {/* COUNTRY */}
                          <td className="px-5 py-4 text-sm text-gray-400">
                            {user.country || "Not provided"}
                          </td>

                          {/* ROLE */}
                          <td className="px-5 py-4">

                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold ${
                                user.role === "ADMIN"
                                  ? "border border-red-500/20 bg-red-500/10 text-red-400"
                                  : "border border-white/10 bg-white/5 text-gray-400"
                              }`}
                            >
                              {user.role}
                            </span>

                          </td>

                          {/* REGISTRATION DATE */}
                          <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-400">
                            <div className="flex items-center gap-2">
                              <CalendarDays
                                size={14}
                                className="shrink-0 text-gray-600"
                              />

                              {formatDate(user.createdAt)}
                            </div>
                          </td>

                          {/* ACTIONS */}
                          <td className="px-5 py-4">

                            <DeleteUserButton
                              userId={user.id}
                              userName={user.name || user.email}
                            />

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </>

            )}

            {/* FOOTER */}
            <div className="border-t border-white/10 px-4 py-3 sm:px-5 sm:py-4">
              <p className="text-[10px] text-gray-600 sm:text-xs">
                Showing {users.length} matching users
              </p>
            </div>

          </div>

          {/* FOOTER TEXT */}
          <p className="mt-6 text-center text-[10px] text-gray-700 sm:text-xs">
            DrevaSports Admin Dashboard
          </p>

        </section>

      </div>

    </main>
  );
}
