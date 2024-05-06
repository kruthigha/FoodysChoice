import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

export default function Modal({ children, open, onClose,className = "" }) {
  const dialog = useRef();

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (open) {
      dialog.current.showModal();
    } 
    return () => {
      dialog.current.close();
    };
  }, [open]);

  return createPortal(
    <dialog ref={dialog} onClose={onClose} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
