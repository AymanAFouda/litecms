import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

import { ContentForm } from "../../components/form/ContentForm";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { LoadError } from "../../components/common/LoadError";

import { updateArticle } from "../../services/articleApi";
import { useCategories } from "../../hooks/useCategories";
import { useContent } from "../../hooks/useContent";

export function EditArticle() {
    const { id } = useParams();
    const navigate = useNavigate()

    const { categories, isLoading: categoriesLoading, loadError:  categoriesLoadError } = useCategories()
    const { content: article, isLoading: articleLoading, loadError:  articleLoadError } = useContent("article", id)
    const [initialData, setInitialData] = useState(null);
    const [initialFeaturedImage, setInitialFeaturedImage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        publisherName: "",
        description: "",
        tags: [],
        category: "",
        featuredImage: null,
        status: "",
        articleBody: ""
    });

    const isLoading = categoriesLoading || articleLoading;

    useEffect(() => {
        document.title = "Edit Article"

        if(article) {
            const data = {
                title: article.title, 
                publisherName: article.publisherName,
                description: article.description,
                tags: article.tags
                    ? article.tags.map(tag => ({
                        label: tag.name,
                        value: tag.name
                    }))
                    : [],
                category: article.category?.name ?? "",
                status: article.status,
                articleBody: article.articleBody
            }

            setFormData(data)
            setInitialData(data)
            if(article.featuredImage) {loadFeaturedImageFromBackend()}
        }
    }, [article])

    const resetForm = () => {
        setFormData(initialData)
    }

    const loadFeaturedImageFromBackend = async () => {
        const featuredImage = article.featuredImage
        const fileResponse = await fetch(`http://localhost:8080${featuredImage.fileUrl}`);

        if (!fileResponse.ok) {
        throw new Error("Failed to fetch file");
        }

        const blob = await fileResponse.blob();

        const fetchedFeatImage = new File([blob], featuredImage.fileName, {
            type: featuredImage.mimeType,
        });

        setInitialFeaturedImage(fetchedFeatImage)
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)

        try {
            const selectedCategory = categories.find(
                (cat) => cat.name === formData.category
            );

            const payload = {
                title: formData.title,
                publisherName: formData.publisherName,
                description: formData.description,
                tags: formData.tags.map(tag => ({name: tag.value})),
                category: selectedCategory? {
                    id: selectedCategory.id
                } : null,
                status: formData.status,
                articleBody: formData.articleBody,
            }

            const submitData = new FormData();
            submitData.append("article", new Blob([JSON.stringify(payload)], { type: "application/json" }))
            if (formData.featuredImage) {
                console.log("featuredImage:", formData.featuredImage);
                console.log("featuredImage.name:", formData.featuredImage.name);
                console.log("featuredImage.type:", formData.featuredImage.type);
                console.log("featuredImage.data:", formData.featuredImage.data);
                console.log("featuredImage.data instanceof File:", formData.featuredImage.data instanceof File);
                console.log("featuredImage.data.type:", formData.featuredImage.data?.type);
                console.log("featuredImage.data.name:", formData.featuredImage.data?.name);

                submitData.append("featuredImage", formData.featuredImage.data, formData.featuredImage.name);
            } else {
                console.log("No featured image");
            }

            const updatedArticle = await updateArticle(id, submitData)
            navigate("/articles")
            toast.success("Article updated successfully!")

        } catch(er) {
            console.log(er)
            toast.error("Failed to edit Article")
        } finally {
            setIsSubmitting(false)
        }
    }
    
    if(isLoading) { return <LoadingSpinner /> }

    if (articleLoadError || categoriesLoadError) { return <LoadError message="Failed to load Page" /> }

    return (
        <main className="right_col" role="main" aria-label="Main content">
            <div className="">
                <div className="page-title">
                    <div className="title_left">
                        <h3>Articles</h3>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h4>Edit Article</h4>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                <ContentForm 
                                    contentType='article'
                                    mode='edit'
                                    formData={formData}
                                    setFormData={setFormData}
                                    resetForm={resetForm}
                                    categories={categories}
                                    isSubmitting={isSubmitting}
                                    onSubmit={handleSubmit}
                                    onCancel={() => navigate(-1)}
                                    initialFeaturedImage={initialFeaturedImage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}