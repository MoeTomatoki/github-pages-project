import { memo } from "react";
import { LoginIcon, LogoutIcon } from "@shared/icons";
import { ButtonUI } from "@shared/ui";
import { useAuth } from "@features/providers/auth-context/auth-context";
import { useNotification } from "@features/providers/notification-context/notification-context";

export const LogButton = memo(({ onClick }: { onClick: () => void }) => {
  const { user, logout } = useAuth();
  const { showNotification } = useNotification();

  const handleClick = () => {
    if (user) {
      logout();
      showNotification("Вы вышли из аккаунта!", "info");
    } else {
      onClick();
    }
  };

  return (
    <ButtonUI
      onClick={handleClick}
      className="hover:cursor-pointer"
      aria-label={user ? "Logout" : "Login"}
    >
      {user ? (
        <LogoutIcon className="h-6 w-6" />
      ) : (
        <LoginIcon className="h-6 w-6" />
      )}
    </ButtonUI>
  );
});
