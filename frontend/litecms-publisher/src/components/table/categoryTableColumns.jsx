export function categoryTableColumns({ handleOpenEditModal, handleOpenDeleteModal }) {
    return [
        { name: "Category", selector: category => category.name, wrap: true},
        { 
            name: "Actions",
            center: true,
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
            width: "225px"
        },
    ];
}