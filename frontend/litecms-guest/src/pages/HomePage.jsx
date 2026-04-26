import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Post from "../components/partials/Post";
import dateFormat from "../utils/dateFormat";
import { markdownify } from "../utils/textConverter";
import { Link } from "react-router-dom";
import { FaRegCalendar, FaUserAlt, FaEye } from "react-icons/fa";
import  ContentList  from "../components/layouts/ContentList"
import Sidebar from "../components/partials/Sidebar";
import { useContent } from "../hooks/useContent";
import { LoadingSpinner } from "../components/shortcodes/LoadingSpinner";
import { LoadError } from "../components/shortcodes/LoadError";

export const HomePage = () => {
    const { contentList, isLoading, loadError } = useContent("all");
    const [latestPublishedContent, setLatestPublishedContent] = useState(null);

    useEffect(() => {
        document.title = "LiteCMS"
    }, []);

    useEffect(() => {
        setLatestPublishedContent(contentList[0] || null);
    }, [contentList]);

    useEffect(() => {
        if (loadError) {
            toast.error("Failed to load content. Please try again.");
        }
    }, [loadError]);

    if(isLoading) return <LoadingSpinner />

    if(loadError) return <LoadError />

    return (
    <section className="section pt-0 ">
        <div className="container px-3">
            <div className="row items-start">
                <div className="mb-3 lg:mb-0 lg:col-8">
                    <div className="section pt-6 pb-8">
                        {markdownify("Latest Content", "h2", "section-title mb-9")}
                        {latestPublishedContent && (
                        <div className="p-0 md:rounded md:border md:border-border md:p-4 md:dark:border-darkmode-border">
                            <div className="row">
                                <div className="w-full">
                                    <Post content={latestPublishedContent} />
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    
                    <ContentList
                        tabs={false}
                        contents={contentList.slice(1)} 
                    />
                </div>
                <Sidebar className={"lg:mt-[103px] "} variant={"home"}/>
            </div>
        </div>
    </section>
    )
}