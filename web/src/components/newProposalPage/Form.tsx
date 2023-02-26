import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { useEthers, useContractFunction } from "@usedapp/core";
import toast from "react-hot-toast";
import type { Options } from "easymde";

import { Skeleton } from "../ui/Skeleton";
import { NoWalletCard } from "./NoWalletCard";
import { governorContract } from "@/consts/governorContract";
import { tokenContract } from "@/consts/tokenContract";
import { useRouter } from "next/router";

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
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const { account, activateBrowserWallet } = useEthers();
  const { send, state, events } = useContractFunction(
    governorContract,
    "propose"
  );

  useEffect(() => {
    console.log("state", state);
    switch (state.status) {
      case "None":
        toast.dismiss();
        break;
      case "Mining":
        toast.dismiss();
        toast.loading(<FormattedMessage id="proposal.new.state.mining" />, {
          duration: 1000000,
        });
        break;
      case "Success":
        toast.dismiss();
        toast.success(<FormattedMessage id="proposal.new.state.success" />);
        break;
      case "Exception":
        toast.dismiss();
        setLoading(false);
        toast.error(<FormattedMessage id="proposal.new.state.exception" />);
        break;
      case "Fail":
        toast.dismiss();
        setLoading(false);
        toast.error(<FormattedMessage id="proposal.new.state.exception" />);
        break;
      default:
        break;
    }
  }, [state]);

  useEffect(() => {
    console.log("events", events);
    if (events && events.length > 0) {
      const event = events[0];
      const { args } = event;
      if (args) {
        const data = args[0];
        push(`/proposals/${data}`);
      }
    }
  }, [events, push]);

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    console.log(data);
    send(
      [tokenContract.address],
      [0],
      ["0x"],
      `# ${data.title}\n${data.description}`
    );
  });

  const mdEditorOptions = useMemo(() => {
    return {
      status: false,
      spellChecker: false,
      toolbarTips: false,
    } as Options;
  }, []);

  if (!account) {
    return (
      <section>
        <NoWalletCard activateBrowserWallet={activateBrowserWallet} />
      </section>
    );
  }

  return (
    <>
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
            className={`input input-bordered w-full ${
              errors.title && "input-error"
            }`}
          />

          <label className="label">
            <span className="label-text-alt text-error h-5">
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
        </form>
      </section>
    </>
  );
};
