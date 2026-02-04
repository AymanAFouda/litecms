import { Link, useNavigate } from "react-router-dom"

export function NotFound() {
    const navigate = useNavigate();

    return(
    <>
    <title>404 Not Found</title>
    <div className="error-bg">
        <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100">
            <div className="row justify-content-center w-100">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <div className="card shadow-lg border-0">
                        <div className="card-body text-center p-5">
                            <div className="text-center mb-4">
                                <div className="d-flex align-items-center justify-content-center mb-3">
                                <h2 className="h3 text-dark mb-3 fw-bold font">LiteCMS</h2>
                                </div>
                            </div>

                            <div className="mb-4">

                                <i className="fas fa-exclamation-triangle text-warning mb-3 fs-1 font-size-6"></i>
                                <h1 className="display-1 fw-bold text-primary mb-0">404</h1>
                            </div>
                            
                            <div className="mb-4">
                                <h2 className="h3 text-dark mb-3">Page Not Found</h2>
                                <p className="text-muted lead">Sorry, the page you are looking for doesn't exist or has been moved.</p>
                            </div>

                            <div className="d-grid gap-2 d-md-block mb-4">
                                <button type="button" className="btn btn-outline-secondary btn-lg" onClick={() => navigate(-1)}>
                                <i className="fas fa-arrow-left me-2"></i>Go Back
                                </button>
                                <Link to="/" className="btn btn-primary btn-lg me-md-2">
                                <i className="fas fa-home me-2"></i>Go Home
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-light opacity-75 mb-2">
                        &copy; 2026 LiteCMS - All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}