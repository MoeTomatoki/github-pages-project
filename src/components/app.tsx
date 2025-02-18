import clsx from "clsx";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";

const imgsPath = [
    "/public/sprint-3-images/cover-trains.jpg",
    "public/sprint-3-images/place-kosa.jpg",
    "public/sprint-3-images/place-kolsky.jpg",
    "public/sprint-3-images/place-altai.jpg",
    "public/sprint-3-images/place-karelia.jpg",
    "public/sprint-3-images/place-winter-baikal.jpg",
    "public/sprint-3-images/photo-grid-arisa.jpg",
];

export default function App() {

    return (
        <main className="relative min-h-screen py-8 overflow-hidden bg-primary-bg">
            <div className="px-[25vw]"> <MainGallery />
            </div>
        </main>
    )
}

const DRAG_RANGE = 50;
const DELAY_INTERVAL = 3000;

export function MainGallery() {
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
        if (prev === imgsPath.length - 1) return 0;
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

        if (x <= -DRAG_RANGE && carouselIndex < imgsPath.length - 1) {
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
                className="flex items-center cursor-grab active:cursor-grabbing"
            >
                <CarouselImage carouselIndex={carouselIndex} />
            </motion.div>

            <CarouselDots carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex} />
        </>
    );
}

export function CarouselImage({ carouselIndex }: { carouselIndex: number }) {
    return (
        <>
            {imgsPath.map((path, index) => <motion.div
                key={index}
                style={{
                    backgroundImage: `url(${path})`,
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
                <CarouselEdges />
            </motion.div>
            )}
        </>
    )
}

type DotsProps = {
    carouselIndex: number;
    setCarouselIndex: Dispatch<SetStateAction<number>>;
}

const dotRoundFunc = function (index: number) {
    if (index === imgsPath.length / 2 || index === Math.round(imgsPath.length / 2) - 1) return "rounded-b-xl rounded-t-md"
    else if (index <= imgsPath.length / 2) return "rounded-bl-xl rounded-tr-xl"
    else return " rounded-br-xl rounded-tl-xl"
}

export function CarouselDots({ carouselIndex, setCarouselIndex }: DotsProps) {
    return (
        <div className="flex w-full justify-center gap-2 mt-4">
            {imgsPath.map((_, index) => {
                return <button
                    key={index}
                    onClick={() => setCarouselIndex(index)}
                    className={clsx("h-5 w-5 bg-cyan-50 transition-colors hover:cursor-pointer",
                        `${index === carouselIndex ? "bg-white" : "bg-neutral-500"}`,
                        `${dotRoundFunc(index)}`
                    )}
                />
            })}
        </div>
    )
}

export function CarouselEdges() {
    return <>
        <div className="pointer-events-none rounded-xl absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
        <div className="pointer-events-none rounded-xl absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
    </>
}