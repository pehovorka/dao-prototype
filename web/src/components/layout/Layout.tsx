import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Footer, Navbar } from "@/components/layout";

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
        position="bottom-center"
        toastOptions={{
          style: { padding: "1rem", maxWidth: "30rem", marginBottom: "2rem" },
          duration: 7500,
        }}
      />
    </>
  );
};
