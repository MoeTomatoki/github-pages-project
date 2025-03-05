import { MapIcon, CalendarIcon, WeatherIcon, ScheduleIcon, TravelIcon } from "../../shared/icons";

export default function Footer() {
    return (
        <footer className="flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-4 text-neutral-50 dark:text-neutral-800 bg-neutral-900 dark:bg-neutral-50">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start opacity-80 hover:cursor-not-allowed mb-4 md:mb-0">
                <span className="flex items-center gap-1 text-sm md:text-base hover:opacity-100 transition-opacity">
                    <MapIcon className="w-5 h-5" /> Карты
                </span>
                <span className="flex items-center gap-1 text-sm md:text-base hover:opacity-100 transition-opacity">
                    <WeatherIcon className="w-6 h-6" /> Погода
                </span>
                <span className="flex items-center gap-1 text-sm md:text-base hover:opacity-100 transition-opacity">
                    <ScheduleIcon className="w-5 h-5" /> Расписание
                </span>
                <span className="flex items-center gap-1 text-sm md:text-base hover:opacity-100 transition-opacity">
                    <CalendarIcon className="w-5 h-5" /> Календарь
                </span>
                <span className="flex items-center gap-1 text-sm md:text-base hover:opacity-100 transition-opacity">
                    <TravelIcon className="w-5 h-5" /> Путешествия
                </span>
            </div>

            <div className="flex gap-4 text-sm md:text-base">
                <span className="underline hover:cursor-pointer">© 2025</span>
            </div>
        </footer>
    );
}