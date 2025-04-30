import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import { UserDataRegister } from "@shared/types/user-data";
import { useAuth } from "@features/providers/auth-context/auth-context";
import {
  NotificationOptions,
  NotificationType,
} from "@shared/types/notification";

type AuthResponse = {
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
      showNotification(t("Требуется пароль для регистрации", "warning"));
      return;
    }

    const endpoint = isLogin ? "login" : "register";
    const url = `http://localhost:3000/auth/${endpoint}`;

    try {
      const requestBody = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data: AuthResponse = await response.json();

      if (response.ok) {
        showNotification(t("Успешно! Вы зарегистрировались и вошли!"));
        login({
          username: formData.username,
          email: formData.email,
          token: data.access_token,
        });
        onClose();
      } else {
        console.log(data.message);
        showNotification(t(data.message as string) || t("Ошибка входа!"), {
          type: "error",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("Ошибка соединения с сервером", {
        type: "error",
        duration: 5000,
      });
    }
  };

  return { handleChange, handleSubmit };
};
