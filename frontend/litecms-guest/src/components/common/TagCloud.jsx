import { Link } from "react-router-dom"

export const TagCloud = ({ title, tags}) => {
    
    if(tags == null) return(<></>)

    return(
        <div className="relative rounded border border-border p-6 dark:border-darkmode-border mb-6">
            <h4 className="section-title mb-5">{title? title : "Tags"}</h4>
            <div className="flex flex-wrap gap-2 mx-auto text-sm">
                {tags.map((tag, index) => (
                    <Link to={`/tags/${tag}`}
                        key={index} 
                        className="text-sm font-medium
                            px-3 py-1.5 
                            bg-gray-200 text-gray-700
                            dark:bg-emerald-600 dark:text-white
                            hover:bg-emerald-100 hover:text-emerald-700
                            dark:hover:bg-emerald-900/40 dark:hover:text-emerald-400
                            transition-all duration-200"
                    >{tag}
                    </Link>
                ))}
            </div>
        </div>
    )
}