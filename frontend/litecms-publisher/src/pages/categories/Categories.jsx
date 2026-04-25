import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import toast from 'react-hot-toast';

import DataTable from "react-data-table-component"
import { Modal } from 'react-bootstrap'
import { LoadingSpinner } from '../../components/common/LoadingSpinner'
import { LoadError } from "../../components/common/LoadError";

import { useCategories } from "../../hooks/useCategories"
import { updateCategory, deleteCategory } from '../../services/categoryApi'
import { categoryTableColumns } from "../../components/table/categoryTableColumns";

export function Categories() {
    const { categories, setCategories, isLoading , loadError} = useCategories()
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categoryName, setCategoryName] = useState("");
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        document.title = "Categories - LiteCMS"
    }, [])

    const handleOpenEditModal = (category) => {
        setSelectedCategory(category)
        setCategoryName(category.name);
        setShowEditModal(true)
    }

    const handleCloseEditModal = ()=> {
        setShowEditModal(false)
        setSelectedCategory(null)
        setCategoryName("");
    }

    const handleEditCategory = async () => {
        if (!categoryName) {
            return;
        }

        try {
            const payLoad = { ...selectedCategory, name: categoryName };
            const updatedCategory = await updateCategory(payLoad)

            setCategories(
                prev => prev.map(cat =>
                    cat.id === selectedCategory.id ? updatedCategory : cat
                )
            )
            toast.success("Category Edited");
        } catch(er) {
            toast.error("Failed to edit Category")
        } finally {
            handleCloseEditModal();
        }
    }

    const handleOpenDeleteModal = (category) => {
        setSelectedCategory(category)
        setShowDeleteModal(true)
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
        setSelectedCategory(null)
    }

    const handleDeleteCategory = async () => {
        if (!selectedCategory) {
            return;
        }

        setIsDeleting(true)

        try {
            await deleteCategory(selectedCategory.id)
            setCategories(prev => prev.filter(cat => cat.id !== selectedCategory.id))
            toast.success("Category Deleted")
        } catch(er) {
            toast.error("Failed to delete Category")
        } finally {
            handleCloseDeleteModal();
            setIsDeleting(false)
        }
    }

    const columns = categoryTableColumns({ 
        handleOpenEditModal: handleOpenEditModal, 
        handleOpenDeleteModal: handleOpenDeleteModal 
    })

    if(isLoading) { return <LoadingSpinner /> }

    if(loadError) { return <LoadError message="Failed to load Page" /> }

    return(
    <>
    <main className="right_col" role="main" aria-label="Main content">
        <div className="">
            <div className="page-title">
                <div className="title_left">
                    <h3>Categories</h3>
                </div>
            </div>
            <div className="clearfix"></div>

            <div className="row">
                <div className="col-sm-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h4>Categories</h4>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content border-bottom border-2">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card-box table-responsive">
                                        <DataTable
                                            id="datatable-responsive"
                                            columns={columns}
                                            data={categories}
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
                                        Create Category
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

    <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category <strong>{selectedCategory?.name}</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={(e) => 
             {e.preventDefault(); handleEditCategory();}}>
                <div className="col-md-12">
                    <label htmlFor="categoryName" className="form-label">
                    Category Name <span className="text-danger">*</span>
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    name="categoryName"
                    required
                    minLength={2}
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)} />
                </div>
                <div className="col-md-12 mt-4 d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={handleCloseEditModal} >Cancel</button>
                    <button type="submit" className="btn btn-primary" >Edit</button>
                </div>
            </form>
        </Modal.Body>
    </Modal>
    
    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered size="sm">
        <Modal.Header closeButton>
            <h5>Delete Category</h5>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete the category{" "}
            <strong>{selectedCategory?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={handleCloseDeleteModal} >Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleDeleteCategory} disabled={isDeleting} >{isDeleting ? "loading..." : "Delete"}</button>
        </Modal.Footer>
    </Modal>
    </>
    )
}