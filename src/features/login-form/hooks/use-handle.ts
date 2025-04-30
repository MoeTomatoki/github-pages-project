import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import { UserDataLogin, UserDataRegister } from "@shared/types/user-data";
import { useAuth } from "@features/providers/auth-context/auth-context";
import {
  NotificationOptions,
  NotificationType,
} from "@shared/types/notification";
import { useMutation } from "@tanstack/react-query";

type AuthResponse = {
  user: { 
    id: string;
    email: string;
    username: string;
  };
  access_token: string;
  message?: string;
};

type Props = {
  onClose: () => void;
  isLogin: boolean;
  showNotification: (
    message: string,
    options?: NotificationType | NotificationOptions,
  ) => void;
  formData: UserDataRegister;
  setFormData: Dispatch<SetStateAction<UserDataRegister>>;
};

export const useHandle = ({
  onClose,
  showNotification,
  formData,
  setFormData,
  isLogin,
}: Props) => {
  const { t } = useTranslation();
  const { login } = useAuth();

  const authMutation = useMutation({
    mutationFn: async (requestBody: UserDataRegister | UserDataLogin) => {
      const endpoint = isLogin ? "login" : "register";
      const response = await fetch(`http://localhost:3000/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Ошибка соединения с сервером");
      }
      
      return response.json();
    },
    onSuccess: (data: AuthResponse) => {
      showNotification(t("Успешно! Вы зарегистрировались и вошли!"));
      login({
        username: data.user.username,
        email: formData.email,
        token: data.access_token, 
      });
      onClose();
    },
    onError: (error: Error) => {
      showNotification(t(error.message) || t("Ошибка входа!"), {
        type: "error",
        duration: 5000,
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && !formData.username) {
      showNotification(t("Требуется имя пользователя для регистрации", "warning"));
      return;
    }

    const requestBody = isLogin
    ? { 
      email: formData.email, 
      password: formData.password,
     }
    : formData;
    authMutation.mutate(requestBody);
  };

  return { 
    handleChange, 
    handleSubmit,
    isLoading: authMutation.isPending,
    error: authMutation.error  };
};
