import { useBlock } from "@/hooks";
import { FormattedDate, FormattedTime } from "react-intl";

interface BlockDateProps {
  blockNumber: number;
}
export const BlockDate = ({ blockNumber }: BlockDateProps) => {
  const block = useBlock(blockNumber);
  if (!block) return <>...</>;
  const date = new Date(block.timestamp * 1000);

  return (
    <>
      <FormattedDate value={date} /> <FormattedTime value={date} />
    </>
  );
};
