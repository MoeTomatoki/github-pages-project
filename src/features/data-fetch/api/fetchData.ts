import { Data, ObjFromData } from "@shared/types/data-from-server";
import { Item } from "@shared/types/api-item";

const BASE_URL = "http://localhost:3000";

export const fetchDataApi = {
  getItemsMain: (
    { language }: { language: string },
    { signal }: { signal: AbortSignal },
  ) => {
    return fetch(`${BASE_URL}/items?language=${language}`, {
      signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ошибка загрузки данных. Код: ${res.status}`);
        }
        return res.json() as Promise<Data>;
      })
      .catch((err) => {
        throw err;
      });
  },
  getItemsAbout: (
    { language, page }: { language: string; page: number },
    { signal }: { signal: AbortSignal },
  ) => {
    return fetch(
      `${BASE_URL}/items?language=${language}&_page=${page + 1}&_per_page=1`,
      {
        signal,
      },
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ошибка загрузки данных. Код: ${res.status}`);
        }
        if (res.url.includes("NaN")) {
          throw new Error("Некорректная ссылка");
        }
        return res.json() as Promise<Item<ObjFromData>>;
      })
      .catch((err) => {
        throw err;
      });
  },
};
