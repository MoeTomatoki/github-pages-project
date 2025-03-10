import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import { CorrectIcon } from "../icons";

interface NotificationProps {
  isVisible: boolean;
  message: string;
}

export default function Notification({
  isVisible,
  message,
}: NotificationProps) {
  const { t } = useTranslation();

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 bg-neutral-800 text-neutral-50 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50"
        >
          <CorrectIcon className="w-5 h-5 text-green-400" />
          <span>{t(message)}</span>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("notification-portal")!,
  );
}
