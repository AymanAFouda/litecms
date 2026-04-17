import { useEffect } from "react";
import { markdownify } from "../utils/textConverter";
import ContentList from "../components/layouts/ContentList";
import Sidebar from "../components/partials/Sidebar";
import { useContentList } from "../hooks/useContentList";
import { LoadingSpinner } from "../components/shortcodes/LoadingSpinner";

export const ArticlesPage = () => {
    const { contents, isLoading, loadError} = useContentList('articles')

    useEffect(() => {
        document.title = "Articles - LiteCMS"
    }, []);

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
                                contents={contents}
                            />
                        </div>
                        <Sidebar />
                    </div>
                )}
            </div>
        </div>
    )
}

/*
<button 
    className="d-block btn btn-primary w-[250px] mx-auto block mb-12">
    Load More
</button>
*/