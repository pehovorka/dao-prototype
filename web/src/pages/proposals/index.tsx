import { SEO } from "@/components/layout/SEO";
import { ProposalsList } from "@/components/proposalsPage/ProposalsList";
import { Title } from "@/components/ui/Title";
import { FormattedMessage, useIntl } from "react-intl";

export default function ProposalsPage() {
  const { formatMessage } = useIntl();
  return (
    <>
      <SEO title={formatMessage({ id: "proposals.title" })} />
      <Title>
        <FormattedMessage id="proposals.list.title" />
      </Title>
      <ProposalsList />
    </>
  );
}
