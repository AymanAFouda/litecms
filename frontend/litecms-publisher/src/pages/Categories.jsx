import DataTable from "react-data-table-component"
import { getCategories, updateCategory, deleteCategory } from '../api'
import { useEffect, useState } from "react"
import { Modal } from 'react-bootstrap'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { Link } from "react-router-dom"

export function Categories() {
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false);
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categoryName, setCategoryName] = useState("");
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    useEffect(() => {
        handleResize()
        loadCategories()
    }, [])

    const loadCategories = async () => {
        setIsLoading(true)
        
        try {
            const data = await getCategories()
            setCategories(data)
        } catch (error) {
            toast.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setItemsPerPage(5);
        } else {
            setItemsPerPage(10);
        }
    }

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
                categories.map( (cat) => (
                    cat.id === selectedCategory.id ? updatedCategory : cat
                ))
            )
        } catch(error) {
            toast.error(error)
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
            setCategories(categories.filter((item) => item.id !== selectedCategory.id));
        } catch(error) {
            toast.error(error)
        } finally {
            handleCloseDeleteModal();
            setIsDeleting(false)
        }
    }

    const columns = [
        { name: "Category", selector: category => category.name, sortable: true, wrap: true},
        { 
            name: "Actions", 
            cell: category => (
                <div className="d-flex gap-2" >
                    <button className="btn btn-success m-0 me-2" type="button" onClick={() => handleOpenEditModal(category)}>
                        <i className="bi bi-pencil-square me-2"></i>Edit
                    </button>
                    <button className="btn btn-danger m-0" type="button" onClick={() => handleOpenDeleteModal(category)}>
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
    <title>Categories - LiteCMS</title>
    <main className="right_col" role="main" aria-label="Main content">
        <div className="">
            <div className="page-title">
                <div className="title_left">
                    <h3>Categories</h3>
                </div>
            </div>
            <div className="clearfix"></div>

            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h4>Categories</h4>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content border-bottom border-2">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <div className="card-box table-responsive">
                                        <DataTable
                                            id="datatable-responsive"
                                            columns={columns}
                                            data={categories}
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

    {/* Edit Category Modal */}
    <Modal show={showEditModal} onHide={handleCloseEditModal} centered >
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
                    <div className="invalid-feedback">
                        minimum 2 characters
                    </div>
                </div>
                <div className="col-md-12 mt-4 d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={handleCloseEditModal} >Cancel</button>
                    <button type="submit" className="btn btn-primary" >Edit</button>
                </div>
            </form>
        </Modal.Body>
    </Modal>
    
    {/* Delete Category Modal */}
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