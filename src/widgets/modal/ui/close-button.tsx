import { useTranslation } from "react-i18next";
import { CrossIcon } from "../../../shared/icons";

export function CloseButton({onClose}: {onClose: () => void}) {
    const { t } = useTranslation();
    return (
        <button
            type="button"
            onClick={onClose}
            className="end-2.5 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center text-neutral-700 hover:bg-neutral-200 hover:text-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
        >
            <CrossIcon className="w-3 h-3" />
            <span className="sr-only">{t("Закрыть модальное окно")}</span>
        </button>
    )
}