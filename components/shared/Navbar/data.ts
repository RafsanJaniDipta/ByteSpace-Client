export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Creators", href: "/creators" },
] as const;

/** Home only matches exactly; every other link also matches its sub-routes. */
export function isActivePath(pathname: string, href: string): boolean {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}
