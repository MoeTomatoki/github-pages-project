import { useQuery } from "@tanstack/react-query";

import { fetchDataApi } from "../../shared/api/fetchData";
import { Gallery } from "./";
import { useTranslation } from "react-i18next"
import clsx from "clsx";

export default function MainPage() {
    const { t, i18n } = useTranslation();
    const fromFetchQuery = useQuery({
        queryKey: ["items", "list", i18n.language],
        queryFn: meta => fetchDataApi.getItemsMain({language: i18n.language}, meta)
    });
    return (
        <div className="px-[25vw]">
            <div className="flex justify-center">
                <div className="flex flex-col justify-center items-center mt-4 max-w-xl text-base md:text-3xl text-center text-neutral-50 dark:text-neutral-800">
                    <h1 className={clsx("text-3xl md:text-5xl font-bold", i18n.language === "kor" ? "max-w-32 md:max-w-48" : "max-w-sm")}>
                        {t("Путешествия по России")}
                    </h1>
                    <h2 className="mt-2">
                        {t("Настоящая страна не в выпусках новостей, а здесь.")}
                    </h2>
                </div>
            </div>
            {<Gallery fromFetchQuery={fromFetchQuery} className="mt-4" />}
        </div>
    )
}
