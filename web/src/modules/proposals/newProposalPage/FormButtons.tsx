import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

interface FormButtonsProps {
  loading: boolean;
}
export const FormButtons = ({ loading }: FormButtonsProps) => {
  const { push } = useRouter();
  return (
    <div className="flex justify-end mt-8 gap-4">
      <button
        onClick={() => push("/proposals")}
        disabled={loading}
        className={`btn btn-ghost`}
      >
        <FormattedMessage id="proposal.new.page.form.button.cancel" />
      </button>
      <button
        type="submit"
        disabled={loading}
        className={`btn btn-primary ${loading && "loading"}`}
      >
        <FormattedMessage id="proposal.new.page.form.button.create" />
      </button>
    </div>
  );
};
