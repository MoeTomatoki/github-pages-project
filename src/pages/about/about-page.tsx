import clsx from "clsx";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { ObjFromData } from "../../shared/types/dataFromServer";
import { fetchDataApi } from "../../shared/api/fetchData";
import { Loader } from "../../shared/ui";
import ButtonUI from "../../shared/ui/button";
import ErrorPage from "./error-page";

export default function AboutPage() {
    const { index } = useLocation().state || "-1";
    const [page, setPage] = useState<number>(Number(index));

    const { data: dataItem, error, isLoading, isError } = useQuery({
        queryKey: ["items", "list", { page }],
        queryFn: meta => fetchDataApi.getItemsAbout({ page }, meta)
    });

    if (isError) return <ErrorPage error={error} />

    if (isLoading) return (
        <div className="flex min-h-[80vh] items-center justify-center">
            <Loader />
        </div>
    )

    const currentData = dataItem?.data[0];

    const handleClick = (isPrev: boolean) => {
        setPage(p => isPrev ? Math.max(p - 1, 0) : p + 1)
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
            <div className="flex justify-center">
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