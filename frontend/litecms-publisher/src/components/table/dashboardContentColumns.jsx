import { Link } from "react-router-dom";
import { formatDateTime, statusColorMap } from "../../utils/dataTableUtils"

export function dashboardContentColumns({ onDelete }) {
    return [
        {name: "Title", selector: content => content.title, wrap: true},
        {
            name: "Status",
            selector: content => content.status,
            width: "150px",
            cell: content => (
                <span className={`badge ${statusColorMap[content.status]}`}>
                    {content.status}
                </span>
            )
        },
        {name: "Type", selector: content => content.type, width: "200px"},
        {name: "Created at", selector: content => formatDateTime(content.createdAt), wrap: true, width: "200px"},
        {name: "Views", selector: content => content.viewCount, width: "120px"},
        {name: "Likes", selector: content => content.likeCount, width: "120px"},
        {
            name: "Actions",
            width: "250px",
            cell: content => (
                <div className="d-flex gap-2">
                    <Link to={`edit/${content.contentId}`}>
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