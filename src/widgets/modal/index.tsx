import { createPortal } from "react-dom";

import { ContactForm } from "../../features/contact-form/contact-form";
import { useHandle } from "./hooks/use-handle";
import { CloseButton } from "./ui/close-button";
import { Layout } from "./ui/layout";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  showNotification: () => void;
};

export default function Modal({
  isOpen,
  onClose,
  showNotification,
}: ModalProps) {

  const { handleSubmit, handleEscape } = useHandle({onClose, showNotification});

  if (!isOpen) return null;

  return createPortal(
    <Layout
      contactForm={<ContactForm
        onSubmit={handleSubmit}
        onClose={onClose}
      />}
      closeButton={<CloseButton
        onClose={onClose}
      />}
      onClose={onClose}
      handleEscape={handleEscape}
    />,
    document.getElementById("modal-portal")!,
  );
}
