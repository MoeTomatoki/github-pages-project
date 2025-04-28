import { NotificationOptions, NotificationContextType, NotificationState } from '@shared/types/notification';
import { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => {},
  notification: { 
    isVisible: false, 
    message: '', 
    type: 'success' 
  },
});

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [notification, setNotification] = useState<NotificationState>({
    isVisible: false,
    message: '',
    type: 'success',
  });

  const showNotification = (message: string, options?: NotificationType | NotificationOptions) => {
    const params = typeof options === 'string' 
      ? { type: options } 
      : options || {};
    
    const { type = 'success', duration = 3000 } = params;

    setNotification({
      isVisible: true,
      message: t(message),
      type,
    });

    setTimeout(() => {
      setNotification(prev => ({ ...prev, isVisible: false }));
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ showNotification, notification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);