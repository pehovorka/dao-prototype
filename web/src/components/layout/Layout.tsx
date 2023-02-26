import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Footer } from "./Footer";

import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar>
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>
        <Footer />
      </Navbar>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { padding: "1rem" },
        }}
      />
    </>
  );
};
