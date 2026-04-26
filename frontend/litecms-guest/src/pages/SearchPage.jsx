import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSearch } from "../hooks/useSearch"

import ContentList from "../components/layouts/ContentList";
import { FaSearch } from "react-icons/fa";
import { SearchFilters } from "../components/partials/SearchFilters";
import { LoadingSpinner } from "../components/shortcodes/LoadingSpinner";
import { LoadError } from "../components/shortcodes/LoadError";


export const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [filters, setFilters] = useState({
        contentType: searchParams.get("content-type") || "All content",
        category: searchParams.get("category") || "",
        tag: searchParams.get("tag") || ""
    });

    useEffect(() => {
        document.title = "Search - LiteCMS";
    }, []);

    useEffect(() => {
        setQuery(searchParams.get("q") || "");
        setFilters({
            contentType: searchParams.get("content-type") || "All content",
            category: searchParams.get("category") || "",
            tag: searchParams.get("tag") || ""
        });
    }, [searchParams]);

    const currentQuery = searchParams.get("q") || "";
    const currentFilters = {
        contentType: searchParams.get("content-type") || "All content",
        category: searchParams.get("category") || "",
        tag: searchParams.get("tag") || ""
    };

    const { results, total, fetchResults, isLoading, loadError } = useSearch(
        currentQuery,
        currentFilters
    );

    useEffect(() => {
        fetchResults(currentQuery, currentFilters);
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();

        const params = {};

        if (query.trim()) params.q = query.trim();
        if (filters.contentType && filters.contentType !== "All content") {
            params["content-type"] = filters.contentType;
        }
        if (filters.category.trim()) params.category = filters.category.trim();
        if (filters.tag.trim()) params.tag = filters.tag.trim();

        setSearchParams(params);
    };

    useEffect(() => {
        if (loadError) {
            toast.error("Search failed. Please try again.");
        }
    }, [loadError]);

    return(
        <div className="section pt-0">
            <div className="px-3 my-12">
                <div className="container mb-4 p-6 rounded-2xl border-2 border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                    <form onSubmit={handleSearch}>
                        <div className="row">
                            <div className="md:col-10 col-12">
                                <input 
                                    className="text-lg placeholder:text-base form-input h-12 w-full 
                                        px-5 py-3 rounded-lg border-none bg-theme-light text-dark 
                                        dark:bg-darkmode-theme-dark focus:outline-none focus:ring-2 focus:ring-primary"
                                    type="text"
                                    id="query"
                                    name="query"
                                    placeholder="Search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            <div className="col-2 mt-0 hidden md:inline">
                                <button
                                    type="submit"
                                    className="btn btn-search w-full flex justify-center items-center"
                                >
                                    <FaSearch className="inline md:hidden lg:inline" />
                                    <span className="ml-0 lg:ml-3">
                                        Search
                                    </span>
                                </button>
                            </div>
                        </div>

                        <SearchFilters filters={filters} setFilters={setFilters} />

                        <div className="row md:hidden">
                            <div className="col-12 mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-search w-full flex justify-center items-center"
                                >
                                    <FaSearch />
                                    <span className="ml-3">
                                        Search
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="container px-0">
                    <div className="flex justify-center flex-wrap">
                        <div className="px-4 py-2 mr-3 mb-3 md:mb-0 flex flex-col justify-center rounded-2xl border-2 border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                            <p className="inline font-secondary font-bold">
                                Showing<span className="text-emerald-600 mx-1.5">{total ?? 0}</span>results
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container px-3">
                <div className="row">
                    <div className="lg:col-9 mx-auto">
                        {isLoading && <LoadingSpinner />}

                        {loadError && <LoadError />}

                        {!isLoading && !loadError && results?.length > 0 && (
                            <ContentList
                                tabs={false}
                                contents={results}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}