import Link from "next/link";
import { FormattedMessage, MessageDescriptor } from "react-intl";

export interface BreadcrumbsItem {
  message: MessageDescriptor["id"];
  href?: string | undefined;
}

interface BreadcrumbsProps {
  items: BreadcrumbsItem[];
}
export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <Link href={item.href} prefetch={false}>
                <FormattedMessage id={item.message} />
              </Link>
            ) : (
              <FormattedMessage id={item.message} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
