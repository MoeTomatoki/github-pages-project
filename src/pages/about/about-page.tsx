import clsx from "clsx";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { ObjFromData } from "@shared/types/data-from-server";
import { fetchDataApi } from "@features/data-fetch/api/fetchData";
import { Loader } from "@shared/ui";
import { ButtonUI } from "@shared/ui";
import { ErrorPage } from "./";
import Modal from "@widgets/modal";

export default function AboutPage() {
  const { index } = useLocation().state || "-1";
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState<number>(Number(index));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    data: dataItem,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["items", "list", i18n.language, { page }],
    queryFn: (meta) =>
      fetchDataApi.getItemsAbout({ language: i18n.language, page }, meta),
  });

  if (isError) return <ErrorPage error={error} />;

  if (isLoading)
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loader />
      </div>
    );

  const currentData = dataItem?.data[0];

  const handleClick = (isPrev: boolean) => {
    setPage((p) => (isPrev ? Math.max(p - 1, 0) : p + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:min-h-[70vh] items-center p-4 text-neutral-800 dark:text-neutral-100"
    >
      <div className="flex flex-col md:min-h-[70vh] items-center text-neutral-800 dark:text-neutral-100">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-pretty">
            {currentData?.name}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2">
            <span>
              {t("Номер страницы:")} {page + 1}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-5xl w-full">
          <Img currentData={currentData} />

          <div className="flex text-xs md:text-md flex-col justify-center">
            <span className=" md:mb-4 text-neutral-500 dark:text-neutral-400">
              URL:
            </span>
            <a
              href={currentData?.url.adress}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold md:text-3xl md:font-semibold text-neutral-700 dark:text-neutral-200 text-justify hover:underline"
            >
              {currentData?.url.name}
            </a>
            <Text currentData={currentData} />
          </div>
        </div>

        <div className="mt-4 md:mt-8 flex justify-center gap-4">
          <ButtonUI
            onClick={() => handleClick(true)}
            disabled={page === 0}
            className={clsx(page === 0 && "opacity-50 cursor-not-allowed")}
          >
            ←
          </ButtonUI>
          <ButtonUI
            onClick={() => handleClick(false)}
            disabled={!dataItem?.next}
            className={clsx(!dataItem?.next && "opacity-50 cursor-not-allowed")}
          >
            →
          </ButtonUI>
        </div>

        <div className="mt-4 md:mt-16 flex flex-col items-center">
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            {t("Хочешь узнать большего? Ты всегда можешь связаться с нами!")}
          </p>
          <a
            href="#"
            className="text-pretty hover:underline mt-2"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            {t("Связаться с нами")}
          </a>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isContact
      />
    </motion.div>
  );
}

function Img({ currentData }: { currentData?: ObjFromData }) {
  return (
    <div className="mt-4 text-neutral-300">
      <div
        style={{
          backgroundImage: `url(${currentData?.imgPath})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={`aspect-square rounded-xl bg-neutral-50 object-cover`}
      ></div>
    </div>
  );
}

function Text({ currentData }: { currentData?: ObjFromData }) {
  return (
    <div className="mt-2 text-base md:text-xl font-thin indent-8 text-justify">
      {currentData?.aboutMe.map((paragraph, index) => (
        <p key={index} className="mt-2">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
