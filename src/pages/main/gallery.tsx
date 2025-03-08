import clsx from "clsx";
import { motion } from "framer-motion";
import { UseQueryResult } from "@tanstack/react-query";

import { PaginationDots, useCarousel, ViewCarousel } from "./";
import { Data } from "../../shared/types/dataFromServer";
import { Loader } from "../../shared/ui";

export default function Gallery({ fromFetchQuery, className }: { fromFetchQuery: UseQueryResult<Data, Error>, className: string }) {
    const { data: dataItems, isLoading, status } = fromFetchQuery
    const carouselLength = dataItems ? dataItems.length : 3;

    const {
        carouselIndex,
        setCarouselIndex,
        dragX,
        onDragStart,
        onDragEnd,
    } = useCarousel({ carouselLength: carouselLength });

    return (
        <>
            <motion.div
                drag="x"
                dragConstraints={{
                    left: 0,
                    right: 0,
                }}
                animate={{
                    translateX: `-${carouselIndex * 100}%`,
                }}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                style={{
                    x: dragX,
                }}
                className={clsx(className, "flex mt-10 md:mt-2 items-center cursor-grab active:cursor-grabbing")}
            >
                <ViewCarousel carouselIndex={carouselIndex} fromFetchQuery={fromFetchQuery} />
            </motion.div>
            <PaginationDots carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex} fromFetchQuery={fromFetchQuery} />
            <div className="flex md:hidden flex-col items-center mt-4">
                {isLoading || status !== "success"
                    ? <Loader />
                    : <div className="text-lg mt-8 text-justify text-neutral-400 dark:text-neutral-600">
                        {dataItems[carouselIndex].additionalInfo}
                    </div>
                }
            </div>
        </>
    );
}

