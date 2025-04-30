import { useAuth } from '@features/providers/auth-context/auth-context';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Avatar } from '@shared/ui/avatar';
import clsx from 'clsx';
import { ChevronDown, LogoutIcon, SettingsIcon, UserIcon } from '@shared/icons';
import { t } from 'i18next';

export const Profile = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex items-center gap-2 p-1 pr-2 rounded-full",
          "hover:bg-neutral-200 dark:hover:bg-neutral-800",
          "transition-colors duration-200",
          "outline-none focus:ring-1 focus:ring-neutral-500 focus:ring-opacity-50"
        )}
      >
        <Avatar username={user.username} size="sm" />
        <span className="font-medium text-sm truncate max-w-[120px]">
          {user.username}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              "absolute right-0 mt-4 w-42 rounded-md shadow-lg",
              "bg-neutral-100 dark:bg-neutral-800",
              "text-md z-50"
            )}
          >
            <div className="py-1">
              <div className="px-4 py-2 text-xs text-neutral-500 dark:text-neutral-400">
                {user.email}
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-2 flex items-center gap-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                <UserIcon className="w-4 h-4" />
                <span>{t("Мой профиль")}</span>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-2 flex items-center gap-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                <SettingsIcon className="w-4 h-4" />
                <span>{t("Настройки")}</span>
              </motion.div>
              
              <div className="border-t border-neutral-200 dark:border-neutral-700 my-1"></div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={logout}
                className={clsx(
                  "p-2 flex items-center gap-2 cursor-pointer",
                  "text-red-500 hover:bg-red-200/50 dark:hover:bg-red-900/20"
                )}
              >
                <LogoutIcon className="w-4 h-4" />
                <span>{t("Выйти")}</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};