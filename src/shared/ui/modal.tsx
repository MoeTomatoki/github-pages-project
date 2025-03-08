import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import ButtonUI from "./button";
import { CrossIcon } from "../icons";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
    const { t } = useTranslation();
    const forEmail = useId();
    const forPassword = useId();
    const forRemember = useId();

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

    return createPortal(
        <div
            className="fixed inset-0 bg-neutral-900/70 dark:bg-neutral-900/50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="relative p-4 w-full max-w-md max-h-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative bg-neutral-50 rounded-lg shadow-sm dark:bg-neutral-800">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-700 border-neutral-200">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                            {t("Войдите на нашу платформу")}
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="end-2.5 text-neutral-500 dark:text-neutral-200 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
                        >
                            <CrossIcon className="w-3 h-3" />
                            <span className="sr-only">{t("Закрыть модальное окно")}</span>
                        </button>
                    </div>

                    <div className="p-4 md:p-5">
                        <form className="space-y-4" action="#">
                            <div>
                                <label
                                    htmlFor={forEmail}
                                    className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-100"
                                >
                                    {t("Ваш адрес электронной почты")}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id={forEmail}
                                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-100"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor={forPassword}
                                    className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-100"
                                >
                                    {t("Ваш пароль")}
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id={forPassword}
                                    placeholder="••••••••"
                                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-100"
                                    required
                                />
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id={forRemember}
                                            type="checkbox"
                                            value=""
                                            className="w-4 h-4 border border-neutral-300 rounded-sm bg-neutral-50 focus:ring-neutral-500 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600 dark:focus:ring-neutral-500"
                                            required
                                        />
                                    </div>
                                    <label
                                        htmlFor={forRemember}
                                        className="ms-2 text-sm font-medium text-neutral-900 dark:text-neutral-100"
                                    >
                                        {t("Запомнить меня")}
                                    </label>
                                </div>
                                <a
                                    href="#"
                                    className="text-sm text-neutral-500 dark:text-neutral-400 hover:underline"
                                >
                                    {t("Забыли пароль?")}
                                </a>
                            </div>

                            <ButtonUI
                                type="submit"
                                className="w-full font-medium px-5 py-2.5 text-center bg-neutral-800 text-neutral-50 hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                            >
                                {t("Войти в учетную запись")}
                            </ButtonUI>

                            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                {t("Нет учетной записи?")}{" "}
                                <a
                                    href="#"
                                    className="text-neutral-500 dark:text-neutral-400 hover:underline"
                                >
                                    {t("Создать учетную запись")}
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal-root")!
    );
}