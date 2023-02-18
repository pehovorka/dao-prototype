import Link from "next/link";
import { useRouter } from "next/router";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}
export const NavLink = ({ href, children }: NavLinkProps) => {
  const { pathname } = useRouter();

  const className: React.ComponentProps<"a">["className"] =
    pathname === href ? "font-bold" : undefined;

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
};
