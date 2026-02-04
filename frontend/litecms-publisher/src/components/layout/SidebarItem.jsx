import { Link, useLocation } from "react-router-dom";

export function SidebarItem({ label, iconClass, to }) {
  const location = useLocation();
  const firstPart = location.pathname.split("/")[1]; // get first path segment

  const isActive = firstPart.toLowerCase() === to.replace("/", "").toLowerCase();

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}>
            <i className={iconClass}></i> 
            {label}
      </Link>
    </li>
  );
}