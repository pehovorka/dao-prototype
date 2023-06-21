import { useClickOutside, useEscapeKey } from "@/hooks";
import { useRef, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}
export const Modal = ({ open, onClose, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEscapeKey(onClose);
  useClickOutside(onClose, ref);

  return (
    <div className={`modal ${open && "modal-open"}`}>
      <div className="modal-box max-w-fit" ref={ref}>
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};
