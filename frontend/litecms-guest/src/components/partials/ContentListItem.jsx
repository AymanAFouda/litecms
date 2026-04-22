import { useState, useEffect } from "react";
import dateFormat from "../../utils/dateFormat";
import { Link } from "react-router-dom";
import { FaRegCalendar, FaUserAlt, FaEye, FaVideo, FaImages } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";

const iconMap = {
  PHOTOGALLERY: <FaImages />,
  VIDEO: <FaVideo />,
  ARTICLE: <FaNewspaper />
};

const ContentListItem = ({ content }) => {
  const [maxChars, setMaxChars] = useState(200);

  useEffect(() => {
    const updateLength = () => {
      if (window.innerWidth < 640) {
        setMaxChars(160); // small screens
      } else {
        setMaxChars(200); // larger screens
      }
    };

    updateLength();
    window.addEventListener("resize", updateLength);

    return () => window.removeEventListener("resize", updateLength);
  }, []);

  const { contentId, title, publisherName, featuredImage, category, createdAt, viewCount, type } = content;

  const description = content.description?.trim()
    ? content.description
    : "No description available.";

  return (
    <div className="post flex flex-col md:flex-row items-start mt-1 px-1">
      <div className="relative">
        <img
          className="flex-shrink-0 rounded-lg !object-cover !h-[220px] !w-[440px] md:!h-[130px] md:!w-[200px]"
          src={
            featuredImage
              ? `http://localhost:8080${featuredImage.fileUrl}`
              : "/images/default-image.png"
          }
          onError={(e) => {
            e.target.onerror = null; // prevent infinite loop
            e.target.src = "/images/default-image.png";
          }}
          alt={title}
        />
        {category && (
          <div className="absolute top-3 left-2 flex flex-wrap items-center">
            <Link
              className="capitalize inline-flex rounded-2xl bg-primary px-3 text-white py-1 text-sm"
              to={`/categories/${encodeURIComponent(category.name)}`}
            >
              {category.name.length > 20? `${category.name.slice(0, 18)}..` : category.name}
            </Link>
          </div>
        )}

        <div className="absolute bottom-2 right-2 text-white text-2xl drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">
          {iconMap[type] || <FaNewspaper />}
        </div>
      </div>
      <div className="flex flex-col justify-start flex-1 mx-2 mt-2 md:ml-4 md:mr-6 md:mt-1">
        <h3 className="h5 mb-1">
          <Link
            to={`/content/${contentId}`}
            className="block hover:text-primary"
          >
            {title}
          </Link>
        </h3>
        <ul className="flex flex-wrap items-center">
          {publisherName && (
            <li className="mr-4">
              <Link
                className="inline-flex items-center font-secondary text-xs leading-3"
                to="/about"
              >
                <FaUserAlt className="mr-1.5" />
                {publisherName}
              </Link>
            </li>
          )}
          <li className="mr-4 inline-flex items-center font-secondary text-xs leading-3">
            <FaRegCalendar className="mr-1.5" />
            {dateFormat(createdAt)}
          </li>
          <li className="mr-4 inline-flex items-center font-secondary text-xs leading-3">
            <FaEye className="mr-1.5" size={16}/>
            {viewCount}
          </li>
        </ul>
        <p className="mt-1 prose content dark:text-gray-300 leading-snug">{description.length > maxChars? description.slice(0, maxChars) : description}..<Link to={`/content/${contentId}`}>read more</Link></p>
      </div>
    </div>
  );
};

export default ContentListItem;