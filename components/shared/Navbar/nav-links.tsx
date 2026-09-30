"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";

import { isActivePath, navLinks } from "./data";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
      {navLinks.map((link) => {
        const isActive = isActivePath(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex h-9 w-max items-center justify-center rounded-2xl px-4.5 py-2.5 text-sm font-medium text-white transition-all outline-none hover:bg-white/15 focus-visible:ring-[3px] focus-visible:ring-white/40 focus-visible:outline-1",
              isActive && "bg-white/20 text-white hover:bg-white/25",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
