import config from "../../config/config.json";
import social from "../../config/social.json";
import Social from "../common/Social";
import { Link } from "react-router-dom";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import CustomForm from "../common/NewsLetterForm"
import { TagCloud } from "../common/TagCloud"
import { ContentSuggestions } from "../common/ContentSuggestions"

const { newsletter } = config.widgets;

const popularTags = [ "TECH", "NEWS", "SPORT", "SCIENCE", "HEALTH", "TRAVEL", "FOOD", "EDUCATION", "MUSIC", "MOVIES",]

const recentContent = [
  {
    title: "The Future of Artificial Intelligence in Everyday Life",
    createdAt: "2026-02-14",
    featuredImage: "/images/post-1.png",
    description: "An overview of how AI is transforming industries and daily routines across the globe. An overview of how AI is transforming industries and daily routines across the globe.",
    contentType: "Article",
    category: "Technology",
    viewCount: 1230
  },
  {
    title: "Exploring the Hidden Beaches of the Mediterranean",
    createdAt: "2026-01-28",
    featuredImage: "/images/post-2.png",
    description: "A visual journey through some of the most beautiful and lesser-known beaches. A visual journey through some of the most beautiful and lesser-known beaches. A visual journey through some of the most beautiful and lesser-known beaches. A visual journey through some of the most beautiful and lesser-known beaches.",
    contentType: "Photo Gallery",
    category: "Travel",
    viewCount: 121
  },
  {
    title: "Top 10 Healthy Habits for a Better Lifestyle",
    createdAt: "2026-02-05",
    featuredImage: "/images/post-3.png",
    description: "Simple daily practices that can significantly improve your physical and mental health.",
    contentType: "Article",
    category: "Health & Wellness",
    viewCount: 123
  },
]

//variant: default or content-detail
const Sidebar = ({ className, variant = "default", contentTags, content=recentContent, largeMedia }) => {

  const isContentDetail = (variant === "content-detail");

  const tags = isContentDetail ? contentTags : popularTags;
  const tagCloudTitle = isContentDetail ? "Tags" : "Popular tags";
  const contentTitle = isContentDetail ? "Related content" : "Latest content";

  return (
    <aside className={`${className} px-3 lg:col-4 ${largeMedia? 'lg:pl-12 order-3 mb-8 pt-1': 'lg:px-6 order-2'}`}>
      {(variant=== "default") && (
        <>
          <ContentSuggestions title={contentTitle} content={content} />
          <TagCloud title={tagCloudTitle} tags={tags}/>
        </>
      )}

      {(variant=== "home") && (
        <>
          <TagCloud title={tagCloudTitle} tags={tags}/>
        </>
      )}

      {variant=== "content-detail" && (
        <>
          <TagCloud title={tagCloudTitle} tags={tags}/>
          <ContentSuggestions title={contentTitle} content={content} />
        </>
      )}

      {/* share */}
      {variant=== "content-detail" && (
        <div className="mt-6 rounded border border-border text-center p-6 dark:border-darkmode-border mb-6">
          <h4 className="section-title mb-5">Share on social media</h4>
          <Social
            className="socials sidebar-socials mt-6 justify-center"
            source={social}
          />
        </div>
      )}

      {/* newsletter */}
      {newsletter.enable && (
        <div className="rounded border border-border p-6 dark:border-darkmode-border">
            <h4 className="section-title mb-5">{newsletter.title}</h4>
            <p className=" text-xs">{newsletter.content}</p>
            <MailchimpSubscribe
              url={newsletter.malichip_url}
              render={({ subscribe, status, message }) => (
                <CustomForm
                  onValidated={(formData) => subscribe(formData)}
                  status={status}
                  message={message}
                />
              )}
            />
            <p className="text-xs">
              By Singing Up, You Agree To The
              <Link
                to={newsletter.privacy_policy_page}
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="ml-1 text-primary"
              >
                Privacy Policy
              </Link>
            </p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;