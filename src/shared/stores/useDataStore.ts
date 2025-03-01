import { create } from "zustand";
import { Data } from "../types/dataFromServer";

type DataStore = {
    items: Data | null;
    loading: boolean;
    error: string | null;
    fetchData: () => Promise<void>;
}

export const useDataStore = create<DataStore>((set) => ({
    items: null,
    loading: false,
    error: null,
    fetchData: async () => {
        set({loading: true, error: null})
        try {
            const res = await fetch("http://localhost:3000/items");
            const fromJson = await res.json();
            set({items: fromJson, loading: false})
        } catch (e) {
            set({error: `Ошибка при загрузке данных: ${e.message}`, loading: false})
        }
    }
}))
