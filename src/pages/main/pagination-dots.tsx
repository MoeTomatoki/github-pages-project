import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { UseQueryResult } from "@tanstack/react-query";

import { Data } from "../../shared/types/dataFromServer";

type DotsProps = {
  carouselIndex: number;
  setCarouselIndex: Dispatch<SetStateAction<number>>;
  fromFetchQuery: UseQueryResult<Data, Error>;
};

const dotRoundFunc = function (index: number, CAROUSEL_LENGTH: number) {
  if (
    index === CAROUSEL_LENGTH / 2 ||
    index === Math.round(CAROUSEL_LENGTH / 2) - 1
  )
    return "rounded-b-xl rounded-t-md";
  else if (index <= CAROUSEL_LENGTH / 2) return "rounded-bl-xl rounded-tr-xl";
  else return " rounded-br-xl rounded-tl-xl";
};

export default function PaginationDots({
  carouselIndex,
  setCarouselIndex,
  fromFetchQuery,
}: DotsProps) {
  const { data, status } = fromFetchQuery;

  const dataItems = status !== "success" ? Array(3).fill({}) : data;
  return (
    <div className="flex w-full justify-center gap-2 mt-4">
      {dataItems?.map((data, index) => {
        return (
          <button
            key={`${data.id}-${index}`}
            onClick={() => setCarouselIndex(index)}
            className={clsx(
              "h-5 w-5 transition-colors hover:cursor-pointer ",
              `${index === carouselIndex ? "bg-neutral-800 dark:bg-neutral-100" : "bg-neutral-400 dark:bg-neutral-500"}`,
              `${dotRoundFunc(index, dataItems.length)}`,
            )}
          />
        );
      })}
    </div>
  );
}
