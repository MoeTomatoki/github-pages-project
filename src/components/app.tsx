import clsx from "clsx";
import { useEffect, useRef, useState } from "react"

const imgPath = [
    "/public/sprint-3-images/cover-trains.jpg",
    "public/sprint-3-images/place-kosa.jpg",
    "public/sprint-3-images/place-kolsky.jpg",
    "public/sprint-3-images/place-altai.jpg",
    "public/sprint-3-images/place-karelia.jpg",
]

export default function App() {

    return (
        <main className="p-14 bg-primary-bg">
            <MainGallery />
        </main>
    )
}

export function MainGallery() {
    const [firstRender, setFirstRender] = useState<boolean>(true);
    const [imgSelector, setImgSelector] = useState<number>(0);
    const [bgImage, setBgImage] = useState<string>(imgPath[imgSelector]);

    const [transitioning, setTransitioning] = useState<boolean>(false);
    const intervalRef = useRef<number | null>(null);
    const clearIntervalRef = useRef<number | null>(null);

    setTimeout(() => setFirstRender(false), 3000);
    
    const intervalHandler = (imgPath: string[], prev: number) => {
        if (prev === imgPath.length - 1) return 0;
        return prev + 1;
    }

    if (intervalRef.current === null) {
        intervalRef.current = setInterval(() => {
            setTransitioning(true);
            setImgSelector(prev => {
                const newSelector = intervalHandler(imgPath, prev);
                setBgImage(imgPath[newSelector]);
                return newSelector;
            });
        }, 3000);
    }

    if (clearIntervalRef.current === null) {
        clearIntervalRef.current = setTimeout(() => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }, 3000);
    }

    const onTransitionEnd = () => {
        setTransitioning(false);
    };


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setImgSelector(prev => {
    //             const newSelector = intervalHandler(imgPath, prev);
    //             setBgImage(imgPath[newSelector]);
    //             return newSelector
    //         });
    //     }, 3000);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <section className="relative">
            <div
                className={clsx(`absolute inset-0 bg-cover bg-center
                    transition-opacity duration-1500 ease-[cubic-bezier(0.4,0.4,0.8,0.8)]`, 
                    `${firstRender ? "opacity-65" : !transitioning ? "opacity-0" : "opacity-65"}`)}
                style={{ backgroundImage: `url(${bgImage})` }}
                onTransitionEnd={onTransitionEnd}
            />
            <div className="relative py-90 flex flex-col items-center justify-center text-center text-white text-5xl">
                <h1 className="font-bold max-w-[24rem]">
                    До Байкала «на собаках»
                </h1>
                <h4 className="font-thin text-base max-w-2xs break-words">
                    По мотивам учебной темы о Транссибе — путешествие от столицы до Байкала на электричках.
                </h4>
            </div>
        </section>
    );
}