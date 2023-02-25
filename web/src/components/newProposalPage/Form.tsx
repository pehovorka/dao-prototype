import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import "easymde/dist/easymde.min.css";
import type { Options } from "easymde";
import { Skeleton } from "../ui/Skeleton";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => (
    <>
      <Skeleton type="TITLE" />
      <Skeleton type="TEXT" />
    </>
  ),
});

export const Form = () => {
  const { formatMessage } = useIntl();
  const [value, setValue] = useState<string>("");

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const mdEditorOptions = useMemo(() => {
    return {
      status: false,
      spellChecker: false,
      toolbarTips: false,
    } as Options;
  }, []);

  return (
    <section>
      <label className="label label-text text-lg">
        <FormattedMessage id="proposal.new.page.form.title.title" />
      </label>
      <input
        type="text"
        placeholder={formatMessage({
          id: "proposal.new.page.form.title.placeholder",
        })}
        className="input input-bordered w-full mb-8"
      />
      <label className="label label-text text-lg">
        <FormattedMessage id="proposal.new.page.form.description.title" />
      </label>
      <SimpleMDE
        value={value}
        onChange={onChange}
        placeholder={formatMessage({
          id: "proposal.new.page.form.description.placeholder",
        })}
        options={mdEditorOptions}
        className="prose max-w-full"
      />
      <div className="flex justify-end mt-8 gap-4">
        <button className="btn btn-ghost">
          <FormattedMessage id="proposal.new.page.form.button.cancel" />
        </button>
        <button className="btn btn-primary">
          <FormattedMessage id="proposal.new.page.form.button.create" />
        </button>
      </div>
    </section>
  );
};
