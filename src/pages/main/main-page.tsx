import clsx from "clsx";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Loader, ShadowEdges } from "../../shared/ui/index";

import { useDataStore } from "../../shared/stores/useDataStore";

export default function MainPage() {
    const { items, loading, error, fetchData } = useDataStore();
    if (!items && !loading && !error) {
        fetchData();
    }

    return (
        <div className="px-[25vw]">
            <div className="flex justify-center">
                <div className="mt-4 max-w-xl text-3xl text-neutral-50 text-center">
                    <h1 className="text-5xl font-bold">
                        Путешествия по России
                    </h1>
                    <h2 className="mt-2">
                        Настоящая страна не в выпусках новостей, а здесь.
                    </h2>
                </div>
            </div>
            {<MainGallery className="mt-4" />}
        </div>
    )
}

const DRAG_RANGE = 50;
const DELAY_INTERVAL = 3000;

export function MainGallery({ className }: { className: string }) {
    const [carouselIndex, setCarouselIndex] = useState<number>(0);
    const [dragging, setIsDragging] = useState<boolean>(false);

    const firstRender = useRef<boolean | null>(true);
    const intervalRef = useRef<number | null>(null);
    const clearIntervalRef = useRef<number | null>(null);

    const dragX = useMotionValue(0);
    const dragXProgress = useMotionValue(0);
    const { items: dataItems } = useDataStore.getState();

    const CAROUSEL_LENGTH = dataItems ? dataItems.length : 3;

    useMotionValueEvent(dragX, "change", (latest) => {
        if (typeof latest === "number" && dragging) {
            dragXProgress.set(latest);
        } else {
            dragXProgress.set(0);
        }
    })

    setTimeout(() => firstRender.current = null, DELAY_INTERVAL);

    const intervalHandler = (prev: number) => {
        if (prev === CAROUSEL_LENGTH - 1) return 0;
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

        if (x <= -DRAG_RANGE && carouselIndex < CAROUSEL_LENGTH - 1) {
            setCarouselIndex(prev => prev + 1);
        }
        if (x > DRAG_RANGE && carouselIndex > 0) {
            setCarouselIndex(prev => prev - 1);
        }
    }
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
                className={clsx(className, "flex items-center cursor-grab active:cursor-grabbing")}
            >
                <CarouselImage carouselIndex={carouselIndex} />
            </motion.div>
            <CarouselDots carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex} />
        </>
    );
}

export function CarouselImage({ carouselIndex }: { carouselIndex: number }) {
    const { items, loading, error } = useDataStore.getState();
    const dataItems = items === null ? Array(3).fill({}) : items;
    
    return (
        <>
            {dataItems?.map((data, index) => {
                const { id, name, imgPath, additionalInfo } = data
                return <motion.div
                    key={id}
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${imgPath})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    animate={{
                        scale: carouselIndex === index ? 0.95 : 0.85,
                    }}
                    transition={{
                        type: "spring",
                        mass: 3,
                        stiffness: 400,
                        damping: 50,
                    }}
                    className="aspect-video shrink-0 w-[50vw] rounded-xl bg-cyan-50 object-cover"
                >
                    <div className="absolute inset-0 z-10 flex justify-center items-center hover-events-none">
                        <NavLink
                            to={`/about-page/${id}`}
                            onPointerDownCapture={(e) => e.stopPropagation()}
                            className="text-center text-neutral-50 hover:cursor-pointer"
                        >
                            <h1 className="text-4xl bold ">{name}</h1>
                            <h3 className="mt-2 max-w-xs break-words text-neutral-200">{additionalInfo}</h3>
                        </NavLink>
                    </div>
                    {loading && <Loader />}
                    {error && <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">{error}</div>}
                    <ShadowEdges />
                </motion.div>
            })}
        </>
    )
}

type DotsProps = {
    carouselIndex: number;
    setCarouselIndex: Dispatch<SetStateAction<number>>;
}

const dotRoundFunc = function (index: number, CAROUSEL_LENGTH: number) {
    if (index === CAROUSEL_LENGTH / 2 || index === Math.round(CAROUSEL_LENGTH / 2) - 1) return "rounded-b-xl rounded-t-md"
    else if (index <= CAROUSEL_LENGTH / 2) return "rounded-bl-xl rounded-tr-xl"
    else return " rounded-br-xl rounded-tl-xl"
}

export function CarouselDots({ carouselIndex, setCarouselIndex }: DotsProps) {
    const { items } = useDataStore.getState();
    const dataItems = items === null ? Array(3).fill({}) : items;
    const CAROUSEL_LENGTH = dataItems ? dataItems.length : 3;
    return (
        <div className="flex w-full justify-center gap-2 mt-4">
            {dataItems?.map((data, index) => {
                return <button
                    key={data.id}
                    onClick={() => setCarouselIndex(index)}
                    className={clsx("h-5 w-5 bg-cyan-50 transition-colors hover:cursor-pointer",
                        `${index === carouselIndex ? "bg-white" : "bg-neutral-500"}`,
                        `${dotRoundFunc(index, CAROUSEL_LENGTH)}`
                    )}
                />
            })}
        </div>
    )
}

