import config from "../../config/config.json";
import social from "../../config/social.json";
import Social from "../common/Social";
import { Link } from "react-router-dom";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import CustomForm from "../common/NewsLetterForm"
import { TagCloud } from "../common/TagCloud"
import { ContentSuggestions } from "../common/ContentSuggestions"
import { usePopularTags } from "../../hooks/useTags";
import { useRecentContent } from "../../hooks/useContent";

const { newsletter } = config.widgets;

//variant: default, home, or content-detail
const Sidebar = ({ className, variant = "default", contentTags = [], relatedContent = [],largeMedia }) => {

  const isContentDetail = (variant === "content-detail");

  const tagCloudTitle = isContentDetail ? "Tags" : "Popular tags";
  const contentTitle = isContentDetail ? "Related content" : "Latest content";

  const { popularTagList, popularTagsAreLoading, popularTagsLoadError } = usePopularTags();
  const { contentList: recentContent, isLoading: recentContentLoading, loadError: recentContentLoadError } = useRecentContent();

  return (
    <aside className={`${className} ${variant === "content-detail" ? "px-0" : "px-3"} lg:col-4 ${largeMedia? 'lg:pl-12 order-3 mb-8 pt-1': 'lg:px-6 order-2'}`}>
      {(variant=== "default") && (
        <>
          {!recentContentLoading && !recentContentLoadError && (
            <ContentSuggestions title={contentTitle} content={recentContent} />
          )}
          {!popularTagsAreLoading && !popularTagsLoadError && (
            <TagCloud title={tagCloudTitle} tags={popularTagList}/>
          )}
        </>
      )}

      {(variant=== "home") && !popularTagsAreLoading && !popularTagsLoadError && (
        <TagCloud title={tagCloudTitle} tags={popularTagList}/>
      )}

      {variant=== "content-detail" && (
        <>
          {contentTags.length > 0 && (
            <TagCloud title={tagCloudTitle} tags={contentTags}/>
          )}
          {relatedContent.length > 0 && (
            <ContentSuggestions title={contentTitle} content={relatedContent} />
          )}
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