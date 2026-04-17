import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegCalendar, FaUserAlt, FaEye, FaThumbsUp } from "react-icons/fa";

import config from "../../config/config.json";
import dateFormat from "../../utils/dateFormat";
import { markdownify } from "../../utils/textConverter";

import Sidebar from "../partials/Sidebar";
import CommentSection from "../common/CommentSection";
import LargeMediaButton from "../common/LargeMediaButton";
import ArticleBody from "../common/ArticleBody";
import { PhotoGallery } from "../common/PhotoGallery";
import { VideoEmbed } from "../common/VideoEmbed";

const { meta_author } = config.metadata;

const PostSingle = ({ data, relatedPosts }) => {
  let { 
    image, title, description, tags, 
    likeCount: originalLikeCount, viewCount, 
    createdAt, category, publisher, comments, 
    articleBody, mediaList, videoUrl 
  } = data;
  
  const contentPublisher = publisher ? publisher : meta_author;
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(originalLikeCount? originalLikeCount: 0)
  const [largeMedia, setLargeMedia] = useState(false)

  return (
    <section className="section single-blog">
      <div className="container">
        <div className="row">
          <div className={`p-0 ${largeMedia? 'lg:col-12' : 'lg:col-8'} order-1`}>
            <article>
              <div className="relative">
                {image && (
                  <div className="w-full h-[350px] object-cover overflow-hidden rounded-lg">
                    <img
                      src={image}
                      height={300}
                      width={1000}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <ul className="absolute top-3 left-2 flex flex-wrap items-center">
                  {category && (
                    <li
                      className="mx-2 inline-flex h-7 rounded-[35px] bg-primary px-3 text-white"
                      key={category}
                    >
                      <Link
                        className="capitalize"
                        to={`/categories/${category.replace(" ", "-")}`}
                      >
                        {category}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {markdownify(title, "h1", "lg:text-[42px] mt-4 mb-1")}
              <div className="my-0 border-t-2 border-[#45ad92]"></div>
              <ul className="flex items-start justify-between mt-2 px-[4px] ">
                <div className="flex sm:space-x-5 flex-col sm:flex-row space-x-0 space-y-4 sm:space-y-0">
                  <li className="inline-flex items-center font-secondary text-s leading-3">
                      <FaUserAlt className="mr-1.5"/>
                      {contentPublisher}
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
                      onClick={() => { liked? setLikeCount(prev => prev-1) : setLikeCount(prev => prev+1); setLiked(prev => !prev); }}    
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

              {!mediaList.length == 0 && (
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

          <Sidebar variant={"content-detail"} contentTags={tags} largeMedia={largeMedia}/>

          <div className={`lg:col-8 p-0 mb-8 ${largeMedia? "order-2" : "order-3"}`}>
            <CommentSection comments={comments} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostSingle;
