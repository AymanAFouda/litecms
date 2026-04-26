import { useEffect } from "react";
import toast from "react-hot-toast";
import { markdownify } from "../utils/textConverter";
import ContentList from "../components/layouts/ContentList";
import Sidebar from "../components/partials/Sidebar";
import { useContent } from "../hooks/useContent";
import { LoadingSpinner } from "../components/shortcodes/LoadingSpinner";
import { LoadError } from "../components/shortcodes/LoadError";

export const VideosPage = () => {
    const { contentList, isLoading, loadError} = useContent('videos')

    useEffect(() => {
        document.title = "Videos - LiteCMS"
    }, []);

    useEffect(() => {
        if (loadError) {
            toast.error("Failed to load videos. Please try again.");
        }
    }, [loadError]);

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

                {loadError && <LoadError />}

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