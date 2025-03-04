import { useQuery } from "@tanstack/react-query";

import { fetchDataApi } from "../../shared/api/fetchData";
import { Gallery } from "./";


export default function MainPage() {
    const fromFetchQuery = useQuery({
        queryKey: ["items", "list"],
        queryFn: fetchDataApi.getItemsMain
    });

    return (
        <div className="px-[25vw]">
            <div className="flex justify-center">
                <div className="mt-4 max-w-xl text-3xl text-neutral-50 text-center">
                    <h1 className="text-5xl font-bold">
                        Путешествия по России
                    </h1>
                    <h2 className="mt-2">
                        Настоящая страна не в выпусках новостей, а здесь.
                    </h2>
                </div>
            </div>
            {<Gallery fromFetchQuery={fromFetchQuery} className="mt-4" />}
        </div>
    )
}