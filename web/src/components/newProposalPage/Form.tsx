import dynamic from "next/dynamic";
import { useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import "easymde/dist/easymde.min.css";
import type { Options } from "easymde";
import { Controller, useForm } from "react-hook-form";

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

interface FormData {
  title: string;
  description: string;
}

export const Form = () => {
  const { formatMessage } = useIntl();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));

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
      <form onSubmit={onSubmit}>
        <input
          {...register("title", { required: true })}
          placeholder={formatMessage({
            id: "proposal.new.page.form.title.placeholder",
          })}
          className="input input-bordered w-full"
        />

        <label className="label">
          <span className="label-text-alt text-error h-10">
            {errors.title && (
              <FormattedMessage id="proposal.new.page.form.title.required" />
            )}
          </span>
        </label>

        <label className="label label-text text-lg">
          <FormattedMessage id="proposal.new.page.form.description.title" />
        </label>

        <Controller
          render={({ field: { onChange, onBlur, value } }) => (
            <SimpleMDE
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={formatMessage({
                id: "proposal.new.page.form.description.placeholder",
              })}
              options={mdEditorOptions}
              className="prose max-w-full"
            />
          )}
          name="description"
          control={control}
          defaultValue=""
        />
        <div className="flex justify-end mt-8 gap-4">
          <button className="btn btn-ghost">
            <FormattedMessage id="proposal.new.page.form.button.cancel" />
          </button>
          <button type="submit" className="btn btn-primary">
            <FormattedMessage id="proposal.new.page.form.button.create" />
          </button>
        </div>
      </form>
    </section>
  );
};
