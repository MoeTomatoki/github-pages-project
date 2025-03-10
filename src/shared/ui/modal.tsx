import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import {
  PhoneNumberUtil,
  PhoneNumberFormat,
  RegionCode,
} from "google-libphonenumber";

import ButtonUI from "./button";
import { CrossIcon } from "../icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  showNotification: () => void;
}

export default function Modal({
  isOpen,
  onClose,
  showNotification,
}: ModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("EM");
  const [contact, setContact] = useState("");
  const { t } = useTranslation();
  const forEmail = useId();
  const forPhone = useId();
  const forCategory = useId();
  const forDescription = useId();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formattedData = () => {
      if (selectedCategory === "PH") {
        const formattedNumber = formatPhoneNumber(contact, "RU");
        return formattedNumber;
      } else {
        return contact;
      }
    };
    onClose();
    showNotification();
    console.log(formattedData());
    console.log("Fetching form...");
  };

  function formatPhoneNumber(number: string, countryCode: RegionCode) {
    const phoneUtil = PhoneNumberUtil.getInstance();
    try {
      const phoneNumber = phoneUtil.parseAndKeepRawInput(number, countryCode);
      return phoneUtil.format(phoneNumber, PhoneNumberFormat.INTERNATIONAL);
    } catch (error) {
      console.error("Ошибка при форматировании номера:", error);
      return null;
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 bg-neutral-900/70 dark:bg-neutral-900/50 flex justify-center items-center z-50"
      onClick={onClose}
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
            <form className="space-y-4" action="#">
              <div className="md:grid md:grid-cols-2 gap-2 mb-2">
                <div>
                  {selectedCategory === "EM" ? (
                    <>
                      <label
                        htmlFor={forEmail}
                        className="block mb-2 text-sm font-medium text-neutral-800 dark:text-neutral-100"
                      >
                        {t("Ваша электронная почта")}
                      </label>
                      <input
                        type="email"
                        name="email"
                        id={forEmail}
                        className="mb-2 text-sm rounded-lg bg-neutral-50 border block w-full p-2.5 border-neutral-300 text-neutral-800 focus:ring-neutral-500 focus:border-neutral-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-100"
                        placeholder="name@company.com"
                        value={contact}
                        onChange={(e) => handleContactChange(e)}
                        required
                      />
                    </>
                  ) : (
                    <>
                      <label
                        htmlFor={forPhone}
                        className="block mb-2 text-sm font-medium text-neutral-800 dark:text-neutral-100"
                      >
                        {t("Ваш номер телефона")}
                      </label>
                      <input
                        type="phone"
                        name="phone"
                        id={forPhone}
                        className="mb-2 text-sm rounded-lg bg-neutral-50 border block w-full p-2.5 border-neutral-300 text-neutral-800 focus:ring-neutral-500 focus:border-neutral-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-100"
                        placeholder="+7 (987) 543-22-11"
                        value={contact}
                        onChange={(e) => handleContactChange(e)}
                        required
                      />
                    </>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={forCategory}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("Как с вами связаться?")}
                  </label>
                  <select
                    id={forCategory}
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e)}
                    className="border text-sm rounded-lg block w-full p-2.5 border-neutral-300 text-neutral-800 focus:ring-neutral-500 focus:border-neutral-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-100"
                  >
                    <option value="EM">{t("Почта")}</option>
                    <option value="PH">{t("Телефон")}</option>
                  </select>
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor={forDescription}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("Что Вы хотели нам сообщить?")}
                </label>
                <textarea
                  id={forDescription}
                  rows={4}
                  className="block p-2.5 w-full text-sm rounded-lg border border-neutral-300 text-neutral-800 focus:ring-neutral-500 focus:border-neutral-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-100"
                  placeholder={t("Введите сообщение здесь...")}
                />
              </div>

              <ButtonUI
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="w-full font-medium px-5 py-2.5"
              >
                {t("Отправить запрос")}
              </ButtonUI>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-portal")!,
  );
}
