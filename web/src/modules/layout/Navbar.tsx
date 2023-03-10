import Link from "next/link";
import type { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import { NavLink } from "./NavLink";
import { NavProfileDropdown } from "../profile/NavProfileDropdown";

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
  return (
    <nav className="drawer bg-base-200">
      <input id="side-menu" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col h-full justify-between">
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
            <NavProfileDropdown />
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
