import { SEO } from "@/components/common/SEO";
import { FormattedMessage, useIntl } from "react-intl";

import { Title } from "@/components/ui/Title";
import { Form } from "@/components/newProposalPage/Form";

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
