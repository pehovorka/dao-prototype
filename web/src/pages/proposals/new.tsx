import { FormattedMessage, useIntl } from "react-intl";

import { SEO } from "@/components/common";
import { Title } from "@/components/ui";
import { Form } from "@/components/proposals/newProposalPage";

export default function NewProposalPage() {
  const { formatMessage } = useIntl();
  return (
    <>
      <SEO title={formatMessage({ id: "proposal.new.page.title" })} />
      <Title>
        <FormattedMessage id="proposal.new.page.title" />
      </Title>
      <Form />
    </>
  );
}
