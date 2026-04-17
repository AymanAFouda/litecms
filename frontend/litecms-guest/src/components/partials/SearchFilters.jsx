export const SearchFilters = ({ filters, setFilters }) => {
    
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
                    <option value="articles">Articles</option>
                    <option value="galleries">Galleries</option>
                    <option value="videos">Videos</option>
                </select>
            </div>
            <div className="lg:col-4 col-12 mt-5">
                <label htmlFor="category" className="block mb-2 font-secondary ml-1">Category</label>
                <select 
                    className="block form-input h-10 w-full px-5 py-2 
                        rounded-lg border-none bg-theme-light text-dark 
                        placeholder:text-xs dark:bg-darkmode-theme-dark"

                    id="category"
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                >
                    <option value="">Choose a category</option>
                    <option value="category1">category1</option>
                    <option value="category2">category2</option>
                    <option value="category3">category3</option>
                    <option value="category4">category4</option>
                    <option value="category5">category5</option>
                    <option value="category6">category6</option>
                </select>
            </div>
            <div className="lg:col-4 col-12 mt-5">
                <label htmlFor="tag" className="block mb-2 font-secondary ml-1">Tag</label>
                <select 
                    className="block form-input h-10 w-full px-5 py-2 
                        rounded-lg border-none bg-theme-light text-dark 
                        placeholder:text-xs dark:bg-darkmode-theme-dark"

                    id="tag"
                    name="tag"
                    value={filters.tag}
                    onChange={handleChange}
                >
                    <option value="">Choose a tag</option>
                    <option value="tag1">tag1</option>
                    <option value="tag2">tag2</option>
                    <option value="tag3">tag3</option>
                    <option value="tag4">tag4</option>
                </select>
            </div>
        </div>
    )
}