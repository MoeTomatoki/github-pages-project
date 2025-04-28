import { useTranslation } from "react-i18next";
import { IconWrapper } from "./icon-wrapper";
import { FooterList } from "@shared/types/footer-list";

export function List({ LIST_ELEMENTS }: { LIST_ELEMENTS: FooterList }) {
  const { t } = useTranslation();
  return (
    <>
      {Object.entries(LIST_ELEMENTS).map(([text, icon], index) => (
        <IconWrapper key={index}>
          {icon}
          {t(text)}
        </IconWrapper>
      ))}
    </>
  );
}
