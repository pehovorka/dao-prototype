import { SEO } from "@/components/common/SEO";
import { Form } from "@/components/newProposalPage/Form";
import { Title } from "@/components/ui/Title";
import { FormattedMessage, useIntl } from "react-intl";

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
