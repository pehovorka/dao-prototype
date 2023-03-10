import { FormattedMessage, useIntl } from "react-intl";

import { SEO } from "@/modules/common";
import { Title } from "@/modules/ui";
import { Form } from "@/modules/proposals/newProposalPage";

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
