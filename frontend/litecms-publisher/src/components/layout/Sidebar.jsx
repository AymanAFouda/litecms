import { SidebarItem } from "./SidebarItem";
import { Link } from 'react-router-dom'

export function Sidebar({ isMenuExpanded }) {

    const menuItems = [
        { label: "Home", iconClass: "bi bi-house", to: "/" },
        { label: "Articles", iconClass: "bi bi-file-earmark-text", to: "/articles" },
        { label: "Photo Galleries", iconClass: "bi bi-images", to: "/galleries" },
        { label: "Videos", iconClass: "bi bi-camera-video", to: "/videos" },
        { label: "Categories", iconClass: "bi bi-list-task", to: "/categories" },
        { label: "Sign out", iconClass: "bi bi-box-arrow-right", to: "/login" },
    ];

    return(
         <div className="main_container">
            <aside className="col-md-3 left_col" aria-label="Sidebar navigation">
                <div className="left_col scroll-view">
                    <div className="navbar nav_title border-0">
                        <Link to={"/"} className="site_title d-flex justify-content-center align-items-end">
                            <img src="/images/logo.png" alt="LiteCMS" className="logo-full logo-main"/>
                            <img src="/images/logo-icon.png" alt="Icon" className="logo-icon"/>
                        </Link>
                    </div>
                    <div className="clearfix"></div>

                    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu mt-3">
                        <div className="menu_section">
                            <ul className="nav side-menu">
                                {menuItems.map((item, idx) => (
                                    <SidebarItem
                                        key={idx}
                                        label={item.label}
                                        iconClass={item.iconClass}
                                        to={item.to}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    )
}