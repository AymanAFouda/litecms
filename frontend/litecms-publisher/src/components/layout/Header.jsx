import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"

export function Header({ isMenuExpanded , setIsMenuExpanded }) {

    const [isClicked, setIsClicked] = useState(false)
    const modalRef = useRef(null);

    useEffect(() => {
        const handleGlobalClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsClicked(false);
            }
        };

        document.body.addEventListener('click', handleGlobalClick);

        return () => {
            document.body.removeEventListener('click', handleGlobalClick);
        };
    }, []);

    const handleNavbarDropdown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsClicked((prev) => !prev)
    }

    const handleMenuToggleBtn = (e) => {
        e.preventDefault();
        setIsMenuExpanded((prev) => !prev)
    }

    return(
        <div className="top_nav">
            <div className="nav_menu d-flex align-items-center justify-content-between">
                <div className="nav toggle">
                    <a id="menu_toggle" onClick={handleMenuToggleBtn}>
                        <i className="fas fa-bars"></i>
                    </a>
                </div>
                <nav id="header-nav" className="nav navbar-nav ms-auto">
                    <ul className="navbar-right d-flex align-items-center gap-3 pe-3">
                        <li className="nav-item dropdown">
                            <a href="#" role="button" className={`user-profile dropdown-toggle ${isClicked? "show" : ""} `} aria-haspopup="true" 
                              id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded={isClicked? "true" : "false"} onClick={handleNavbarDropdown}>
                                <img src="/images/user.png" alt="User Image"/>John Doe
                            </a>
                            <div ref={modalRef} className={`${isClicked? "show visible-dropdown-menu" : ""} dropdown-menu dropdown-menu-end dropdown-usermenu dropdown-menu-sm`} aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item"  to="/profile" role="button"> Profile </Link>
                                <Link className="dropdown-item"  to="/login"><i className="fas fa-sign-out-alt float-end"></i> Log Out </Link>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}