import { useState } from "react";
import { SidebarItem } from "./SidebarItem";
import { Link } from 'react-router-dom'

export function Sidebar({ isMenuExpanded }) {

    //profile page
    const menuItems = [
        { label: "Home", iconClass: "bi bi-house", to: "/" },
        { label: "Articles", iconClass: "bi bi-file-earmark-text", to: "/articles" },
        { label: "Videos", iconClass: "bi bi-camera-video", to: "/videos" },
        { label: "Photo Galleries", iconClass: "bi bi-images", to: "/photo-galleries" },
        { label: "Categories", iconClass: "bi bi-list-task", to: "/categories" },
        { label: "Profile", iconClass: "bi bi-person-circle", to: "/profile" },
    ];

    return(
        <div className="main_container">
            <aside className="col-md-3 left_col" aria-label="Sidebar navigation">
                <div className="left_col scroll-view">
                    <div className="navbar nav_title border-0">
                        <Link to={"/"} className="site_title"><img src="images/logo.png" alt="LiteCMS" className="logo-full logo-main" loading="lazy"/><img src="images/logo-icon.png" alt="Icon" className="logo-icon" loading="lazy"/></Link>
                    </div>
                    
                    <div className="clearfix"></div>

                    <div className="profile clearfix">
                        <div className="profile_pic">
                            <img src="/images/user.png" alt="User Image" className="img-circle profile_img" loading="lazy"/>
                        </div>
                        <div className="profile_info">
                            <span>Welcome,</span>
                            <h4>User Name</h4>
                        </div>
                    </div>

                    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
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