type Props = {
    onClose: () => void;
    showNotification: () => void;
};

export const useHandle = ({showNotification, onClose}: Props) => {
    const handleSubmit = (data: string) => {
        console.log(data);
        showNotification();
    };

    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose();
        }
    };

    document.addEventListener("keydown", handleEscape);
    document.removeEventListener("keydown", handleEscape);

    return { handleSubmit, handleEscape }
}