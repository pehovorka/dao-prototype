import Image from "next/image";
import Link from "next/link";
import { NavLink } from "./NavLink";

interface Props {}
export const Navbar = (props: Props) => {
  return (
    <nav>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            Homeowners DAO
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Homeowners</a>
            </li>
            <li>
              <a>Bulletin</a>
            </li>
            <li>
              <NavLink href="/proposals">Proposals</NavLink>
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
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
