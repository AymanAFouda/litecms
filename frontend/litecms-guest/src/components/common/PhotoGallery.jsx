import 'preline';
import { useEffect } from "react";

export const PhotoGallery = ({ mediaList, largeMedia }) => {
    if (!mediaList || !mediaList.length) return null;

    useEffect(() => {
        if (window.HSStaticMethods) {
            window.HSStaticMethods.autoInit();
        }
    }, [mediaList, largeMedia]);

    return (
    <div className="relative w-full overflow-hidden sm:max-w-[80vw] mx-auto">
        <div key={largeMedia} className="hs-carousel relative w-full overflow-hidden transition-all duration-500" data-hs-carousel='{"loadingClasses": "opacity-0", "isInfinite": false}'>
            <div className='relative relative'>
                <div className="hs-carousel-body flex justify-center items-center flex-nowrap transition-transform duration-700 w-full">
                    {mediaList.map((image) => (
                        <div key={`${image.url}-${largeMedia}`} className="hs-carousel-slide flex items-center justify-center w-full">
                            <img
                                src={image.url}
                                alt={image.alt}
                                className="transition duration-700 m-0 rounded-none w-full sm:max-h-[83vh] object-contain sm:max-w-[90vw]"
                            />
                        </div>
                    ))}
                </div>
                <button type="button" 
                    className={`${largeMedia? "left-4" : "left-2"} hs-carousel-prev 
                        opacity-85 disabled:opacity-0 absolute 
                        top-1/2 inline-flex justify-center items-center size-10
                        bg-white dark:bg-neutral-800 text-gray-800 dark:text-white 
                        rounded-full shadow-2xs hover:bg-gray-50 dark:hover:bg-neutral-700 
                        -translate-y-1/2 focus:outline-hidden
                        shadow-[0_0_15px_rgba(0,0,0,0.4)]`}
                >
                    <span className="text-2xl" aria-hidden="true">
                        <svg 
                            className="shrink-0 size-10"
                            xmlns="http://www.w3.org/2000/svg"
                            width={largeMedia? "48" : "36" } 
                            height={largeMedia? "48" : "36" }
                            viewBox="1 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="m15 18-6-6 6-6"/>
                        </svg>
                    </span>
                    <span className="sr-only">Previous</span>
                </button>
                <button type="button" 
                    className={`${largeMedia? "right-4" : "right-2"} hs-carousel-next 
                        opacity-85 disabled:opacity-0 absolute top-1/2 
                        inline-flex justify-center items-center size-10 bg-white 
                        dark:bg-neutral-800 text-gray-800 dark:text-white 
                        rounded-full shadow-2xs hover:bg-gray-50 dark:hover:bg-neutral-700 
                        -translate-y-1/2 focus:outline-hidden
                        shadow-[0_0_15px_rgba(0,0,0,0.4)]`}
                >
                    <span className="sr-only">Next</span>
                    <span className="text-2xl" aria-hidden="true">
                        <svg 
                            className="shrink-0 size-10" 
                            xmlns="http://www.w3.org/2000/svg" 
                            width={largeMedia? "48" : "36" } 
                            height={largeMedia? "48" : "36" }
                            viewBox="0 0 22 23" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="m9 18 6-6-6-6"/>
                        </svg>
                    </span>
                </button> 
            </div>
            <div className="hs-carousel-pagination w-full overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <div className="flex flex-row items-center justify-center w-max mx-auto">
                    {mediaList.map((image, index) => (
                        <div key={index} className={`hs-carousel-pagination-item shrink-0 overflow-hidden cursor-pointer ${largeMedia? 'w-60' : 'w-44'}`}>
                            <div className="flex justify-center">
                                <img 
                                    draggable="false"
                                    src={image.url} 
                                    alt={image.alt}
                                    className="h-full object-cover self-center transition duration-700 m-0 rounded-none select-none"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>        
    </div>
    );
}