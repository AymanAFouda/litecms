import { Link, useNavigate } from "react-router-dom"
import { clearPublisherAuth } from "../../utils/publisherAuth"

export function Header({ setIsMenuExpanded }) {
    const handleMenuToggleBtn = (e) => {
        e.preventDefault();
        setIsMenuExpanded((prev) => !prev)
    }

    function handleLogout() {
        clearPublisherAuth();
        navigate("/login", { replace: true });
    }

    return(
        <div className="top_nav">
            <div className="nav_menu d-flex align-items-center justify-content-between">
                <div className="nav toggle">
                    <Link id="menu_toggle" onClick={handleMenuToggleBtn}>
                        <i className="fas fa-bars"></i>
                    </Link>
                </div>
                <nav id="header-nav" className="nav navbar-nav ms-auto">
                    <ul className="navbar-right d-flex align-items-center gap-3 pe-3">
                        <li className="nav-item">
                            <Link to="/login" role="button" className="d-flex align-items-center justify-center" onClick={handleLogout}>
                                <span className="fs-6">Sign out</span> 
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}