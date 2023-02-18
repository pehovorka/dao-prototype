import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}
export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </>
  );
};
