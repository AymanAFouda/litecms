import DataTable from "react-data-table-component"
import { useEffect, useState } from "react"
import { Modal } from 'react-bootstrap'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { Link } from "react-router-dom"
import { getArticles, deleteArticle } from "../api"


export function Articles() {
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false);
    const [articles, setArticles] = useState([])
    const [selectedArticle, setSelectedArticle] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        handleResize()
        loadArticles()
    }, [])

    const loadArticles = async () => {
        setIsLoading(true)
        
        try {
            const data = await getArticles()
            setArticles(data)
        } catch (error) {
            toast.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const filteredArticles = articles.filter((article) => 
        article.title.toLowerCase().includes(searchInput.toLowerCase()
        )
    );

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setItemsPerPage(5);
        } else {
            setItemsPerPage(10);
        }
    }

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
            await deleteArticle(selectedArticle.id)
            setArticles(articles.filter((item) => item.id !== selectedArticle.id));
        } catch(error) {
            toast.error(error)
        } finally {
            handleCloseDeleteModal();
            setIsDeleting(false)
        }
    }


    const statusColorMap = {
        DRAFT: "bg-secondary",
        PUBLISHED: "bg-success",
        ARCHIVED: "bg-info",
    };

    const columns = [
        { name: "Title", selector: article => article.title, sortable: true, wrap: true},
        { name: "Category", selector: article => article.category.name, sortable: true, wrap: true, width: "120px"},
        { name: "Create at", selector: article => article.createAt, sortable: true, wrap: true, width: "120px"},
        { name: "Views", selector: article => article.viewCount, sortable: true, width: "100px"},
        { name: "Likes", selector: article => article.likeCount, sortable: true, width: "100px"},
        { 
            name: "Status", 
            cell: article => (
                <span className={`badge ${statusColorMap[article.status]}`}>{article.status}</span>
            ),
            selector: article => article.status,
            sortable: true,
            width: "110px"
        },
        { 
            name: "Actions", 
            cell: article => (
                <div className="d-flex gap-2" >
                    <Link to={`edit/${article.id}`}> 
                        <button className="btn btn-success m-0 me-2" type="button" >
                            <i className="bi bi-pencil-square me-2"></i>Edit
                        </button>
                    </Link>
                    <button className="btn btn-danger m-0" type="button" onClick={() => handleOpenDeleteModal(article)}>
                        <i className="bi bi-trash me-2"></i>Delete
                    </button>
                </div>
            ),

            width: "223px"
        },
    ];

    if(isLoading) {
        return (
            <main className="spinner-container right_col d-flex justify-content-center align-items-center pt-0" role="main" aria-label="Main content">
                <LoadingSpinner size='lg' />
            </main>
        )
    }

    return(
    <>
    <title>Articles - LiteCMS</title>
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
                            <h4>Articles</h4>
                            <div className="col-md-4 col-sm-6 ">
                                <div className="input-group">
                                    <input
                                        type="text" 
                                        className="form-control" 
                                        id="search" 
                                        placeholder="Search article title" 
                                        aria-label="search"
                                        value={searchInput}
                                        onChange={
                                            (e) => {setSearchInput(e.target.value)} 
                                    }/>
                                    <span className="input-group-text"><i className="fas fa-search" aria-hidden="true"></i></span>
                                </div>
							</div>
                            
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content border-bottom border-2">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <div className="card-box table-responsive">
                                        <DataTable
                                            id="datatable-responsive"
                                            columns={columns}
                                            data={filteredArticles}
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
                            <div className="buttons">
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

