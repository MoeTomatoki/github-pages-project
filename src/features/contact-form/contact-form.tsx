import { useState, useId } from "react";
import { useTranslation } from "react-i18next";
import {
  PhoneNumberUtil,
  PhoneNumberFormat,
  RegionCode,
} from "google-libphonenumber";

import { ButtonUI } from "../../shared/ui";

type ContactFormProps = {
  onSubmit: (data: string) => void;
  onClose: () => void;
};

type FormState = {
  category: string;
  contact: string;
  description: string;
};

export const ContactForm = ({ onSubmit, onClose }: ContactFormProps) => {
  const [formState, setFormState] = useState<FormState>({
    category: "EM",
    contact: "",
    description: "",
  });
  const { category, contact, description } = formState;
  const { t } = useTranslation();
  const forEmail = useId();
  const forPhone = useId();
  const forCategory = useId();
  const forDescription = useId();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      category: e.target.value,
      contact: "",
    }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      contact: e.target.value,
    }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };

  function formatPhoneNumber(number: string, countryCode: RegionCode) {
    const phoneUtil = PhoneNumberUtil.getInstance();
    try {
      const phoneNumber = phoneUtil.parseAndKeepRawInput(number, countryCode);
      return phoneUtil.format(phoneNumber, PhoneNumberFormat.INTERNATIONAL);
    } catch (error) {
      console.error("Ошибка при форматировании номера:", error);
      return `Ошибка при форматировании номера: ${error}`;
    }
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formattedData =
      category === "PH" ? formatPhoneNumber(contact, "RU") : contact;
    const dataLog = `${formattedData || contact}: ${description}`;
    onSubmit(dataLog);
    onClose();
  };

  return (
    <form className="space-y-4" action="#">
      <div className="md:grid md:grid-cols-2 gap-2 mb-2">
        <div>
          {category === "EM" ? (
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
                onChange={handleContactChange}
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
                onChange={handleContactChange}
                required
              />
            </>
          )}
        </div>
        <div>
          <label
            htmlFor={forCategory}
            className="block mb-2 text-sm font-medium text-neutral-800 dark:text-neutral-100"
          >
            {t("Как с вами связаться?")}
          </label>
          <select
            id={forCategory}
            value={category}
            onChange={handleCategoryChange}
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
          className="block mb-2 text-sm font-medium text-neutral-800 dark:text-neutral-100"
        >
          {t("Что Вы хотели нам сообщить?")}
        </label>
        <textarea
          id={forDescription}
          rows={4}
          className="block p-2.5 w-full text-sm rounded-lg border border-neutral-300 text-neutral-800 focus:ring-neutral-500 focus:border-neutral-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-100"
          placeholder={t("Введите сообщение здесь...")}
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <ButtonUI
        type="submit"
        onClick={handleSubmit}
        className="w-full font-medium px-5 py-2.5"
      >
        {t("Отправить запрос")}
      </ButtonUI>
    </form>
  );
};
