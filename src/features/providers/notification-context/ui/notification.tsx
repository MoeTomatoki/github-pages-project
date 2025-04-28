import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import clsx from "clsx";

import { CorrectIcon, ErrorIcon, WarningIcon, InfoIcon } from "@shared/icons";

type Props = {
  isVisible: boolean;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  className?: string;
};

export default function Notification({
  isVisible,
  message,
  type = 'success',
  className,
}: Props) {

  const icons = {
    success: <CorrectIcon className="w-5 h-5 text-green-400" />,
    error: <ErrorIcon className="w-5 h-5 text-red-400" />,
    warning: <WarningIcon className="w-5 h-5 text-yellow-400" />,
    info: <InfoIcon className="w-5 h-5 text-blue-400" />,
  };

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className={clsx(
            "fixed bottom-4 right-4 bg-neutral-800 text-neutral-50 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50",
            className
          )}
        >
          {icons[type]}
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("notification-portal")!
  );
}