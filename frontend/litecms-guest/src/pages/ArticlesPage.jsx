import { useEffect } from "react";
import toast from "react-hot-toast";
import { markdownify } from "../utils/textConverter";
import ContentList from "../components/layouts/ContentList";
import Sidebar from "../components/partials/Sidebar";
import { LoadingSpinner } from "../components/shortcodes/LoadingSpinner";
import { useContent } from "../hooks/useContent";

export const ArticlesPage = () => {
    const { contentList, isLoading, loadError} = useContent('articles')

    useEffect(() => {
        document.title = "Articles - LiteCMS"
    }, []);

    useEffect(() => {
        if (loadError) {
            toast.error("Failed to load articles. Please try again.");
        }
    }, [loadError]);

    return(
        <div className="section pt-0">
            <div className="bg-primary">
                {markdownify(
                    `Articles`,
                    "h1",
                    "h2 py-12 text-center lg:text-[55px] text-white mb-10"
                )}
            </div>
            <div className="container px-3">
                {isLoading && <LoadingSpinner />}

                {loadError && <p className="w-fit mx-auto font-secondary">Something went wrong.</p>}

                {!isLoading && !loadError && (
                    <div className="row">
                        <div className="lg:col-8">
                            <ContentList
                                tabs={false}
                                contents={contentList}
                            />
                        </div>
                        <Sidebar />
                    </div>
                )}
            </div>
        </div>
    )
}