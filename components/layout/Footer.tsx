import Link from "next/link";

const courseLinks = [
  "Featured Categories",
  "Business",
  "IT",
  "Design",
] as const;

const categoryLinks = [
  "Development",
  "Marketing",
  "Photography",
  "Finance",
  "Sport",
] as const;

const companyLinks = [
  "Become a Creator",
  "Affiliate Program",
  "Contact",
  "Help",
  "About",
] as const;

const legalLinks = [
  "Privacy Policy",
  "Terms of Service",
  "Cookies Settings",
] as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly string[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-poppins text-base font-semibold text-gray-900">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link}>
            <Link
              href="/courses"
              className="font-satoshi text-sm text-gray-500 transition-colors duration-200 hover:text-brand">
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-6 lg:gap-10">
          {/* Column 1 — newsletter */}
          <div className="flex flex-col gap-5 lg:col-span-3">
            <Link
              href="/"
              className="flex w-fit items-center rounded-2xl bg-brand px-4 py-2.5">
              <span className="sr-only">ByteSpace home</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Navbar_Logo.png"
                alt="ByteSpace"
                width={342}
                height={74}
                className="h-7 w-auto"
              />
            </Link>

            <p className="font-satoshi text-base font-normal text-gray-500">
              Stay Up to date with our latest features and releases by joining
              our newsletter.
            </p>

            <form
              action="/courses"
              method="get"
              className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="footer-search" className="sr-only">
                Enter your email address to subscribe to our newsletter
              </label>
              <input
                id="footer-search"
                name="q"
                type="search"
                placeholder="Course, Topic, Creator"
                className="font-satoshi h-12 w-full rounded-full border border-gray-200 bg-white px-5 text-[15px] text-gray-900 transition-colors outline-none placeholder:text-gray-400 focus-visible:border-brand focus-visible:ring-[3px] focus-visible:ring-brand/40"
              />
              <button
                type="submit"
                className="font-satoshi h-12 shrink-0 rounded-full bg-[#D4FB20] px-7 text-[15px] font-medium text-black transition-colors duration-200 hover:bg-[#D4FB20]/90 focus-visible:ring-[3px] focus-visible:ring-gray-400/40">
                Search
              </button>
            </form>

            <p className="font-satoshi text-xs text-gray-500">
              By subscribing, you agree to our{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 transition-colors hover:text-brand">
                Privacy Policy
              </Link>{" "}
              and consent to receive updates from our company.
            </p>
          </div>

          {/* Columns 2-4 */}
          <FooterColumn title="Featured Courses" links={courseLinks} />
          <FooterColumn title="Featured Categories" links={categoryLinks} />
          <FooterColumn title="Company" links={companyLinks} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 sm:px-6 md:flex-row md:justify-between lg:px-8">
          <p className="font-satoshi text-sm text-gray-500">
            &copy; 2023 ByteSpace. All rights reserved.
          </p>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              {legalLinks.map((link, index) => (
                <li key={link} className="flex items-center gap-2">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-gray-300">
                      &rarr;
                    </span>
                  )}
                  <Link
                    href="/privacy"
                    className="font-satoshi text-sm text-gray-500 underline-offset-4 transition-colors hover:text-brand hover:underline">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
