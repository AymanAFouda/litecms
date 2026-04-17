import config from "../../config/config.json";
import dateFormat from "../../utils/dateFormat";
import { Link } from "react-router-dom";
import { FaRegCalendar, FaUserAlt, FaEye } from "react-icons/fa";
import { useState, useEffect } from "react";


const Post = ({ content }) => {
  const { meta_author } = config.metadata;
  const author = meta_author;

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
      <div className="relative">
        {content.featuredImage && (
          <img
            className="rounded w-full"
            src={content.featuredImage}
            alt={content.featuredImage.alt}
          />
        )}
        <ul className="absolute top-3 left-2 flex flex-wrap items-center">
          {content.category && (
            <li
              className="mx-2 inline-flex h-7 rounded-[35px] bg-primary px-3 text-white"
            >
              <Link
                className="capitalize"
                to={`/categories/${content.category.replace(" ", "-")}`}
              >
                {content.category}
              </Link>
            </li>
          )}
        </ul>
      </div>
      <h3 className="h5 mb-2 mt-4">
        <Link
          to="#"
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
            {author}
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
      <p className="mt-1 prose content dark:text-gray-300">{content.description.slice(0, maxChars)}.. <a href="#"> read more</a></p>
    </div>
  );
};

export default Post;
