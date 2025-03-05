import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { UseQueryResult } from "@tanstack/react-query";

import { Data } from "../../shared/types/dataFromServer";
import { Loader, ShadowEdges } from "../../shared/ui/index";

export default function ViewCarousel({ carouselIndex, fromFetchQuery }: { carouselIndex: number, fromFetchQuery: UseQueryResult<Data, Error> }) {
    const { data, error, isLoading, status, isError } = fromFetchQuery;
    const dataItems = status !== "success" ? Array(3).fill({}) : data;
    
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
                            state={{index}}
                            onPointerDownCapture={(e) => e.stopPropagation()}
                            className="text-center text-neutral-50 hover:cursor-pointer"
                        >
                            <h1 className="text-md md:text-4xl font-extrabold md:font-semibold text-neutral-300">{name}</h1>
                            <h3 className="text-sm md:text-xl mt-1 md:mt-2 max-w-xs md:max-w-md break-words text-neutral-200">{additionalInfo}</h3>
                        </NavLink>
                    </div>
                    {isLoading && <Loader />}
                    {isError && <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">{error.message}</div>}
                    <ShadowEdges />
                </motion.div>
            })}
        </>
    )
}