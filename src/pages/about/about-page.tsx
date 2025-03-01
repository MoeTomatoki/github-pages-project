import { useParams } from "react-router-dom";

import { ObjFromData } from "../../shared/types/dataFromServer";
import { useDataStore } from "../../shared/stores/useDataStore";
import { useEffect, useRef } from "react";

export default function AboutPage() {
    const { index } = useParams();
    const data = useRef<ObjFromData | null>(null);
    const isLoading = useRef<boolean>(true);

    const {items, loading, error, fetchData} = useDataStore();
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        const result = items?.find(item => item.id === index);
        data.current = result ? result : null;
        if (!loading && items) {
            isLoading.current = false;
        }
    }, [items])

    if (error) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center">
                <span className="text-2xl text-neutral-50">{error}</span>
            </div>
        );
    }

    if (isLoading.current) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center">
                <span className="text-2xl text-neutral-50">Загрузка...</span>
            </div>
        );
    }

    if (!data.current && !isLoading.current) {
        return (
            <div className="flex flex-col text-center">
                <div className="flex min-h-[80vh] items-center justify-center">
                    <div className="flex flex-col text-center">
                        <span className="text-5xl font-bold text-neutral-50">Данные не найдены</span>
                        <span className="mt-2 text-xl bold text-neutral-200">Возможно такой страницы ещё не существует</span>
                    </div>
                </div>
                <span className="mt-auto text-md font-thin text-neutral-200">Текущая ссылка: {`http://russian-tours/about-page/${index}`}</span>
            </div>
        )
    }

    return (
        <div className="flex min-h-[80vh] items-center">
            <div className="grid grid-cols-2 items-center gap-10 max-w-[900px] mx-auto">
                <div className="w-full flex justify-center">
                    <div className="flex flex-col text-neutral-50">
                        <div className="text-5xl font-bold w-md text-pretty">{data.current?.name}</div>
                        <Img currentData={data.current} />
                    </div>
                </div>
                <div className="flex flex-col text-neutral-50">
                    <div className="mt-2">
                        <span className="mr-1 text-neutral-400">URL:</span><br />
                        <a
                            href={data.current?.url.adress}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-200 hover:underline"
                        >
                            {data.current?.url.name}
                        </a>
                    </div>
                    <Text currentData={data.current} />
                </div>
            </div>
        </div>
    )
}

function Img({ currentData }: { currentData: ObjFromData }) {
    return (
        <div className="mt-4 text-neutral-300">
            <div
                style={{
                    backgroundImage: `url(${currentData.imgPath})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className={`aspect-square rounded-xl bg-neutral-50 object-cover`}
            >
            </div>
        </div>
    )
}

export function Text({ currentData }: { currentData: ObjFromData }) {
    return (
        <div className="mt-2 text-xl font-thin indent-8 text-justify">
            {currentData.aboutMe.map((paragraph, index) => <p
                key={index}
                className="mt-2"
            >
                {paragraph}
            </p>
            )}
        </div>
    )
}