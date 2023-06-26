import { useBlock } from "@/hooks";
import { FormattedDate, FormattedTime } from "react-intl";

interface BlockDateProps {
  blockNumber: number;
}
export const BlockDate = ({ blockNumber }: BlockDateProps) => {
  const block = useBlock(blockNumber);
  const date = block.date;

  if (!block || !date) return <>...</>;

  return (
    <>
      <FormattedDate value={date} /> <FormattedTime value={date} />
    </>
  );
};
