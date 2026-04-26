import CreatableSelect from "react-select/creatable";
import { ArticleBodyEditor } from "./ArticleBodyEditor";
import { AnotherCheckBox } from "./AnotherCheckBox";
import { FileUploader, FeaturedImageFileUploader } from './FileUploader'
import { ContentStatusRadioGroup } from "./ContentStatusRadioGroup";
import { normalizeTags } from "../../utils/tagsNormalizer"

export const ContentForm = ({
    contentType /* 'article', 'video', or 'gallery' */,
    mode /* 'create' or 'edit' */,
    formData, setFormData,
    resetForm, categories, isSubmitting, 
    onSubmit, createAnother, setCreateAnother,
    onCancel, 
    resetTrigger /* Resets FileUploader */,
    initialFeaturedImage, initialImages = [] /* Load images when updating a photo gallery */
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleKeyDown = (event) => {
        if (!formData.tags) return;

        const inputValue = event.target.value.trim().toLowerCase();
        const isDuplicate = formData.tags.some(tag => tag.value.toLowerCase() === inputValue);

        if (event.key === "Enter" && isDuplicate) {
            event.preventDefault();
        }
    };
    
    return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit()}} className="row form-horizontal">
        <div className="mb-4 row">
            <label className="col-form-label col-sm-1" htmlFor="title">
                Title <span className="required text-danger">*</span>
            </label>
            <div className="col-sm-11">
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter content title"
                    required
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                />
                <div className="form-text">Enter a clear and descriptive title for your content</div>
            </div>
        </div>
        <div className="mb-4 row">
            <label className="col-form-label col-sm-1" htmlFor="publisher-name">
                Publisher Name
            </label>
            <div className="col-sm-11">
                <input
                    type="text"
                    id="publisher-name"  
                    name="publisherName"
                    placeholder="Enter publisher name"
                    className="form-control"
                    value={formData.publisherName}
                    onChange={handleChange}
                />
                <div className="form-text">Enter the name of the content publisher</div>
            </div>
        </div>
        <div className="mb-4 row">
            <label className="col-form-label col-sm-1" htmlFor="description">
                Description
            </label>
            <div className="col-sm-11">
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Enter content description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}>
                </textarea>
                <div className="form-text">Provide a brief summary or overview of the content</div>
            </div>
        </div>
        <div className="mb-4 row">
            <label className="col-form-label col-sm-1" htmlFor="category">
                Category
            </label>
            <div className="col-sm-11">
                <select
                id="category"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange} >
                    <option value="">Choose a category</option>
                    {categories?.map((cat) => {
                        return(
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        )
                    })}
                </select>
                <div className="form-text">Select the category that best fits your content</div>
            </div>
        </div>
        <div className="mb-4 row w-100">
            <label className="col-form-label col-sm-1" htmlFor="tags">
                Tags
            </label>
            <div className="col-sm-11">
                <CreatableSelect
                    classNamePrefix="react-select"
                    isMulti
                    id="tags"
                    name="tags"
                    placeholder="Type a tag and press enter"
                    value={formData.tags}
                    onChange={(newTags) =>
                        setFormData(prev => ({
                            ...prev,
                            tags: normalizeTags(newTags)
                        }))
                    }
                    onKeyDown={handleKeyDown}
                    isClearable
                    components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                    }}
                />
                <div className="form-text">Type one or more tags. Press Enter to add a tag</div>
            </div>
        </div>

        <div className="row mb-4">
            <label className="col-form-label col-sm-1" htmlFor="statusDraft">
                Statuts
            </label>
            <ContentStatusRadioGroup handleChange={handleChange} formData={formData} />
        </div>

        <div className="mb-4 row w-100">
            <label className="col-form-label col-sm-1 mb-2" htmlFor="uppyfe-dashboard">
                Featured image
            </label>
            <div className="col-sm-12">
                <FeaturedImageFileUploader
                    setFormData={setFormData}
                    resetTrigger={resetTrigger}
                    initialFeaturedImage={initialFeaturedImage}
                />
                <div className="form-text">Upload the main image that represents this content. Prefer a clear, high-quality image.</div>
            </div>
        </div>
        
        <div className="border-top border-primary border-opacity-25 mt-3 mb-3"></div>

        {contentType == 'article' && (
            <div className="row">
                <label className="col-form-label col-sm-1 mb-2" htmlFor="article-body">
                    Article Body
                </label>
                <div className="col-sm-12">
                    <ArticleBodyEditor
                        value={formData.articleBody}
                        onChange={(data) =>
                            setFormData(prev => ({ ...prev, articleBody: data }))
                        }
                    />
                </div>
            </div>  
        )}

        {contentType === 'video' && (
            <div className="row">
                <label className="col-form-label col-sm-1" htmlFor="videoUrl">
                    Video URL <span className="required text-danger"></span>
                </label>
                <div className="col-sm-11">
                    <input
                        type="url"
                        id="videoUrl"
                        name="videoUrl"
                        placeholder="Enter video url"
                        className="form-control"
                        value={formData.videoUrl}
                        onChange={handleChange}
                    />
                    <div className="form-text">{`Paste a video URL (YouTube, Vimeo, or similar platforms)`}</div>
                </div>
            </div>
        )}

        {contentType === 'gallery' && (
            <div className="row">
                <label className="col-form-label col-sm-1 mb-2" htmlFor="uppy-dashboard">
                    Images
                </label>
                <div className="col-sm-12">
                    <FileUploader
                        setFormData={setFormData}
                        resetTrigger={resetTrigger}
                        initialImages={initialImages}
                    />
                </div>
            </div>
        )}

        {mode === 'create' && (
            <>
            <div className="border-top border-primary border-opacity-25 mt-4 mb-3"></div>
            <div className="row">
                <div className="col-sm-12">
                    <AnotherCheckBox 
                        label={`Create another ${contentType} after this`}
                        checked={createAnother}
                        onChange={setCreateAnother}
                    />
                </div>
            </div>
            </>
        )}

        <div className="ln_solid "></div>
        <div className="row">
            <div className="col-sm-6 center-margin">
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>Cancel</button>
                    <button className="btn btn-outline-primary" type="button" onClick={resetForm}>Reset</button>
                    <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                        {isSubmitting? "Loading..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    </form>
    )
}