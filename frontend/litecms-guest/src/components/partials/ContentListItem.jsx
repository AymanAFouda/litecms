import { useState, useEffect } from "react";
import config from "../../config/config.json";
import dateFormat from "../../utils/dateFormat";
import { Link } from "react-router-dom";
import { FaRegCalendar, FaUserAlt, FaEye } from "react-icons/fa";

const ContentListItem = ({ content }) => {
  const { meta_author } = config.metadata;
  const author = content.author ? content.author : meta_author;
  const [maxChars, setMaxChars] = useState(280);

  useEffect(() => {
    const updateLength = () => {
      if (window.innerWidth < 640) {
        setMaxChars(180); // small screens
      } else {
        setMaxChars(225); // larger screens
      }
    };

    updateLength();
    window.addEventListener("resize", updateLength);

    return () => window.removeEventListener("resize", updateLength);
  }, []);

  const { title, featuredImage, category, createdAt, viewCount } = content

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
              ? `http://localhost:8080${featuredImage}`
              : "/images/default-image.png"
          }
          onError={(e) => {
            e.target.onerror = null; // prevent infinite loop
            e.target.src = "/images/default-image.png";
          }}
          alt={title}
        />
        <ul className="absolute top-3 left-2 flex flex-wrap items-center">
          {category && (
            <li
              className="inline-flex rounded-2xl bg-primary px-3 text-white py-1 text-sm"
            >
              <Link
                className="capitalize"
                to={`/categories/${category.replace(" ", "-")}`}
              >
                {category.length>20? `${category.slice(0, 18)}..` : category}
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="flex flex-col justify-start flex-1 mx-2 mt-2 md:ml-4 md:mr-6 md:mt-1">
        <h3 className="h5 mb-1">
          <Link
            to={`/`}
            className="block hover:text-primary"
          >
            {title}
          </Link>
        </h3>
        <ul className="flex flex-wrap items-center">
          <li className="mr-4">
            <Link
              className="inline-flex items-center font-secondary text-xs leading-3"
              to="/about"
            >
              <FaUserAlt className="mr-1.5" />
              {author}
            </Link>
          </li>
          <li className="mr-4 inline-flex items-center font-secondary text-xs leading-3">
            <FaRegCalendar className="mr-1.5" />
            {dateFormat(createdAt)}
          </li>
          <li className="mr-4 inline-flex items-center font-secondary text-xs leading-3">
            <FaEye className="mr-1.5" size={16}/>
            {viewCount}
          </li>
        </ul>
        <p className="mt-1 prose content dark:text-gray-300 leading-snug">{description.length > maxChars? description.slice(0, maxChars) + "..." : description + " "}<a href="#">read more</a></p>
      </div>
    </div>
  );
};

export default ContentListItem;