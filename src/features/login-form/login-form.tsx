import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonUI } from "@shared/ui";

import { useNotification } from "@features/providers/notification-context/notification-context";
import { useHandle } from "./hooks/use-handle";
import { UserDataRegister } from "@shared/types/user-data";

type Props = {
  onClose: () => void;
};

export const LoginForm = ({ onClose }: Props) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<UserDataRegister>({
    username: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const { showNotification } = useNotification();

  const { handleChange, handleSubmit } = useHandle({
    onClose,
    showNotification,
    formData,
    setFormData,
    isLogin,
  });

  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
            >
              {t("Имя пользователя")}
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="mb-2 text-sm rounded-lg bg-neutral-50 border block w-full p-2.5 border-neutral-300 text-neutral-800 focus:ring-neutral-500 focus:border-neutral-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-100"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            {t("Почта")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mb-2 text-sm rounded-lg bg-neutral-50 border block w-full p-2.5 border-neutral-300 text-neutral-800 focus:ring-neutral-500 focus:border-neutral-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-100"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            {t("Password")}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
            value={formData.password}
            onChange={handleChange}
            className="mb-2 text-sm rounded-lg bg-neutral-50 border block w-full p-2.5 border-neutral-300 text-neutral-800 focus:ring-neutral-500 focus:border-neutral-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-100"
          />
        </div>

        <ButtonUI
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLogin ? t("Вход") : t("Регистрация")}
        </ButtonUI>

        <div className="flex items-center justify-center mt-4">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
          >
            {isLogin
              ? t("Нет аккаунта? Зарегистрируйтесь!")
              : t("Уже есть аккаунт? Войдите!")}
          </button>
        </div>
      </form>
    </div>
  );
};
