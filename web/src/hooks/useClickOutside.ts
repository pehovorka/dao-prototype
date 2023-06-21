import { type RefObject, useCallback, useEffect } from "react";

export const useClickOutside = (
  callback: () => void,
  ref: RefObject<HTMLDivElement>
) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (
        ref?.current?.contains &&
        !ref.current.contains(event.target as Node)
      ) {
        callback();
      }
    },
    [callback, ref]
  );

  useEffect(() => {
    document.addEventListener("mouseup", handleClick);

    return () => {
      document.removeEventListener("mouseup", handleClick);
    };
  }, [handleClick]);
};
