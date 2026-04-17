import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import toast from 'react-hot-toast';

import DataTable from "react-data-table-component"
import { LoadingSpinner } from '../../components/common/LoadingSpinner'
import { LoadError } from "../../components/common/LoadError"
import { contentColumns } from "../../components/table/contentColumns"
import { Modal } from 'react-bootstrap'

import { deleteVideo } from "../../services/videoApi"
import { useContents } from "../../hooks/useContents"
import { useResponsivePageSize } from "../../hooks/useResponsivePageSize"

export function Videos() {
    const { contents: videos, setContents: setVideos , isLoading, loadError} = useContents('videos')
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        document.title = "Videos - LiteCMS"
    }, [])

    const itemsPerPage = useResponsivePageSize({
        mobile: 5,
        desktop: 10
    });

    const filteredVideos = videos.filter((video) => 
        video.title.toLowerCase().includes(searchInput.toLowerCase()
        )
    );

    const handleOpenDeleteModal = (video) => {
        setSelectedVideo(video)
        setShowDeleteModal(true)
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
        setSelectedVideo(null)  
    }

    const handleDeleteVideo = async () => {
        if (!selectedVideo) {
            return;
        }

        setIsDeleting(true)
        try {
            await deleteVideo(selectedVideo.contentId)
            setVideos(videos.filter((item) => item.contentId !== selectedVideo.contentId));
        } catch(er) {
            console.log(er)
            toast.error("Failed to delete Video")
        } finally {
            handleCloseDeleteModal();
            setIsDeleting(false)
        }
    }

    const columns = contentColumns({ onDelete: handleOpenDeleteModal })

    if(isLoading) { return <LoadingSpinner /> }

    if(loadError) { return <LoadError message="Failed to load Page" /> }

    return(
    <>
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
                            <h4>Videos</h4>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content border-bottom border-2">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card-box table-responsive">
                                        <DataTable
                                            id="datatable-responsive"
                                            columns={columns}
                                            data={filteredVideos}
                                            pagination
                                            highlightOnHover 
                                            striped
                                            paginationPerPage={itemsPerPage}
                                            paginationRowsPerPageOptions={[5, 10, 20, 50, 100]} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="x_content">
                            <div className="buttons d-inline-block">
                                <Link to="create">
                                    <button type="button" className="btn btn-success btn-lg d-flex align-items-center">
                                        Create Video
                                        <i className="bi bi-arrow-right ms-3"></i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered size="sm">
        <Modal.Header closeButton>
            <h5>Delete VIdeo</h5>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete the video:{" "}
            <strong>{selectedVideo?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={handleCloseDeleteModal} >Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleDeleteVideo} disabled={isDeleting} >{isDeleting ? "loading..." : "Delete"}</button>
        </Modal.Footer>
    </Modal>
    </>
    )
}