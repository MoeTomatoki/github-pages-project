import { Data, ObjFromData } from "../types/dataFromServer";
import { Item } from "../types/apiItem";

const BASE_URL = "http://localhost:3000";

export const fetchDataApi = {
    getItemsMain: (
        { signal }: { signal: AbortSignal }
    ) => {
        return fetch(`${BASE_URL}/items`, {
            signal
        }).then(res => res.json() as Promise<Data>);
    },
    getItemsAbout: (
        { page }: { page: number },
        { signal }: { signal: AbortSignal }
    ) => {
        return fetch(`${BASE_URL}/items?_page=${page + 1}&_per_page=1`, {
            signal
        }).then(res => {
            if (!res.ok) {
                throw new Error(`Ошибка загрузки данных. Код: ${res.status}`);
            }
            if (res.url.includes('NaN')) {
                throw new Error("Некорректная ссылка");
            }
            return res.json() as Promise<Item<ObjFromData>>
        }).catch(err => {
            throw err
        });
    }
}