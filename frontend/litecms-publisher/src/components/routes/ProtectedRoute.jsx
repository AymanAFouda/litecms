import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isPublisherLoggedIn } from "../../utils/publisherAuth";

export function ProtectedRoute() {
  const location = useLocation();

  if (!isPublisherLoggedIn()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}