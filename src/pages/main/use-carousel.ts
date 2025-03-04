import { useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent } from "framer-motion";

const DRAG_RANGE = 50;
const DELAY_INTERVAL = 3000;

const useCarousel = ({carouselLength} : { carouselLength: number}) => {
    const [carouselIndex, setCarouselIndex] = useState<number>(0);
    const [dragging, setIsDragging] = useState<boolean>(false);

    const firstRender = useRef<boolean | null>(true);
    const intervalRef = useRef<number | null>(null);
    const clearIntervalRef = useRef<number | null>(null);

    const dragX = useMotionValue(0);
    const dragXProgress = useMotionValue(0);

    useMotionValueEvent(dragX, "change", (latest) => {
        if (typeof latest === "number" && dragging) {
            dragXProgress.set(latest);
        } else {
            dragXProgress.set(0);
        }
    })

    setTimeout(() => firstRender.current = null, DELAY_INTERVAL);

    const intervalHandler = (prev: number) => {
        if (prev === carouselLength - 1) return 0;
        return prev + 1;
    }

    if (intervalRef.current === null) {
        intervalRef.current = setInterval(() => {
            const x = dragXProgress.get();
            if (x === 0) {
                setCarouselIndex(prev => intervalHandler(prev));
            }
        }, DELAY_INTERVAL);
    }

    if (clearIntervalRef.current === null) {
        clearIntervalRef.current = setTimeout(() => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }, DELAY_INTERVAL);
    }

    const onDragStart = () => {
        setIsDragging(true);
    }

    const onDragEnd = () => {
        setIsDragging(false);

        const x = dragX.get();

        if (x <= -DRAG_RANGE && carouselIndex < carouselLength - 1) {
            setCarouselIndex(prev => prev + 1);
        }
        if (x > DRAG_RANGE && carouselIndex > 0) {
            setCarouselIndex(prev => prev - 1);
        }
    }

    return {
        carouselIndex,
        setCarouselIndex,
        dragX,
        onDragStart,
        onDragEnd,
    }
}

export default useCarousel;