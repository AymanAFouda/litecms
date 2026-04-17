import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

import { ContentForm } from "../../components/form/ContentForm";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { LoadError } from "../../components/common/LoadError";

import { updateVideo } from "../../services/videoApi";
import { useCategories } from "../../hooks/useCategories";
import { useContent } from "../../hooks/useContent";

export function EditVideo() {
    const { id } = useParams();
    const navigate = useNavigate()

    const { categories, isLoading: categoriesLoading, loadError:  categoriesLoadError } = useCategories()
    const { content: video, isLoading: videoLoading, loadError:  videoLoadError } = useContent("video", id)
    const [initialData, setInitialData] = useState(null);
    const [initialFeaturedImage, setInitialFeaturedImage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tags: [],
        category: "",
        featuredImage: null,
        status: "",
        videoUrl: ""
    });

    const isLoading = categoriesLoading || videoLoading;

    useEffect(() => {
        document.title = "Edit Video"

        if(video) {
            const data = {
                title: video.title,
                description: video.description,
                tags: video.tags
                    ? video.tags.map(tag => ({
                        label: tag.tagName,
                        value: tag.tagName
                    }))
                    : [],
                category: video.category?.name ?? "",
                status: video.status,
                videoUrl: video.videoUrl
            }

            setFormData(data)
            setInitialData(data)
            if(!video.featuredImage == null) {loadFeaturedImageFromBackend()}
        }
    }, [video])

    const resetForm = () => {
        setFormData(initialData)
    }

    const loadFeaturedImageFromBackend = async () => {
        const featuredImage = video.featuredImage
        console.log(featuredImage)
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
                description: formData.description,
                tags: formData.tags.map(tag => ({tagName: tag.value})),
                category: selectedCategory? {
                    id: selectedCategory.id
                } : null,
                status: formData.status,
                videoUrl: formData.videoUrl,
            }

            const submitData = new FormData();
            submitData.append("video", new Blob([JSON.stringify(payload)], { type: "application/json" }))
            if (!formData.featuredImage == null) submitData.append("featuredImage", formData.featuredImage.data, formData.featuredImage.name);

            const updatedVideo = await updateVideo(id, submitData)
            navigate("/videos")
            toast.success("Video updated successfully!")

        } catch(er) {
            console.log(er)
            toast.error("Failed to edit Video")
        } finally {
            setIsSubmitting(false)
        }
    }
    

    if(isLoading) { return <LoadingSpinner /> }

    if (videoLoadError || categoriesLoadError) { return <LoadError message="Failed to load Page" /> }


    return (
        <main className="right_col" role="main" aria-label="Main content">
            <div className="">
                <div className="page-title">
                    <div className="title_left">
                        <h3>Videos</h3>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h4>Edit Video</h4>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                <ContentForm 
                                    contentType='video'
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
