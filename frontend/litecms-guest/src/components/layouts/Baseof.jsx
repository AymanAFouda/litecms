import config from "../../config/config.json";
import { plainify } from "../../utils/textConverter";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import { useLocation } from "react-router-dom";
import { useEffect } from "react"; 
import { Outlet } from "react-router-dom";

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
