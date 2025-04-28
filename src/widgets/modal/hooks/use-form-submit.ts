import { useNotification } from "@features/providers/notification-context/notification-context";

export const useSubmit = () => {
    const { showNotification } = useNotification();
    
    const handleSubmit = () => {
        showNotification("Ваш запрос был успешно отправлен!", "success" );
    };

    return { handleSubmit }
}