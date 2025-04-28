import { Dispatch, SetStateAction } from "react";
import { FormState } from "@shared/types/form-state";

export const useHandles = (setFormState: Dispatch<SetStateAction<FormState>>) => {
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormState((prevState) => ({
            ...prevState,
            category: e.target.value,
            contact: "",
        }));
    };

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prevState) => ({
            ...prevState,
            contact: e.target.value,
        }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormState((prevState) => ({
            ...prevState,
            description: e.target.value,
        }));
    };

    return {handleCategoryChange, handleContactChange, handleDescriptionChange}
}