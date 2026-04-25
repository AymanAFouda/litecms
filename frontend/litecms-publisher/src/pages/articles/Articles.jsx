import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import toast from 'react-hot-toast';

import DataTable from "react-data-table-component"
import { Modal } from 'react-bootstrap'
import { LoadingSpinner } from '../../components/common/LoadingSpinner'
import { LoadError } from "../../components/common/LoadError"
import { contentColumns } from "../../components/table/contentColumns"

import { deleteArticle } from "../../services/articleApi"
import { useContents } from "../../hooks/useContents"

export function Articles() {
    const { contents: articles, setContents: setArticles , isLoading, loadError} = useContents('articles')
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        document.title = "Articles - LiteCMS"
    }, [])


    const handleOpenDeleteModal = (article) => {
        setSelectedArticle(article)
        setShowDeleteModal(true)
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
        setSelectedArticle(null)  
    }

    const handleDeleteArticle = async () => {
        if (!selectedArticle) {
            return;
        }

        setIsDeleting(true)
        try {
            await deleteArticle(selectedArticle.contentId)
            setArticles(articles.filter((item) => item.contentId !== selectedArticle.contentId));
        } catch(er) {
            toast.error("Failed to delete Article")
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
                    <h3>Articles</h3>
                </div>
            </div>
            <div className="clearfix"></div>

            <div className="row">
                <div className="col-sm-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h4>Articles</h4>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content border-bottom border-2">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card-box table-responsive">
                                        <DataTable
                                            id="datatable-responsive"
                                            columns={columns}
                                            data={articles}
                                            pagination
                                            highlightOnHover 
                                            striped
                                            paginationPerPage={10}
                                            paginationRowsPerPageOptions={[10, 20, 50, 100]} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="x_content">
                            <div className="buttons d-inline-block">
                                <Link to="create">
                                    <button type="button" className="btn btn-success btn-lg d-flex align-items-center">
                                        Create Article
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

    {/* Delete Article Modal */}
    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered size="sm">
        <Modal.Header closeButton>
            <h5>Delete Article</h5>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete the article:{" "}
            <strong>{selectedArticle?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={handleCloseDeleteModal} >Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleDeleteArticle} disabled={isDeleting} >{isDeleting ? "loading..." : "Delete"}</button>
        </Modal.Footer>
    </Modal>
    </>
    )
}