import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFolderOpen } from "react-icons/fa";

import { LoadingSpinner } from "../components/shortcodes/LoadingSpinner";
import { markdownify } from "../utils/textConverter";
import { useCategoryCounts } from "../hooks/useCategories";

export const CategoriesPage = () => {
    const { categoryList, categoriesAreLoading, categoriesLoadError } = useCategoryCounts();

    useEffect(() => {
        document.title = "Categories - LiteCMS"
    }, []);

    return(
        <section className="section pt-0">
            {markdownify(
                "Categories",
                "h1",
                "h2 bg-primary py-12 text-center lg:text-[55px] text-white"
            )}
            <div className="container pt-12 text-center">
                {categoriesAreLoading && <LoadingSpinner />}
                
                {categoriesLoadError && <p className="w-fit mx-auto font-secondary">Something went wrong.</p>}

                {!categoriesAreLoading && !categoriesLoadError && (
                    <ul className="row">
                        {categoryList.map((category, i) => (
                        <li
                            key={`category-${i}`}
                            className="mt-10 block lg:col-4 px-10"
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