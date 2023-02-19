import type { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}
export const Title = ({ children }: TitleProps) => {
  return <h1 className="text-4xl font-black mb-10">{children}</h1>;
};
