import { useParams } from "react-router-dom";

import db from "../../../db.json";
import { Data, ObjFromData } from "../../ui/types/dataFromServer";

const rawData: Data = db.items;


export function AboutPage() {
    const { index } = useParams();

    const currentData = rawData.find((data) => data.id === Number(index))

    if (!currentData) {
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
        <div className="grid grid-cols-2 items-center gap-10 max-w-[900px] mx-auto">
            <div className="w-full flex justify-center">
                <div className="flex flex-col text-neutral-50">
                    <div className="text-5xl font-bold w-md text-pretty">{currentData.name}</div>
                    <Img currentData={currentData} />
                </div>
            </div>
            <div className="flex flex-col text-neutral-50">
                <div className="mt-2">
                    <span className="mr-1 text-neutral-400">URL:</span><br />
                    <a
                        href="https://park-kosa.ru"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-200 hover:underline"
                    >
                        park-kosa.ru
                    </a>
                </div>
                <Text currentData={currentData} />
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
            {currentData.aboutMe.map((paragraph) => <p
                className="mt-2"
            >
                {paragraph}
            </p>
            )}
        </div>
    )
}