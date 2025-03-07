import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "Путешествия по России": "Traveling in Russia",
            "Настоящая страна не в выпусках новостей, а здесь.": "The real country is not in the news releases, but here.",

            "Номер страницы:": "Number of page:",
            "Хочешь узнать большего? Ты всегда можешь связаться с нами!": "Do you want to know more? You can always contact us!",
            "Связаться с нами": "Contant us",

            "Карты": "Maps",
            "Погода": "Weather",
            "Расписание": "Schedule",
            "Календарь": "Calendar",
            "Путешествия": "Travel"
        },
    },
    ru: {
        translation: {
            "Путешествия по России": "Путешествия по России",
            "Настоящая страна не в выпусках новостей, а здесь.": "Настоящая страна не в выпусках новостей, а здесь.",

            "Номер страницы:": "Номер страницы:",
            "Хочешь узнать большего? Ты всегда можешь связаться с нами!": "Хочешь узнать большего? Ты всегда можешь связаться с нами!",
            "Связаться с нами": "Связаться с нами",

            "Карты": "Карты",
            "Погода": "Погода",
            "Расписание": "Расписание",
            "Календарь": "Календарь",
            "Путешествия": "Путешествия",
        },
    },
};

const userLanguage = localStorage.getItem("language");
i18n.use(initReactI18next).init({
    resources,
    lng: userLanguage,
    fallbackLng: 'ru',
    interpolation: {
        escapeValue: false,
    },
});