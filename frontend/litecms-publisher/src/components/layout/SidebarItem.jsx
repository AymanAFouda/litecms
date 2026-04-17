import { Link, useLocation } from "react-router-dom";
import { clearPublisherAuth } from "../../utils/publisherAuth";

export function SidebarItem({ label, iconClass, to }) {
  const location = useLocation();
  const firstPart = location.pathname.split("/")[1]; // get first path segment

  const isActive = firstPart.toLowerCase() === to.replace("/", "").toLowerCase();

  function handleLogout() {
    clearPublisherAuth();
    navigate("/login", { replace: true });
  }

  if(label === "Sign out") {
    return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} onClick={handleLogout}>
          <i className={iconClass}></i> 
          {label}
      </Link>
    </li>
  );
  }

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}>
          <i className={iconClass}></i> 
          {label}
      </Link>
    </li>
  );
}