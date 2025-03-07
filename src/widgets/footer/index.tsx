import { useTranslation } from "react-i18next";
import { ReactNode } from "react";
import { MapIcon, CalendarIcon, WeatherIcon, ScheduleIcon, TravelIcon } from "../../shared/icons";

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-4 text-neutral-50 dark:text-neutral-800 bg-neutral-900 dark:bg-neutral-50">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start opacity-80 hover:cursor-not-allowed mb-4 md:mb-0">
                <SpanWrapper>
                    <MapIcon className="w-5 h-5" /> {t("Карты")}
                </SpanWrapper>
                <SpanWrapper >
                    <WeatherIcon className="w-6 h-6" /> {t("Погода")}
                </SpanWrapper>
                <SpanWrapper>
                    <ScheduleIcon className="w-5 h-5" /> {t("Расписание")}
                </SpanWrapper>
                <SpanWrapper>
                    <CalendarIcon className="w-5 h-5" /> {t("Календарь")}
                </SpanWrapper>
                <SpanWrapper>
                    <TravelIcon className="w-5 h-5" /> {t("Путешествия")}
                </SpanWrapper>
            </div>

            <div className="flex gap-4 text-sm md:text-base">
                <span className="underline hover:cursor-pointer">© 2025</span>
            </div>
        </footer>
    );
}

function SpanWrapper({ children }: { children: ReactNode }) {
    return <span className="flex items-center justify-center md:justify-start gap-1 min-w-32 text-sm md:text-base hover:opacity-100 transition-opacity">
        {children}
    </span>
}