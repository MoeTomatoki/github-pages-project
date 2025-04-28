import { useNotification } from "./notification-context";
import Notification from "./ui/notification";

export const NotificationWrapper = () => {
  const { notification } = useNotification();

  return (
    <Notification 
      isVisible={notification.isVisible} 
      message={notification.message} 
    />
  );
};