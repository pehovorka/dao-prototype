interface TitleProps {
  children: string;
}
export const Title = ({ children }: TitleProps) => {
  return <h1 className="text-4xl font-black mb-10">{children}</h1>;
};
