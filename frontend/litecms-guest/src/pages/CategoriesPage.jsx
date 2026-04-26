import { useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaFolderOpen } from "react-icons/fa";

import { LoadingSpinner } from "../components/shortcodes/LoadingSpinner";
import { markdownify } from "../utils/textConverter";
import { useCategoryCounts } from "../hooks/useCategories";
import { LoadError } from "../components/shortcodes/LoadError";

export const CategoriesPage = () => {
    const { categoryList, categoriesAreLoading: isLoading, categoriesLoadError: loadError } = useCategoryCounts();

    useEffect(() => {
        document.title = "Categories - LiteCMS"
    }, []);

    useEffect(() => {
        if (loadError) {
            toast.error("Failed to load categories. Please try again.");
        }
    }, [loadError]);

    return(
        <section className="section pt-0">
            {markdownify(
                "Categories",
                "h1",
                "h2 bg-primary py-12 text-center lg:text-[55px] text-white"
            )}
            <div className="container pt-12 text-center">
                {isLoading && <LoadingSpinner />}
                
                {loadError && <LoadError />}

                {!isLoading && !loadError && (
                    <ul className="row">
                        {categoryList.map((category, i) => (
                        <li
                            key={`category-${i}`}
                            className="mt-10 block lg:col-4 px-2 md:px-8"
                        >
                            <Link
                                to={`/categories/${encodeURIComponent(category.name)}`}
                                className="!py-5 font-secondary flex w-full 
                                    items-center justify-center rounded-lg 
                                    bg-theme-light px-4 py-4 font-bold text-dark 
                                    transition hover:bg-primary hover:text-white 
                                    dark:bg-darkmode-theme-dark dark:text-darkmode-light 
                                    dark:hover:bg-primary dark:hover:text-white
                                "
                            >
                                <span className="inline-block">
                                    <FaFolderOpen className="mr-2" size={18}/>
                                </span>
                                {category.name} ({category.count})
                            </Link>
                        </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}