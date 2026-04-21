import { useEffect, useState } from "react";
import Post from "../components/partials/Post";
import dateFormat from "../utils/dateFormat";
import { markdownify } from "../utils/textConverter";
import { Link } from "react-router-dom";
import { FaRegCalendar, FaUserAlt, FaEye } from "react-icons/fa";
import  ContentList  from "../components/layouts/ContentList"
import Sidebar from "../components/partials/Sidebar";
import { useContent } from "../hooks/useContent";

export const HomePage = () => {

    const { contentList, isLoading, loadError } = useContent("all");

    const [latestPublishedContent, setLatestPublishedContent] = useState(null);

    useEffect(() => {
        document.title = "LiteCMS"
    }, []);

    useEffect(() => {
      setLatestPublishedContent(contentList[0] || null);
    }, [contentList]);

    return (
    <section className="section pt-0 ">
      <div className="container px-3">
          <div className="row items-start">
              <div className="mb-3 lg:mb-0 lg:col-8">
              {/* Featured posts */}
                  {latestPublishedContent && (
                    <div className="section pt-6 pb-8">
                        {markdownify("Latest Content", "h2", "section-title mb-9")}
                        <div className="rounded border border-border p-4 dark:border-darkmode-border">
                            <div className="row">
                                <div className="w-full">
                                    <Post content={latestPublishedContent} />
                                </div>
                            </div>
                        </div>
                    </div>
                  )}
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