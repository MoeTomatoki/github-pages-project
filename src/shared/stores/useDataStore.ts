import { create } from "zustand";
import { Data } from "../types/dataFromServer";

type DataStore = {
    data: Data | null;
    loading: boolean;
    error: string | null;
    fetchData: () => Promise<void>;
}

export const useDataStore = create<DataStore>((set) => ({
    data: null,
    loading: false,
    error: null,
    fetchData: async () => {
        set({loading: true, error: null})
        try {
            const res = await fetch("http://localhost:3000/items");
            const fromJson = await res.json();
            set({data: fromJson, loading: false})
        } catch (error) {
            set({error: "Ошибка при загрузке данных", loading: false})
        }
    }
}))
