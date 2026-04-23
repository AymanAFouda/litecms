import Logo from "../common/Logo";
import menu from "../../config/menu.json";
import ThemeSwitcher from "../common/ThemeSwitcher";
import SearchModal from "../partials/SearchModal";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";

const Header = ({ currentPath = "/" }) => {
  // distructuring the main menu from menu object
  const { main } = menu;

  // states declaration
  const [searchModal, setSearchModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Use currentPath for active state determination
  const activePath = currentPath;

  //stop scrolling when nav is open
  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [showMenu]);

  return (
    <header className="header">
      <nav className="navbar container px-1 sm:px-8">
        <div className="order-0">
          <Logo />
        </div>
        <div className="flex items-center space-x-4 xl:space-x-8">
          <div
            className={`collapse-menu ${
              !showMenu && "translate-x-full"
            } lg:flex lg:translate-x-0`}
          >
            <button
              className="absolute right-6 top-11 text-3xl lg:hidden"
              onClick={() => setShowMenu(false)}
            >
              <IoClose />
            </button>
            <ul
              id="nav-menu"
              className="navbar-nav w-full md:w-auto md:space-x-1 lg:flex xl:space-x-2"
            >
              {main.map((menu, i) => (
                <React.Fragment key={`menu-${i}`}>
                  {menu.hasChildren ? (
                    <li className="nav-item nav-dropdown group relative">
                      <Link
                        to={menu.url}
                        className={`nav-link ${
                          menu.children
                            .map((c) => c.url)
                            .includes(activePath) && "active"
                        } inline-flex items-center`}
                      >
                        {menu.name}
                        <svg
                          className="h-4 w-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </Link>
                      <ul className="nav-dropdown-list lg:hidden transition-all duration-300 group-hover:top-[46px] group-hover:block lg:invisible lg:absolute lg:top-[60px] lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
                        {menu.children.map((child, i) => (
                          <li
                            className="nav-dropdown-item"
                            key={`children-${i}`}
                          >
                            <Link
                              to={child.url}
                              className={`nav-dropdown-link block ${
                                activePath === child.url && "active"
                              }`}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link
                        to={menu.url}
                        className={`nav-link block ${
                          activePath === menu.url && "active"
                        }`}
                      >
                        {menu.name}
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
          <ThemeSwitcher />
          {/* Header search */}
          {!activePath.includes("search") && (
            <div
              className="search-icon"
              onClick={() => {
                setSearchModal(true);
              }}
            >
              <IoSearch />
            </div>
          )}    
            
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white lg:hidden"
          >
            {showMenu ? (
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <title>Menu Close</title>
                <polygon
                  points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                  transform="rotate(45 10 10)"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <title>Menu Open</title>
                <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
              </svg>
            )}
          </button>
        </div>

        <SearchModal
          searchModal={searchModal}
          setSearchModal={setSearchModal}
        />
      </nav>
      {showMenu && (
        <div 
          className="header-backdrop absolute top-0 left-0 h-[100vh] w-full bg-black/50 lg:hidden"
          onClick={() => setShowMenu(false)}
        >
        </div>
      )}
    </header>
  );
};

export default Header;