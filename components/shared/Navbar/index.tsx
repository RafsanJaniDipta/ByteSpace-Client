import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingCart01Icon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { NavLinks } from "./nav-links";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-brand">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="ByteSpace home"
          className="flex shrink-0 items-center rounded-4xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <Image
            src="/Navbar_Logo.png"
            alt="ByteSpace"
            width={342}
            height={74}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <NavLinks />

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            nativeButton={false}
            className="text-white hover:bg-white/15 hover:text-white focus-visible:ring-white/40"
            render={<Link href="/login" className="hidden sm:inline-flex" />}
          >
            Login
          </Button>
          <Button
            nativeButton={false}
            className="bg-white text-brand hover:bg-white/90 focus-visible:ring-white/40"
            render={<Link href="/signup" className="hidden sm:inline-flex" />}
          >
            Join Us
          </Button>
          <Button
            variant="outline"
            size="icon"
            nativeButton={false}
            className="border-white/30 text-white hover:bg-white/15 hover:text-white focus-visible:ring-white/40"
            render={<Link href="/cart" aria-label="Cart" />}
          >
            <HugeiconsIcon icon={ShoppingCart01Icon} strokeWidth={2} />
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
