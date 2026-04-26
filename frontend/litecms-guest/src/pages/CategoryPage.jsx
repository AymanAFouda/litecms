import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ContentList from "../components/layouts/ContentList";
import { markdownify } from "../utils/textConverter";
import Sidebar from "../components/partials/Sidebar";
import { useContentByCategory } from "../hooks/useContent";

export const CategoryPage = () => {
  const { name } = useParams();
  const [selectedTab, setSelectedTab] = useState("All Content");
  const { contentList, isLoading, loadError } = useContentByCategory(selectedTab, name);

  useEffect(() => {
      document.title = `${name} - LiteCMS`
  }, [name]);

  useEffect(() => {
    if (loadError) {
      toast.error("Failed to load category content. Please try again.");
    }
  }, [loadError]);

  return(
    <div className="section pt-0">
        <div className="bg-primary">
          {markdownify(
            `Category: ${name.replaceAll("-", " ")}`,
            "h1",
            "h2 py-12 text-center lg:text-[55px] text-white mb-10"
          )}
        </div>
        <div className="container px-3">
          <div className="row">
            <div className="lg:col-8">
              <ContentList
                tabs={true}
                selectedTab={selectedTab} 
                setSelectedTab={setSelectedTab} 
                contents={contentList}
              />
            </div>
            <Sidebar />
          </div>
        </div>
    </div>
  )
}