import { Link } from "react-router-dom"
import dateFormat from "../../utils/dateFormat";
import { FaRegCalendar, FaEye } from "react-icons/fa";

export const ContentSuggestions  = ({ title, content}) => {
    
    if(content == null) return <></>

    return(
        <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border mb-6">
            <h4 className="section-title text-left mb-8">{title? title : "Suggestions"}</h4>
            {content.map((content, i, arr) => (
                <div
                className={`flex items-center pb-6 ${
                    i !== arr.length - 1 &&
                    "mb-4 border-b dark:border-b-darkmode-border"
                }`}
                key={`key-${i}`}
                >
                    <img
                        className="mr-3 h-[85px] w-[85px] rounded-md object-cover"
                        src={
                            content.featuredImage
                            ? `http://localhost:8080${content.featuredImage.fileUrl}`
                            : "/images/default-image.png"
                        }
                        onError={(e) => {
                            e.target.onerror = null; // prevent infinite loop
                            e.target.src = "/images/default-image.png";
                        }}
                        width={105}
                        height={85}
                        alt={content.title}
                    />
                    <div>
                        <h3 className="h5 mb-2">
                            <Link
                                to={`/content/1`}
                                className="block hover:text-primary"
                            >
                                {content.title}
                            </Link>
                        </h3>
                        <ul className="flex sm:space-x-5 flex-col sm:flex-row space-x-0 space-y-2 sm:space-y-0">
                            <li className="inline-flex items-center font-secondary text-xs leading-3">
                                <FaRegCalendar className="mr-1.5" />
                                {dateFormat(content.createdAt)}
                            </li>
                            <li className="inline-flex items-center font-secondary text-xs leading-3">
                                <FaEye className="mr-1.5" size={14}/>
                                {content.viewCount}
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
      </div>
    )
}