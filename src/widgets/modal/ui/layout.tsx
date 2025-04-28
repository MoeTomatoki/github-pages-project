import { useTranslation } from "react-i18next";

type Props = {
    contentForm: React.ReactNode;
    closeButton: React.ReactNode;
    isContact?:boolean
    onClose: () => void;
    handleEscape: (e: KeyboardEvent) => void;
};

export function Layout({ contentForm, closeButton, isContact, onClose, handleEscape }: Props) {
    const { t } = useTranslation();

    return (
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
                            {isContact ? t("Связаться с нами"): "Регистрация"}
                        </h3>
                        {closeButton}
                    </div>
                    <div className="p-4 md:p-5">
                        {contentForm}
                    </div>
                </div>
            </div>
        </div>
    )
}