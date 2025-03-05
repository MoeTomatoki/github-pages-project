import clsx from "clsx";
import { motion } from "framer-motion";
import { useQueryClient, UseQueryResult } from "@tanstack/react-query";

import { PaginationDots, useCarousel, ViewCarousel } from "./";
import { Data } from "../../shared/types/dataFromServer";

export default function Gallery({ fromFetchQuery, className }: { fromFetchQuery: UseQueryResult<Data, Error>, className: string }) { 
    const queryClient = useQueryClient();
    const dataItems = queryClient.getQueryData(["items", "list"]) as Data;
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
                className={clsx(className, "flex mt-10 items-center cursor-grab active:cursor-grabbing")}
            >
                <ViewCarousel carouselIndex={carouselIndex} fromFetchQuery={fromFetchQuery}/>
            </motion.div>
            <PaginationDots carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex} fromFetchQuery={fromFetchQuery}/>
        </>
    );
}

