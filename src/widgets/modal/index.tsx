import { createPortal } from "react-dom";

import { ContactForm } from "@features/contact-form/contact-form";
import { LoginForm } from "@features/login-form/login-form";
import { useSubmit } from "./hooks/use-form-submit";
import { useEscape } from "./hooks/use-escape";
import { CloseButton } from "./ui/close-button";
import { Layout } from "./ui/layout";

type ModalProps = {
  isOpen: boolean;
  isContact?: boolean
  onClose: () => void;
};

export default function Modal({
  isOpen,
  isContact,
  onClose,
}: ModalProps) {
  const { handleSubmit} = useSubmit();
  const { handleEscape } = useEscape({ onClose });

  if (!isOpen) return null;

  return createPortal(
    <Layout
      contentForm={isContact
        ? <ContactForm
          onSubmit={handleSubmit}
          onClose={onClose}
        />
        : <LoginForm
          onSubmit={handleSubmit}
          onClose={onClose}
        />
      }
      closeButton={<CloseButton
        onClose={onClose}
      />}
      onClose={onClose}
      handleEscape={handleEscape}
      isContact={isContact}
    />,
    document.getElementById("modal-portal")!,
  );
}
