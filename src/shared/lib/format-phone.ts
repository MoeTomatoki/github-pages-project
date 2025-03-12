import {
    PhoneNumberUtil,
    PhoneNumberFormat,
    RegionCode,
    
} from "google-libphonenumber";

export type PhoneFormat = {
    contact: string,
    countryCode: RegionCode,
}

export function formatPhoneNumber({contact: number, countryCode}: PhoneFormat) {
    const phoneUtil = PhoneNumberUtil.getInstance();
    try {
        const phoneNumber = phoneUtil.parseAndKeepRawInput(number, countryCode);
        return phoneUtil.format(phoneNumber, PhoneNumberFormat.INTERNATIONAL);
    } catch (error) {
        console.error("Ошибка при форматировании номера:", error);
        return `Ошибка при форматировании номера: ${error}`;
    }
}