"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { isActivePath, navLinks } from "./data";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="border-white/30 text-white hover:bg-white/15 hover:text-white focus-visible:ring-white/40 md:hidden"
            aria-label="Open navigation menu"
          />
        }
      >
        <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />
      </SheetTrigger>

      <SheetContent side="right" className="w-72 gap-0 p-0">
        <SheetHeader className="border-b border-border p-4 pr-14">
          <SheetTitle>ByteSpace</SheetTitle>
          <SheetDescription>
            Learn from creators who build in public.
          </SheetDescription>
        </SheetHeader>

        <SheetClose
          render={
            <button
              type="button"
              className="absolute top-4 right-4 rounded-4xl p-2 opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
            />
          }
        >
          <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          <span className="sr-only">Close menu</span>
        </SheetClose>

        <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => {
            const isActive = isActivePath(pathname, link.href);

            return (
              <SheetClose
                key={link.href}
                nativeButton={false}
                render={<Link href={link.href} />}
                className={cn(
                  "rounded-4xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted",
                  isActive && "bg-muted text-foreground",
                )}
              >
                {link.label}
              </SheetClose>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/login" className="w-full" />}
          >
            Login
          </Button>
          <Button nativeButton={false} render={<Link href="/signup" className="w-full" />}>
            Join Us
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
