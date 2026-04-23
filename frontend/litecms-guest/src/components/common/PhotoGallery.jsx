import 'preline';
import { useEffect } from "react";
import { UPLOADS_BASE_URL } from "../../services/apiConfig";

export const PhotoGallery = ({ mediaList, largeMedia }) => {
    if (!mediaList || !mediaList.length) return null;

    useEffect(() => {
        if (window.HSStaticMethods) {
            window.HSStaticMethods.autoInit();
        }
    }, [mediaList, largeMedia]);

    return (
    <div className="relative w-full max-w-[95vw] mx-auto overflow-hidden">
        <div
            key={largeMedia}
            className="hs-carousel relative w-full overflow-hidden transition-all duration-500"
            data-hs-carousel='{"loadingClasses": "opacity-0", "isInfinite": false}'
        >
            <div className="relative">
                <div
                    className={`w-full overflow-hidden ${
                    largeMedia
                        ? "h-[300px] sm:h-[450px] md:h-[600px]"
                        : "h-[240px] sm:h-[380px] md:h-[500px]"
                    } max-h-[80vh]`}
                >
                    <div className="hs-carousel-body flex justify-center items-center flex-nowrap transition-transform duration-700 w-full h-full">
                        {mediaList.map((image, index) => (
                            <div
                            key={index}
                            className="hs-carousel-slide flex items-center justify-center w-full h-full"
                            >
                            <img
                                src={`${UPLOADS_BASE_URL}${image.fileUrl}`}
                                onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/images/default-image.png";
                                }}
                                alt={image.fileName}
                                className="w-full h-full object-cover transition duration-700 m-0 rounded-none"
                            />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    className={`${largeMedia ? "left-4" : "left-2"} hs-carousel-prev
                    opacity-85 disabled:opacity-0 absolute top-1/2 inline-flex justify-center items-center size-10
                    bg-white dark:bg-neutral-800 text-gray-800 dark:text-white rounded-full
                    -translate-y-1/2 focus:outline-hidden shadow-[0_0_15px_rgba(0,0,0,0.4)]`}
                >
                    <span className="text-2xl" aria-hidden="true">
                        <svg
                            className="shrink-0 size-10"
                            xmlns="http://www.w3.org/2000/svg"
                            width={largeMedia ? "48" : "36"}
                            height={largeMedia ? "48" : "36"}
                            viewBox="1 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </span>
                    <span className="sr-only">Previous</span>
                </button>

                <button
                    type="button"
                    className={`${largeMedia ? "right-4" : "right-2"} hs-carousel-next
                    opacity-85 disabled:opacity-0 absolute top-1/2 inline-flex justify-center items-center size-10
                    bg-white dark:bg-neutral-800 text-gray-800 dark:text-white rounded-full
                    -translate-y-1/2 focus:outline-hidden shadow-[0_0_15px_rgba(0,0,0,0.4)]`}
                >
                    <span className="sr-only">Next</span>
                    <span className="text-2xl" aria-hidden="true">
                        <svg
                            className="shrink-0 size-10"
                            xmlns="http://www.w3.org/2000/svg"
                            width={largeMedia ? "48" : "36"}
                            height={largeMedia ? "48" : "36"}
                            viewBox="0 0 22 23"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </span>
                </button>
            </div>

            <div className="hs-carousel-pagination w-full overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <div className="flex flex-row items-center justify-center w-max mx-auto">
                    {mediaList.map((image, index) => (
                    <div
                        key={index}
                        className={`hs-carousel-pagination-item shrink-0 overflow-hidden cursor-pointer ${
                        largeMedia
                            ? "w-32 h-20 sm:w-40 sm:h-24 md:w-52 md:h-32"
                            : "w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24"
                        }`}
                    >
                        <img
                        draggable="false"
                        src={`${UPLOADS_BASE_URL}${image.fileUrl}`}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/default-image.png";
                        }}
                        alt={image.fileName}
                        className="w-full h-full object-cover transition duration-700 m-0 rounded-none select-none"
                        />
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
}