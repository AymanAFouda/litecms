import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegCalendar, FaUserAlt, FaEye, FaThumbsUp } from "react-icons/fa";

import dateFormat from "../../utils/dateFormat";
import { markdownify } from "../../utils/textConverter";
import { UPLOADS_BASE_URL } from "../../services/apiConfig"

import Sidebar from "../partials/Sidebar";
import CommentSection from "../common/CommentSection";
import LargeMediaButton from "../shortcodes/LargeMediaButton";
import ArticleBody from "../common/ArticleBody";
import { PhotoGallery } from "../common/PhotoGallery";
import { VideoEmbed } from "../common/VideoEmbed";

const PostSingle = ({ 
  content, liked, likeCount, onLikeClick, 
  likeButtonIsLoading, comments, commentFormData, 
  setCommentFormData, onSubmitComment,
  commentsAreLoading, commentsLoadError,
  relatedContent
}) => {

  let { 
    featuredImage, title, description, 
    tags, viewCount, createdAt, 
    category, publisherName, type, 
    articleBody, mediaList, videoUrl
  } = content;
  
  const [largeMedia, setLargeMedia] = useState(false)

  return (
    <section className="section single-blog pt-10">
      <div className="container">
        <div className="row">
          <div className={`p-0 ${largeMedia? 'lg:col-12' : 'lg:col-8'} order-1`}>
            <article>
              <div className="relative">
                {featuredImage ? ( 
                  <div>
                      <img
                        src={`${UPLOADS_BASE_URL}${featuredImage.fileUrl}`}
                        alt={title}
                        className="w-full max-w-[854px] h-[350px] object-cover overflow-hidden rounded-lg"
                      />
                    <div className="absolute top-2 left-2 flex flex-wrap items-center">
                      {category && (
                        <Link
                          className="capitalize ml-2 mt-2 inline-flex rounded-2xl bg-primary px-3 text-white py-1 text-lg"
                          to={`/categories/${encodeURIComponent(category.name)}`}
                        >
                          {category.name}
                        </Link>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="absolute absolute top-[-40px]">
                    {category && (
                        <Link
                          className="capitalize inline-flex rounded-2xl bg-primary px-3 text-white py-1 text-md"
                          to={`/categories/${encodeURIComponent(category.name)}`}
                        >
                          {category.name}
                        </Link>
                    )}
                  </div>
                )}
                
              </div>

              {markdownify(title, "h1", "lg:text-[42px] mt-4 mb-1")}
              <div className="my-0 border-t-2 border-[#45ad92]"></div>
              <ul className="flex items-start justify-between mt-2 px-[4px] ">
                <div className="flex sm:space-x-5 flex-col sm:flex-row space-x-0 space-y-4 sm:space-y-0">
                  <li className="inline-flex items-center font-secondary text-s leading-3">
                      <FaUserAlt className="mr-1.5"/>
                      {publisherName}
                  </li>
                  <li className="inline-flex items-center font-secondary text-s leading-3">
                    <FaRegCalendar className="mr-1.5"/>
                    {dateFormat(createdAt)}
                  </li>
                  <li className="inline-flex items-center font-secondary text-s leading-3">
                    <FaEye className="mr-1.5" size={20}/>
                    {viewCount} Views
                  </li>
                </div>
                <div className="flex space-x-6">
                  <li className="inline-flex items-end font-secondary text-s leading-5">
                    <FaThumbsUp 
                      className={`mr-1.5 text-[1.2rem] ${
                        liked
                          ? "text-blue-600"
                          : "text-gray-500 hover:text-blue-500 dark:text-white dark:hover:text-blue-500"
                        }`} 
                      onClick={onLikeClick}
                    />
                    {likeCount} Likes
                  </li>
                </div>
              </ul>

              {articleBody && (
                <div id="article" className="content mb-8">
                  <ArticleBody articleBody={articleBody}/>
                </div>
              )}

              {mediaList && mediaList.length > 0 && (
                <div id="gallery" className="content mb-8 mt-6">
                  <PhotoGallery mediaList={mediaList} largeMedia={largeMedia}/>
                  <LargeMediaButton
                    largeMedia={largeMedia} 
                    setLargeMedia={setLargeMedia} 
                  />
                </div>
              )}

              {videoUrl && (
                <div id="video" className="content mb-8 mt-6">
                  <VideoEmbed url={videoUrl}/>
                  <LargeMediaButton 
                    largeMedia={largeMedia} 
                    setLargeMedia={setLargeMedia} 
                  />
                </div>
              )}            
            </article>                 
          </div>

          <Sidebar variant={"content-detail"} contentTags={tags} relatedContent={relatedContent} largeMedia={largeMedia}/>

          <div className={`lg:col-8 p-0 mb-8 ${largeMedia? "order-2" : "order-3"}`}>
            <CommentSection 
              comments={comments}
              commentsAreLoading={commentsAreLoading}
              commentsLoadError={commentsLoadError}
              commentFormData={commentFormData}
              setCommentFormData={setCommentFormData}
              onSubmitComment={onSubmitComment}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostSingle;