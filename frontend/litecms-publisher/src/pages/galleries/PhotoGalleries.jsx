import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import toast from 'react-hot-toast';

import DataTable from "react-data-table-component"
import { Modal } from 'react-bootstrap'
import { LoadingSpinner } from '../../components/common/LoadingSpinner'
import { LoadError } from "../../components/common/LoadError"
import { contentColumns } from "../../components/table/contentColumns"

import { deleteGallery } from "../../services/galleryApi"
import { useContents } from "../../hooks/useContents"
import { useResponsivePageSize } from "../../hooks/useResponsivePageSize"

export function PhotoGalleries() {
    const { contents: photoGalleries, setContents: setPhotoGalleries , isLoading, loadError} = useContents('galleries')
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedPhotoGallery, setSelectedPhotoGallery] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        document.title = "Photo Galleries - LiteCMS"
    }, [])

    const itemsPerPage = useResponsivePageSize({
        mobile: 5,
        desktop: 10
    });

    const filteredPhotoGalleries = photoGalleries.filter((gallery) => 
        gallery.title.toLowerCase().includes(searchInput.toLowerCase()
        )
    );

    const handleOpenDeleteModal = (gallery) => {
        setSelectedPhotoGallery(gallery)
        setShowDeleteModal(true)
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
        setSelectedPhotoGallery(null)  
    }

    const handleDeletePhotoGallery = async () => {
        if (!selectedPhotoGallery) {
            return;
        }

        setIsDeleting(true)
        try {
            await deleteGallery(selectedPhotoGallery.contentId)
            setPhotoGalleries(photoGalleries.filter((item) => item.contentId !== selectedPhotoGallery.contentId));
        } catch(er) {
            console.log(er)
            toast.error("Failed to delete Photo Gallery")
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
                    <h3>Photo Galleries</h3>
                </div>
            </div>
            <div className="clearfix"></div>

            <div className="row">
                <div className="col-sm-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h4>Photo Galleries</h4>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content border-bottom border-2">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card-box table-responsive">
                                        <DataTable
                                            id="datatable-responsive"
                                            columns={columns}
                                            data={filteredPhotoGalleries}
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
                                        Create Photo Gallery
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

    {/* Delete Photo Gallery Modal */}
    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered size="sm">
        <Modal.Header closeButton>
            <h5>Delete Photo Gallery</h5>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete the photo gallery:{" "}
            <strong>{selectedPhotoGallery?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={handleCloseDeleteModal} >Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleDeletePhotoGallery} disabled={isDeleting} >{isDeleting ? "loading..." : "Delete"}</button>
        </Modal.Footer>
    </Modal>
    </>
    )
}