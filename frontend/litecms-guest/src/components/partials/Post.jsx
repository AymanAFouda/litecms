import dateFormat from "../../utils/dateFormat";
import { Link } from "react-router-dom";
import { FaRegCalendar, FaUserAlt, FaEye, FaVideo, FaImages } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { UPLOADS_BASE_URL } from "../../services/apiConfig"

const iconMap = {
  PHOTOGALLERY: <FaImages />,
  VIDEO: <FaVideo />,
  ARTICLE: <FaNewspaper />
};

const Post = ({ content }) => {
  const [maxChars, setMaxChars] = useState(300);

  useEffect(() => {
    const updateLength = () => {
      if (window.innerWidth < 640) {
        setMaxChars(180); // small screens
      } else {
        setMaxChars(300); // larger screens
      }
    };

    updateLength();
    window.addEventListener("resize", updateLength);

    return () => window.removeEventListener("resize", updateLength);
  }, []);
  return (
    <div className="post">
      <div className="relative max-h-[500px] overflow-hidden">
        {content.featuredImage && (
          <img
            className="rounded w-full h-[500px] object-cover"
            src={
              content.featuredImage
                ? `${UPLOADS_BASE_URL}${content.featuredImage.fileUrl}`
                : "/images/default-image.png"
            }
            onError={(e) => {
              e.target.onerror = null; // prevent infinite loop
              e.target.src = "/images/default-image.png";
            }}
          />
        )}

        {content.category && (
          <div className="absolute top-3 left-2 flex flex-wrap items-center">
            <Link
              className="capitalize mx-2 inline-flex h-7 rounded-[35px] bg-primary px-3 text-white"
              to={`/categories/${encodeURIComponent(content.category.name)}`}
            >
              {content.category.name}
            </Link>
          </div>
        )}

        <div className="absolute bottom-4 right-4 text-white text-5xl md:text-6xl md:bottom-5 md:right-5 drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">
          {iconMap[content.type] || <FaNewspaper />}
        </div>
      </div>
      <h3 className="h5 mb-2 mt-4">
        <Link
          to={`/content/${content.contentId}`}
          className="block hover:text-primary"
        >
          {content.title}
        </Link>
      </h3>
      <ul className="flex flex-wrap items-center">
        <li className="mr-4">
          <Link
            className="inline-flex items-center font-secondary text-xs leading-3"
            to="/about"
          >
            <FaUserAlt className="mr-1.5" />
            {content.publisherName}
          </Link>
        </li>
        <li className="mr-4 inline-flex items-center font-secondary text-xs leading-3">
          <FaRegCalendar className="mr-1.5" />
          {dateFormat(content.createdAt)}
        </li>
        <li className="mr-4 inline-flex items-center font-secondary text-xs leading-3">
          <FaEye className="mr-1.5" size={18}/>
          {content.viewCount}
        </li>
      </ul>
      <p className="mt-1 prose content dark:text-gray-300">{content.description.slice(0, maxChars)}..<a href="#">read more</a></p>
    </div>
  );
};

export default Post;