import { useEffect } from "react";
import { markdownify } from "../utils/textConverter";
import ContentList from "../components/layouts/ContentList";
import Sidebar from "../components/partials/Sidebar";
import { useContent } from "../hooks/useContent";
import { LoadingSpinner } from "../components/shortcodes/LoadingSpinner";

export const VideosPage = () => {
    const { contents, isLoading, loadError} = useContent('videos')

    useEffect(() => {
        document.title = "Videos - LiteCMS"
    }, []);

    return(
        <div className="section pt-0">
            <div className="bg-primary">
                {markdownify(
                    `Videos`,
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