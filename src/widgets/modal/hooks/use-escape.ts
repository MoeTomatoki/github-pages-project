type Props = {
  onClose: () => void;
};

export const useEscape = ({ onClose }: Props) => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  document.addEventListener("keydown", handleEscape);
  document.removeEventListener("keydown", handleEscape);

  return { handleEscape };
};
