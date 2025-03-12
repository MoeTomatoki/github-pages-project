import { FormState } from "../../../shared/types/form-state";
import { formatPhoneNumber } from "../../../shared/lib/format-phone";

type Props = {
    formState: FormState;
    onSubmit: (data: string) => void;
    onClose: () => void;
};

const countryCode = "RU";

export const useFormSubmit = ({ formState, onSubmit, onClose }: Props) => {
    const { category, contact, description } = formState;
    
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formattedData =
            category === "PH" ? formatPhoneNumber({ contact, countryCode }) : contact;
        const dataLog = `${formattedData || contact}: ${description}`;
        onSubmit(dataLog);
        onClose();
    };
    return { handleSubmit }
}