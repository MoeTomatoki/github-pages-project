export default function Footer() {
    return (
        <footer className="flex mb-4 items-center px-10 text-neutral-50 dark:text-neutral-800">
            <div className="flex gap-4 opacity-80 hover:cursor-not-allowed">
                <span>Карты</span>
                <span>Погода</span>
                <span>Расписание</span>
                <span>Календарь</span>
                <span>Путешествия</span>
            </div>
            <div className="flex gap-4 ml-auto text-md">
                <span className="underline hover:cursor-pointer">© 2025</span>
            </div>
        </footer>
    );
}