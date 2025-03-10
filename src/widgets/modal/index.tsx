import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import { CrossIcon } from "../../shared/icons";
import { ContactForm } from "../../features/contact-form/contact-form";

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
  const { t } = useTranslation();

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  document.addEventListener("keydown", handleEscape);
  document.removeEventListener("keydown", handleEscape);

  const handleSubmit = (data: string) => {
    console.log(data);
    showNotification();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-neutral-900/70 dark:bg-neutral-900/50 flex justify-center items-center z-50"
      onClick={onClose}
      onKeyDown={handleEscape as unknown as React.KeyboardEventHandler}
    >
      <div
        className="relative p-4 w-full max-w-md max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-lg shadow-sm bg-neutral-100 dark:bg-neutral-800">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-700 border-neutral-200">
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
              {t("Связаться с нами")}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="end-2.5 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center text-neutral-700 hover:bg-neutral-200 hover:text-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
            >
              <CrossIcon className="w-3 h-3" />
              <span className="sr-only">{t("Закрыть модальное окно")}</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <ContactForm onSubmit={handleSubmit} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-portal")!,
  );
}
