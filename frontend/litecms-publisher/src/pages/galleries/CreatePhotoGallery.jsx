import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { LoadError } from "../../components/common/LoadError";
import { ContentForm } from "../../components/form/ContentForm";

import { createGallery } from "../../services/galleryApi";
import { useCategories } from "../../hooks/useCategories";

export function CreatePhotoGallery() {
    const navigate = useNavigate();

    const { categories, isLoading , loadError } = useCategories()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [createAnother, setCreateAnother] = useState(false)
    const [resetTrigger, setResetTrigger] = useState(0);
    const [formData, setFormData] = useState({
        title: "",
        publisherName: "",
        description: "",
        tags: [],
        category: "",
        featuredImage: null,
        status: "",
        images: [],
    });

    useEffect(() => { document.title = "Create Photo Gallery" }, [isLoading]);

    const resetForm = () => {
        setFormData({
            title: "",
            publisherName: "",
            description: "",
            tags: [],
            category: "",
            featuredImage: null,
            status: "",
            images: [],
        })

        setResetTrigger(prev => prev + 1);
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
            }

            const submitData = new FormData();

            submitData.append("gallery", new Blob([JSON.stringify(payload)], { type: "application/json" }))

            formData.images.forEach(image => {
                submitData.append("files", image.data, image.name);
            });

            if (formData.featuredImage) {
                submitData.append("featuredImage", formData.featuredImage.data, formData.featuredImage.name);
            }

            const createdGallery = await createGallery(submitData)
            toast.success("Photo Gallery created successfully!")

            if(createAnother) {
                resetForm()
                setCreateAnother(false)
            } else {
                navigate("/galleries")
            }
        } catch(er) {
            toast.error("Failed to create Photo Gallery")
        } finally {
            setIsSubmitting(false)
        }
    }

    if(isLoading) { return <LoadingSpinner /> }

    if (loadError) { return <LoadError message="Failed to load Page" /> }

    return (
        <main className="right_col" role="main" aria-label="Main content">
            <div className="">
                <div className="page-title">
                    <div className="title_left">
                        <h3>Photo Galleries</h3>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h4>Create Photo Gallery</h4>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                <ContentForm 
                                    contentType='gallery'
                                    mode='create'
                                    formData={formData}
                                    setFormData={setFormData}
                                    resetForm={resetForm}
                                    categories={categories}
                                    isSubmitting={isSubmitting}
                                    onSubmit={handleSubmit}
                                    onCancel={() => navigate(-1)}
                                    createAnother={createAnother}
                                    setCreateAnother={setCreateAnother}
                                    resetTrigger={resetTrigger}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}