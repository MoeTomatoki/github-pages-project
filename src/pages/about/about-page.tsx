import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { ObjFromData } from "../../shared/types/dataFromServer";
import { fetchDataApi } from "../../shared/api/fetchData";
import { Loader } from "../../shared/ui";
import ButtonUI from "../../shared/ui/button";
import clsx from "clsx";


export default function AboutPage() {
    const { id } = useParams();
    const { index } = useLocation().state || "-1";
    const [page, setPage] = useState<number>(Number(index));

    const { data: dataItem, error, isLoading, isError } = useQuery({
        queryKey: ["items", "list", { page }],
        queryFn: meta => fetchDataApi.getItemsAbout({ page }, meta)
    });
    const currentData = dataItem?.data[0];
    console.log(dataItem)
    const handleClick = (isLeft: boolean) => {
        setPage(p => isLeft ? Math.max(p - 1, 0) : p + 1)
    }

    if (isError) {
        return (
            <div className="flex flex-col text-center">
                <div className="flex min-h-[80vh] items-center justify-center">
                    <div className="flex flex-col text-center">
                        {
                            error.toString().includes("Некорректная ссылка")
                                ? <>
                                    <span className="text-5xl font-bold text-neutral-50">Данные не найдены</span>
                                    <span className="mt-2 text-xl bold text-neutral-200">Возможно такой страницы ещё не существует</span>
                                </>
                                : <span className="text-2xl text-neutral-50">Ошибка: {error.message}</span>
                        }
                    </div>
                </div>
                <span className="mt-auto text-md font-thin text-neutral-200">Текущая ссылка: {`http://russian-tours/about-page/${id}`}</span>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <>
            <div className="flex min-h-[80vh] items-center">
                <div className="grid grid-cols-2 items-center gap-10 max-w-[900px] mx-auto">
                    <div className="w-full flex justify-center">
                        <div className="flex flex-col text-neutral-50">
                            <div className="text-5xl font-bold w-md text-pretty">{currentData?.name}</div>
                            <Img currentData={currentData} />
                        </div>
                    </div>
                    <div className="flex flex-col text-neutral-50">
                        <div className="mt-2">
                            <div className="mr-1 text-neutral-400 flex justify-between">
                                URL:
                                <span>Номер страницы: {page + 1}</span>
                            </div><br />

                            <a
                                href={currentData?.url.adress}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-200 hover:underline"
                            >
                                {currentData?.url.name}
                            </a>
                        </div>
                        <Text currentData={currentData} />
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-6"> {/* Центрирование кнопок */}
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
                    className={clsx(!dataItem?.next && "opacity-50 cursor-not-allowed text-red-600")}
                >
                    →
                </ButtonUI>
            </div>
        </>
    )
}

function Img({ currentData }: { currentData: ObjFromData | undefined }) {
    return (
        <div className="mt-4 text-neutral-300">
            <div
                style={{
                    backgroundImage: `url(${currentData?.imgPath})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className={`aspect-square rounded-xl bg-neutral-50 object-cover`}
            >
            </div>
        </div>
    )
}

export function Text({ currentData }: { currentData: ObjFromData | undefined }) {
    return (
        <div className="mt-2 text-xl font-thin indent-8 text-justify">
            {currentData?.aboutMe.map((paragraph, index) => <p
                key={index}
                className="mt-2"
            >
                {paragraph}
            </p>
            )}
        </div>
    )
}