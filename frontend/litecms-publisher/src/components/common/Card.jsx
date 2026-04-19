export function Card({ title, value, icon, backgroundColor }) {

    return (
        <div className="col-xl-2 col-md-4 col-sm-6">
            <div className="card shadow-sm h-100">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-3">
                            <div className={`${backgroundColor} text-white rounded-circle d-flex align-items-center justify-content-center avatar-lg`}>
                                <i className={`fas ${icon} fs-4`}></i>
                            </div>
                        </div>
                        <div className="flex-grow-1">
                            <h6 className="text-muted text-uppercase mb-1 small">{title}</h6>
                            <h4 className="mb-0">{value}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}