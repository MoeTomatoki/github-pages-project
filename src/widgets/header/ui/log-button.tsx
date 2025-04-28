import { memo } from 'react';
import { LoginIcon, LogoutIcon } from "@shared/icons";
import { ButtonUI } from "@shared/ui";
import { useAuth } from "@features/providers/auth-context/auth-context";

export const LogButton = memo(({ onClick }: { onClick: () => void }) => {
  const { user, logout } = useAuth();

  return (
    <ButtonUI 
      onClick={user ? logout : onClick}
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