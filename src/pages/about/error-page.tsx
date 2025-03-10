import { useParams } from "react-router-dom";

export default function ErrorPage({ error }: { error: Error }) {
  const { id } = useParams();

  return (
    <div className="flex flex-col text-center">
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="flex flex-col text-center">
          {error.toString().includes("Некорректная ссылка") ? (
            <>
              <span className="text-5xl font-bold text-neutral-50 dark:text-neutral-800">
                Данные не найдены
              </span>
              <span className="mt-2 text-xl bold text-neutral-200 dark:text-neutral-600">
                Возможно такой страницы ещё не существует
              </span>
            </>
          ) : (
            <span className="text-2xl text-neutral-50 dark:text-neutral-800">
              Ошибка: {error.message}
            </span>
          )}
        </div>
      </div>
      <span className="mt-auto text-md font-thin text-neutral-200 dark:text-neutral-600">
        Текущая ссылка: {`http://russian-tours/about-page/${id}`}
      </span>
    </div>
  );
}
