import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

import { NavLink } from "./NavLink";
import { Languages } from "@/hooks/useLang";
import { FormattedMessage } from "react-intl";

interface NavbarProps {
  children: ReactNode;
}

const menuItems: ReactNode[] = [
  <li key={1}>
    <a>
      <FormattedMessage id="nav.homeowners" />
    </a>
  </li>,
  <li key={2}>
    <a>
      <FormattedMessage id="nav.bulletin" />
    </a>
  </li>,
  <li key={3}>
    <NavLink href="/proposals">
      <FormattedMessage id="nav.proposals" />
    </NavLink>
  </li>,
];

export const Navbar = ({ children }: NavbarProps) => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const handleLanguageChange = () => {
    const newLocale = locale === Languages.EN ? Languages.CS : Languages.EN;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <nav className="drawer">
      <input id="side-menu" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="navbar">
          <div className="navbar-start">
            <div className="flex-none lg:hidden">
              <label htmlFor="side-menu" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
            </div>
            <Link href="/" className="btn btn-ghost normal-case text-xl">
              <FormattedMessage id="site.name" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{menuItems}</ul>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image
                    src="/images/user-placeholder.png"
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a onClick={handleLanguageChange}>
                    {locale === Languages.EN ? "Česky" : "English"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="side-menu" className="drawer-overlay"></label>
        <ul className="menu p-5 w-80 bg-base-100">
          <li>
            <NavLink href={"/"}>
              <FormattedMessage id="nav.home" />
            </NavLink>
          </li>
          {menuItems}
        </ul>
      </div>
    </nav>
  );
};
