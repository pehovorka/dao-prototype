import type { ReactNode, ComponentProps } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}
export const NavLink = ({ href, children }: NavLinkProps) => {
  const { pathname } = useRouter();

  const className: ComponentProps<"a">["className"] = pathname.startsWith(href)
    ? "font-bold"
    : undefined;

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
};
