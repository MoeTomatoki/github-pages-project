import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "Путешествия по России": "Traveling in Russia",
            "Настоящая страна не в выпусках новостей, а здесь.": "The real country is not in the news releases, but here.",
            
        },
    },
    ru: {
        translation: {
            "Путешествия по России": "Путешествия по России",
            "Настоящая страна не в выпусках новостей, а здесь.": "Настоящая страна не в выпусках новостей, а здесь.",

        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru', 
    interpolation: {
        escapeValue: false,
    },
});