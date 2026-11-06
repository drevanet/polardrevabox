
"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";

export default function UserSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get("q") || "";

  const [value, setValue] = useState(currentQuery);
  const [isPending, startTransition] = useTransition();

  // Keep the input synchronized with browser navigation.
  useEffect(() => {
    setValue(currentQuery);
  }, [currentQuery]);

  // Automatically search while typing.
  useEffect(() => {
    const timer = setTimeout(() => {
      const query = value.trim();

      if (query === currentQuery) return;

      const params = new URLSearchParams(searchParams.toString());

      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }

      const queryString = params.toString();
      const url = queryString
        ? `${pathname}?${queryString}`
        : pathname;

      startTransition(() => {
        router.replace(url, { scroll: false });
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [value, currentQuery, pathname, router, searchParams]);

  return (
    <div className="relative w-full sm:w-80">

      <Search
        size={17}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />

      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search name, email, phone..."
        className="w-full rounded-lg border border-white/10 bg-[#090909] py-3 pl-10 pr-10 text-xs text-white outline-none transition placeholder:text-gray-600 focus:border-red-500"
      />

      {isPending ? (
        <Loader2
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-red-500"
        />
      ) : value ? (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-red-400"
        >
          <X size={16} />
        </button>
      ) : null}

    </div>
  );
}
