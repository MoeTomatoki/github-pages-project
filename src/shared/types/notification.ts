export type NotificationType = "success" | "error" | "warning" | "info";

export type NotificationOptions = {
  type?: NotificationType;
  duration?: number;
};

export type NotificationState = {
  isVisible: boolean;
  message: string;
  type: NotificationType;
};

export type NotificationContextType = {
  showNotification: (
    message: string,
    options?: NotificationType | NotificationOptions,
  ) => void;
  notification: NotificationState;
};
