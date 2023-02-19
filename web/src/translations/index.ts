// run `yarn localize` to generate translation files
import cs from "./cs.json";
import en from "./en.json";

export type MessageKey = keyof typeof cs;

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: MessageKey;
    }
  }
}

export { cs, en };
