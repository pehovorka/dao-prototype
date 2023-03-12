interface SectionCardProps {
  children: React.ReactNode;
  title: string | React.ReactNode;
}
export const SectionCard = ({ children, title }: SectionCardProps) => {
  return (
    <section>
      <div className="card bg-base-100 shadow-md rounded-lg">
        <h2 className="card-title px-4 pt-4 pb-2">{title}</h2>
        <div className="divider m-0"></div>
        <div className="card-body">{children}</div>
      </div>
    </section>
  );
};
