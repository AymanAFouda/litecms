import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap'
import DataTable from "react-data-table-component"
import toast from 'react-hot-toast';

import { LoadingSpinner } from "../components/common/LoadingSpinner"
import { LoadError } from "../components/common/LoadError";
import { Card } from "../components/common/Card";
import { dashboardContentColumns } from "../components/table/dashboardContentColumns"

import { usePublisherDashboard } from "../hooks/usePublisherDashboard";
import { deleteArticle } from "../services/articleApi";
import { deleteGallery } from "../services/galleryApi";
import { deleteVideo } from "../services/videoApi";


const statsCardsCss = [
  {
    key: "totalContent",
    title: "Total Content",
    icon: "fa-layer-group",
    backgroundColor: "bg-primary"
  },
  {
    key: "publishedContent",
    title: "Published Content",
    icon: "fa-globe",
    backgroundColor: "published-content-bg"
  },
  {
    key: "contentThisWeek",
    title: "Content This Week",
    icon: "fa-calendar-week",
    backgroundColor: "content-this-week-bg"
  },
  {
    key: "totalViews",
    title: "Total Views",
    icon: "fa-eye",
    backgroundColor: "total-views-bg"
  },
  {
    key: "totalLikes",
    title: "Total Likes",
    icon: "fa-heart",
    backgroundColor: "total-likes-bg"
  },
  {
    key: "totalComments",
    title: "Total Comments",
    icon: "fa-comments",
    backgroundColor: "total-comments-bg"
  }
];

export function Home() {
    useEffect(() => { 
        document.title = "LiteCMS" 
    }, []);

    const { stats, latestContent, setLatestContent, isLoading, loadError } = usePublisherDashboard();
    const [selectedContent, setSelectedContent] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false);

    const handleOpenDeleteModal = (content) => {
        setSelectedContent(content)
        setShowDeleteModal(true)
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
        setSelectedContent(null)  
    }

    const handleDeleteContent = async () => {
        if (!selectedContent) {
            return;
        }

        setIsDeleting(true)
        try {
            if(selectedContent.type === "ARTICLE") {
                await deleteArticle(selectedContent.contentId)
                setLatestContent(latestContent.filter((item) => item.contentId !== selectedContent.contentId));

            } else if(selectedContent.type === "PHOTOGALLERY") {
                await deleteGallery(selectedContent.contentId)
                setLatestContent(latestContent.filter((item) => item.contentId !== selectedContent.contentId));

            } else if(selectedContent.type === "VIDEO") {
                await deleteVideo(selectedContent.contentId)
                setLatestContent(latestContent.filter((item) => item.contentId !== selectedContent.contentId));
            }

            toast.success("Content deleted successfully")
        } catch(er) {
            console.log(er)
            toast.error("Failed to delete Content")
        } finally {
            handleCloseDeleteModal();
            setIsDeleting(false)
        }
    }

    const columns = dashboardContentColumns({ onDelete: handleOpenDeleteModal });

    if(isLoading) return <LoadingSpinner /> 
    
    if(loadError) return <LoadError message="Failed to load Page" />

    return(
        <>
        <div className="right_col">
            <div className="">  
                <div className="page-title">
                    <h4 className="m-0">Content Overview</h4>
                </div>

                <div className="row col-12 gy-4">
                    {stats && statsCardsCss.map((card) => (
                        <Card
                            key={card.key}
                            title={card.title}
                            value={stats[card.key]}
                            icon={card.icon}
                            backgroundColor={card.backgroundColor}
                        />  
                    ))}
                    <div className="clearfix"></div>
                </div>

                <div className="page-title">
                    <h4 className="m-0">Quick Actions</h4>
                </div>

                <div className="row col-12 gy-4">   
                    <Link to="/articles/create" className="col-sm-4 col-md-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <div className="d-flex align-items-center flex-column">
                                    <div className="flex-shrink-0 my-3">
                                        <div className="action-avatar-bg text-white rounded-circle d-flex align-items-center justify-content-center avatar-xxl">
                                            <i className="fas fa-newspaper fa-5x"></i>
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <h4 className="text-center m-0">Create Article</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to="/galleries/create" className="col-sm-4 col-md-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <div className="d-flex align-items-center flex-column">
                                    <div className="flex-shrink-0 my-3">
                                        <div className="action-avatar-bg text-white rounded-circle d-flex align-items-center justify-content-center avatar-xxl">
                                            <i className="fas fa-images fa-5x"></i>
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <h4 className="text-center m-0">Create Photo Gallery</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to="/videos/create" className="col-sm-4 col-md-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <div className="d-flex align-items-center flex-column">
                                    <div className="flex-shrink-0 my-3">
                                        <div className="action-avatar-bg text-white rounded-circle d-flex align-items-center justify-content-center avatar-xxl">
                                            <i className="fas fa-video fa-5x"></i>
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <h4 className="text-center m-0">Create Video</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="clearfix"></div>
                </div>

                <div className="page-title">
                    <h4 className="m-0">Recently Created Content</h4>
                </div>

                <div className="row col-12">
                    <div>
                        <div className="x_panel">
                            <div className="x_title">
                                <h4>Latest Content</h4>
                            </div>
                            <div className="x_content border-bottom border-2">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card-box table-responsive">
                                            <DataTable
                                                id="datatable-responsive"
                                                columns={columns}
                                                data={latestContent}
                                                highlightOnHover
                                                striped
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* Delete Content Modal */}
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered size="sm">
            <Modal.Header closeButton>
                <h5>Delete Article</h5>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete the article:{" "}
                <strong>{selectedContent?.title}</strong>?
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" onClick={handleCloseDeleteModal} >Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleDeleteContent} disabled={isDeleting} >{isDeleting ? "loading..." : "Delete"}</button>
            </Modal.Footer>
        </Modal>
        </>
    )
}