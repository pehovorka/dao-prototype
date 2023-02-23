import { createElement, type ReactNode } from "react";

export enum TitleType {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
}

const titleStyles = {
  [TitleType.H1]: "text-4xl font-black mb-10",
  [TitleType.H2]: "text-3xl font-bold mb-5",
  [TitleType.H3]: "text-2xl font-bold mb-3",
  [TitleType.H4]: "text-xl font-bold mb-2",
  [TitleType.H5]: "text-lg font-bold mb-1",
} as const;

interface TitleProps {
  children: ReactNode;
  type?: TitleType;
}
export const Title = ({ children, type }: TitleProps) => {
  return createElement(
    type || TitleType.H1,
    { className: titleStyles[type || TitleType.H1] },
    children
  );
};
