import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { NavLink } from "./NavLink";
import { Languages } from "@/hooks/useLang";
import { FormattedMessage } from "react-intl";

export const Navbar = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const handleLanguageChange = () => {
    const newLocale = locale === Languages.EN ? Languages.CS : Languages.EN;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <nav>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            <FormattedMessage id="site.name" />
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>
                <FormattedMessage id="nav.homeowners" />
              </a>
            </li>
            <li>
              <a>
                {" "}
                <FormattedMessage id="nav.bulletin" />
              </a>
            </li>
            <li>
              <NavLink href="/proposals">
                <FormattedMessage id="nav.proposals" />
              </NavLink>
            </li>
          </ul>
        </div>
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
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={handleLanguageChange}>
                {locale === Languages.EN ? "Česky" : "English"}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
