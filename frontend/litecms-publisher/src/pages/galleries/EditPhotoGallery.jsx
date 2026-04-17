import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

import { ContentForm } from "../../components/form/ContentForm";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { LoadError } from "../../components/common/LoadError";

import { updateGallery } from "../../services/galleryApi";
import { useCategories } from "../../hooks/useCategories";
import { useContent } from "../../hooks/useContent";

import "@uppy/core/css/style.min.css";
import "@uppy/dashboard/css/style.min.css";

export const EditPhotoGallery = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    const { categories, isLoading: categoriesLoading, loadError:  categoriesLoadError } = useCategories()
    const { content: gallery, isLoading: galleryLoading, loadError:  galleryLoadError } = useContent("gallery", id)
    const [initialData, setInitialData] = useState(null)
    const [initialFeaturedImage, setInitialFeaturedImage] = useState(null)
    const [initialImages, setInitialImages] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tags: [],
        category: "",
        featuredImage: null,
        status: "",
        images: [],
    });

    const isLoading = categoriesLoading || galleryLoading;

    useEffect(() => {
        document.title = "Edit Photo Gallery"

        if(gallery) {
            const data = {
                title: gallery.title,
                description: gallery.description,
                tags: gallery.tags
                    ? gallery.tags.map(tag => ({
                        label: tag.tagName,
                        value: tag.tagName
                    }))
                    : [],
                category: gallery.category?.name ?? "",
                status: gallery.status,
            }

            setFormData(data)
            setInitialData(data)

            if(!gallery.featuredImage == null) {loadFeaturedImageFromBackend()}
            if(gallery.mediaList.length > 0) {loadImagesFromBackend()}
        }
    }, [gallery])

    const loadFeaturedImageFromBackend = async () => {
        const featuredImage = gallery.featuredImage
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

    const loadImagesFromBackend = async () => {
        const images = await Promise.all(
            gallery.mediaList.map(async (file) => {
                const fileResponse = await fetch(`http://localhost:8080${file.fileUrl}`);

                if (!fileResponse.ok) {
                throw new Error("Failed to fetch file");
                }

                const blob = await fileResponse.blob();

                return new File([blob], file.fileName, {
                type: file.mimeType,
                });
            })
        );

        setInitialImages(images)
    }

    const resetForm = () => {
        setFormData(initialData)
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
                tags: formData.tags.map(tag => ({tagName: tag.value})),
                category: selectedCategory? {
                    id: selectedCategory.id
                } : null,
                status: formData.status,
            }

            const submitData = new FormData();

            submitData.append("gallery", new Blob([JSON.stringify(payload)], { type: "application/json" }))
            if (!formData.featuredImage == null) submitData.append("featuredImage", formData.featuredImage.data, formData.featuredImage.name);

            formData.images.forEach(file => {
                submitData.append("files", file.data, file.name);
            });

            const updatedGallery = await updateGallery(id, submitData)

            toast.success("Photo Gallery updated successfully!")
            navigate("/galleries")
        } catch(er) {
            console.log(er)
            toast.error("Failed to edit Photo Gallery")
        } finally {
            setIsSubmitting(false)
        }
    }
    

    if(isLoading) { return <LoadingSpinner /> }
    
    if (galleryLoadError || categoriesLoadError) { return <LoadError message="Failed to load Page" /> }

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
                                <h4>Edit Photo Gallery</h4>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                <ContentForm 
                                    contentType='gallery'
                                    mode='edit'
                                    formData={formData}
                                    setFormData={setFormData}
                                    resetForm={resetForm}
                                    categories={categories}
                                    isSubmitting={isSubmitting}
                                    onSubmit={handleSubmit}
                                    onCancel={() => navigate(-1)}
                                    initialFeaturedImage={initialFeaturedImage}
                                    initialImages={initialImages}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}