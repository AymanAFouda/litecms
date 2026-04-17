import { useEffect } from "react";
import { Link } from "react-router-dom";
import { humanize, markdownify } from "../utils/textConverter";
import { FaFolderOpen } from "react-icons/fa";

const categories = [
    {
        id: "1",
        name: "Technology",
        contentsListLength: 128,
    },
    {
        id: "2",
        name: "Health & Wellness",
        contentsListLength: 74,
    },
    {
        id: "3",
        name: "Travel",
        contentsListLength: 56,
    },
    {
        id: "4",
        name: "Education",
        contentsListLength: 91,
    },
    {
        id: "5",
        name: "Business",
        contentsListLength: 63,
    },
    {
        id: "6",
        name: "Science",
        contentsListLength: 47,
    },
    {
        id: "7",
        name: "Lifestyle",
        contentsListLength: 82,
    },
    {
        id: "8",
        name: "Food & Recipes",
        contentsListLength: 69,
    },
    {
        id: "9",
        name: "Sports",
        contentsListLength: 58,
    },
] 

export const CategoriesPage = () => {

    useEffect(() => {
        document.title = "Categories"
    }, []);

    const sortedCategories = [...categories].sort(
        (a, b) => b.contentsListLength - a.contentsListLength
    );

    return(
        <section className="section pt-0">
            {markdownify(
                "Categories",
                "h1",
                "h2 bg-primary py-12 text-center lg:text-[55px] text-white"
            )}
            <div className="container pt-12 text-center">
                <ul className="row">
                    {sortedCategories.map((category, i) => (
                    <li
                        key={`category-${i}`}
                        className="mt-10 block lg:col-4 px-10"
                    >
                        <Link
                            to={`/categories/${category.name}`}
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
                            {humanize(category.name)} ({category.contentsListLength})
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}