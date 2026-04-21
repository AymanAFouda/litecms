import { useEffect } from "react"; 
import { useLocation, Outlet } from "react-router-dom";
import Footer from "../partials/Footer";
import Header from "../partials/Header";

const Base = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div >
      <Header currentPath={path} />
      {/* main site */}
      <main className="min-h-[50vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Base;
