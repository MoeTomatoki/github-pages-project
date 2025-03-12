import {
  MapIcon,
  CalendarIcon,
  WeatherIcon,
  ScheduleIcon,
  TravelIcon,
} from "../../../shared/icons";

const LIST_ELEMENTS = {
  Карты: <MapIcon className="w-5 h-5" />,
  Погода: <WeatherIcon className="w-6 h-6" />,
  Расписание: <ScheduleIcon className="w-5 h-5" />,
  Календарь: <CalendarIcon className="w-5 h-5" />,
  Путешествия: <TravelIcon className="w-5 h-5" />,
};

export function useElements() {
  return LIST_ELEMENTS;
}
