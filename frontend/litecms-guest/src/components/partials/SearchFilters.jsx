import { useTags } from "../../hooks/useTags";
import { useCategories } from "../../hooks/useCategories";

export const SearchFilters = ({ filters, setFilters }) => {

    const { categoryList, isLoading: categoriesLoading, loadError: categoriesError } = useCategories();
    const { tagList, isLoading: tagsLoading, loadError: tagsError } = useTags();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return(
        <div className="row">
            <div className="lg:col-4 col-12 mt-5">
                <label htmlFor="content-type" className="block mb-2 font-secondary ml-1">Content type</label>
                <select
                    className="block form-input h-10 w-full px-5 py-2 
                        rounded-lg border-none bg-theme-light text-dark 
                        placeholder:text-xs dark:bg-darkmode-theme-dark"

                    id="content-type"
                    name="contentType"
                    value={filters.contentType}
                    onChange={handleChange}
                >
                    <option value="All content">All content</option>
                    <option value="ARTICLE">Articles</option>
                    <option value="PHOTOGALLERY">Galleries</option>
                    <option value="VIDEO">Videos</option>
                </select>
            </div>
            <div className="lg:col-4 col-12 mt-5">
                <label htmlFor="category" className="block mb-2 font-secondary ml-1">Category</label>
                <select
                    className="block form-input h-10 w-full px-5 py-2 
                        rounded-lg border-none bg-theme-light text-dark 
                        placeholder:text-xs dark:bg-darkmode-theme-dark
                    "
                    id="category"
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                >
                    <option value="">Choose a category</option>
                    {categoryList.length > 0 && categoryList.map((cat, index) => (
                        <option key={index} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
            </div>
            <div className="lg:col-4 col-12 mt-5">
                <label htmlFor="tag" className="block mb-2 font-secondary ml-1">Tag</label>
                <select 
                    className="block form-input h-10 w-full px-5 py-2 
                        rounded-lg border-none bg-theme-light text-dark 
                        placeholder:text-xs dark:bg-darkmode-theme-dark
                    "
                    id="tag"
                    name="tag"
                    value={filters.tag}
                    onChange={handleChange}
                >
                    <option value="">Choose a tag</option>
                    {tagList.length > 0 && tagList.map((tag, index) => (
                        <option key={index} value={tag.name}>{tag.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}