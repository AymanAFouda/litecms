import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import CreatableSelect from "react-select/creatable";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getCategories, getArticle, updateArticle, createArticle } from "../api";


export function CreateArticle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tags: [],
        category: "",
        status: "",
        articleBody: ""
    });
    const [categories, setCategories] = useState([])
    const [createAnother, setCreateAnother] = useState(false)

    useEffect(() => {
        setIsLoading(true);

        loadCategories()

        if (!id) {
            setIsLoading(false)
            return
        }

        loadArticle()
        setIsLoading(false)
    }, [id]);

    const loadCategories = async () => {
        try {
            const data = await getCategories()
            setCategories(data)
        } catch (error) {
            console.log(error)
        }
    }

    const loadArticle = async () => {

        try {
            const article = await getArticle(id)
             
            setFormData({
                title: article.title,
                description: article.description,
                tags: article.tags.map(tag => ({
                    label: tag,
                    value: tag
                })),
                category: "",
                status: article.status,
                articleBody: article.articleBody
            });
            
        } catch(er) {
            console.log(er)
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            tags: [],
            category: "",
            status: "",
            articleBody: ""
        })
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)

        try {
            const selectedCategory = categories.find(
                (cat) => cat.name === formData.category
            );

            const payload = {
                title: formData.title,
                description: formData.description,
                tags: formData.tags,
                category: selectedCategory? selectedCategory.id : null,
                status: formData.status,
                articleBody: formData.articleBody,
            }

            if(id) {
                const createdArticle = await updateArticle(payload)
                toast.success("Article updated successfully!")
            } else {
                const createdArticle = await createArticle(payload)
                toast.success("Article created successfully!")
            }

            if(createAnother) {
                resetForm()
                setCreateAnother(false)
            } else {
                navigate("/articles")
            }
        } catch(er) {
            console.log(er)
        } finally {
            setIsSubmitting(false)
        }
    }
    
    const normalizeTags = (tags = []) => {
        const seen = new Set();

        return tags.map(tag => {
            const value = tag.value.trim().toLowerCase();

            return {
                label: value,
                value
            };
            })
            .filter(tag => {
            if (!tag.value) return false;
            if (seen.has(tag.value)) return false;
            seen.add(tag.value);
            return true;
        });
    };

    if(isLoading) {
        return (
            <main className="spinner-container right_col d-flex justify-content-center align-items-center pt-0" role="main" aria-label="Main content">
                <LoadingSpinner size='lg' />
            </main>
        )
    }

    return (
    <>
    <title>{id? "Edit Article" : "Create Article"}</title>
    <main className="right_col" role="main" aria-label="Main content">
        <div className="">
            <div className="page-title">
                <div className="title_left">
                    <h3>Articles</h3>
                </div>
            </div>
            <div className="clearfix"></div>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h4>{id? "Edit Article" : "Create Article"}</h4>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">
                            <br />
                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit()}} className="row form-horizontal">
                                <div className="mb-3 row">
                                    <label className="col-form-label col-md-1 col-sm-1" htmlFor="title">
                                        Title <span className="required text-danger">*</span>
                                    </label>
                                    <div className="col-md-11 col-sm-11">
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            placeholder="Enter article title"
                                            required
                                            className="form-control"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-form-label col-md-1 col-sm-1" htmlFor="description">
                                        Description
                                    </label>
                                    <div className="col-md-11 col-sm-11">
                                        <textarea
                                            id="description"
                                            name="description"
                                            placeholder="Enter article description"
                                            className="form-control"
                                            value={formData.description}
                                            onChange={handleChange}>
                                        </textarea>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-form-label col-md-1 col-sm-1" htmlFor="category">
                                        Category
                                    </label>
                                    <div className="col-md-11 col-sm-11">
                                        <select
                                          id="category"
                                          name="category"
                                          className="form-control"
                                          value={formData.category}
                                          onChange={handleChange} >
                                            <option value="">Choose a category</option>
                                            {categories.map((cat) => {
                                                return(
                                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-form-label col-md-1 col-sm-1" htmlFor="tags">
                                        Tags
                                    </label>
                                    <div className="col-md-11 col-sm-11">
                                        <CreatableSelect 
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
                                            
                                            isClearable
                                            components={{
                                                DropdownIndicator: () => null,
                                                IndicatorSeparator: () => null
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label className="col-form-label col-md-1 col-sm-1" htmlFor="statusDraft">
                                        Statuts <span className="required text-danger">*</span>
                                    </label>
                                    <div className="col-md-11 col-sm-11 d-flex justify-content-start align-items-center gap-5">
                                        <div className="form-check form-check-inline mb-0 d-flex align-items-center gap-2">
                                            <input 
                                                className="form-check-input" 
                                                type="radio"
                                                name="status"
                                                id="statusDraft"
                                                value="DRAFT"
                                                checked={formData.status === "DRAFT"}
                                                onChange={handleChange}
                                                required />
                                            <label className="form-check-label" htmlFor="statusDraft">DRAFT</label>
                                        </div>
                                        <div className="form-check form-check-inline mb-0 d-flex align-items-center gap-2">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="status" 
                                                id="statusPublisher" 
                                                value="PUBLISHED" 
                                                checked={formData.status === "PUBLISHED"}
                                                onChange={handleChange}
                                                required />
                                            <label className="form-check-label" htmlFor="statusPublisher">PUBLISHED</label>
                                        </div>
                                        <div className="form-check form-check-inline mb-0 d-flex align-items-center gap-2">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="status" 
                                                id="statusArchived" 
                                                value="ARCHIVED" 
                                                checked={formData.status === "ARCHIVED"}
                                                onChange={handleChange}
                                                required />
                                            <label className="form-check-label" htmlFor="statusArchived">ARCHIVED</label>
                                        </div>
                                    </div>

                                </div>
                                <div className="mb-3 row">
                                    <label className="col-form-label col-md-1 col-sm-1 mb-2" htmlFor="article-body">
                                        Article Body <span className="required text-danger">*</span>
                                    </label>
                                    <div className="row col-md-12 col-sm-12">
                                        <CKEditor
                                            editor={ClassicEditor}
                                            config={{
                                                toolbar: [
                                                    'undo', 'redo',
                                                    'heading',
                                                    '|',
                                                    'bold', 'italic',
                                                    'link',
                                                    'blockQuote',
                                                    'numberedList', 'bulletedList',
                                                    'insertTable',
                                                    'outdent', 'indent',
                                                ],
                                                placeholder: "Type your article here..."
                                            }}
                                            data={formData.articleBody}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setFormData(prev => ({ ...prev, articleBody: data }));
                                            }}
                                        />
                                    </div>
                                </div>
                                
                                {!id && (
                                    <div className="row mb-3">
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-check">
                                                <input 
                                                    className="form-check-input me-2" 
                                                    type="checkbox"
                                                    id="createAnother"
                                                    checked={createAnother}
                                                    onChange={(e) => setCreateAnother(e.target.checked)} />

                                                <label className="form-check-label" htmlFor="createAnother">
                                                    Create another Article after this
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="ln_solid"></div>
                                <div className="row mb-3">
                                    <div className="col-md-6 col-sm-6 center-margin">
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                            <button className="btn btn-outline-secondary" type="button" onClick={() => navigate(-1)}>Cancel</button>
                                            {!id && (
                                                <button className="btn btn-outline-primary" type="button" onClick={resetForm}>Reset</button>
                                            )}
                                            <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                                                {isSubmitting? "Loading..." : "Submit"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    </>
  )
}