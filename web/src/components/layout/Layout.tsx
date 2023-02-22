import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </Navbar>
    </>
  );
};
