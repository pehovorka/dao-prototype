import dynamic from "next/dynamic";
import { useMemo } from "react";
import { type Control, Controller } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import "easymde/dist/easymde.min.css";
import type { Options } from "easymde";

import { Skeleton } from "@/modules/ui";
import type { FormData } from "./Form";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => (
    <>
      <Skeleton type="TITLE" />
      <Skeleton type="TEXT" />
    </>
  ),
});

interface MarkdownEditorProps {
  control: Control<FormData>;
}
export const MarkdownEditor = ({ control }: MarkdownEditorProps) => {
  const { formatMessage } = useIntl();

  const mdEditorOptions = useMemo(() => {
    return {
      status: false,
      spellChecker: false,
      toolbarTips: false,
      placeholder: formatMessage({
        id: "proposal.new.page.form.description.placeholder",
      }),
    } as Options;
  }, [formatMessage]);

  return (
    <>
      <label className="label label-text text-lg">
        <FormattedMessage id="proposal.new.page.form.description.title" />
      </label>
      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <SimpleMDE
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            options={mdEditorOptions}
            className="prose max-w-full"
          />
        )}
        name="description"
        control={control}
        defaultValue=""
      />
    </>
  );
};
