import { Link } from "react-router-dom";
import { formatDateTime, statusColorMap, contentTypeText, editButtonUrl } from "../../utils/dataTableUtils"

export function dashboardContentColumns({ onDelete }) {
    return [
        {name: "Title", selector: content => content.title, wrap: true, sortable: true},
        {name: "Content Type", selector: content => contentTypeText[content.type], width: "150px", center: true, sortable: true},
        {
            name: "Status",
            selector: content => content.status,
            width: "120px",
            center: true,
            sortable: true,
            cell: content => (
                <span className={`data-table-badge ${statusColorMap[content.status]}`}>
                    {content.status}
                </span>
            )
        },
        {name: "Created at", selector: content => formatDateTime(content.createdAt), wrap: true, width: "200px", center: true, sortable: true},
        {name: "Views", selector: content => content.viewCount, width: "120px", center: true, sortable: true},
        {name: "Likes", selector: content => content.likeCount, width: "120px", center: true, sortable: true},
        {
            name: "Actions",
            width: "250px",
            center: true,
            cell: content => (
                <div className="d-flex gap-2">
                    <Link to={`${editButtonUrl[content.type]}/edit/${content.contentId}`
                    }>
                        <button className="btn btn-success m-0 me-2" type="button">
                            <i className="bi bi-pencil-square me-2"></i>
                            Edit
                        </button>
                    </Link>

                    <button
                        className="btn btn-danger m-0"
                        type="button"
                        onClick={() => onDelete(content)}
                    >
                        <i className="bi bi-trash me-2"></i>
                        Delete
                    </button>
                </div>
            )
        }
    ];
}