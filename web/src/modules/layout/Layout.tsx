import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Footer, Navbar } from "@/modules/layout";

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
          style: {
            padding: "1rem",
            maxWidth: "30rem",
            marginBottom: "2rem",
            background: "hsl(var(--b1))",
            color: "hsl(var(--bc))",
            borderWidth: "1px",
            borderColor: "hsl(var(--bc) / 0.2)",
          },
          duration: 7500,
          error: {
            style: {
              background: "hsl(var(--er))",
              color: "hsl(var(--erc))",
              borderColor: "hsl(var(--erc) / 0.2)",
            },
          },
        }}
      />
    </>
  );
};
