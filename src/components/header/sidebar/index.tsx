import { useState } from "react";
import { Link } from "react-router-dom";
import { useDelayUnmount } from "../../../hooks/useDelayUnmount";
import { FaTimes } from "react-icons/fa";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const shouldRenderMenu = useDelayUnmount(isMenuMounted, 500);
  const mountedStyle = "fadeIn";
  const unmountedStyle = "fadeOut";

  const toggleSidebar = () => {
    setIsOpen(true);
    if (isOpen) {
      setIsMenuMounted(!isMenuMounted);
    }
  };

  return (
    <>
      <div className="sidebar">
        <div className="toggle-btn" onClick={toggleSidebar}>
          <div className="bar">
            <img src={require("../../../assets/menu.png")} alt="Menu" />
          </div>
        </div>
        {shouldRenderMenu && isOpen && (
          <>
            <div
              onClick={() => toggleSidebar()}
              className={`modal-bg ${
                isMenuMounted ? mountedStyle : unmountedStyle
              }`}
            ></div>

            <div
              className={`sidebar-content ${
                isMenuMounted ? mountedStyle : unmountedStyle
              }`}
            >
              <div className="sidebar-header">
                <div>
                  <img
                    src={require("../../../assets/logo.png")}
                    alt="Logo"
                    className="logo"
                  />
                </div>
                <div onClick={() => toggleSidebar()}>
                  <FaTimes size={20} />
                </div>
              </div>
              <div className="sidebar-items">
                <div onClick={() => toggleSidebar()}>
                  <Link to="/">Processos</Link>
                </div>
                <div onClick={() => toggleSidebar()}>
                  <Link to="/process">Novo Processo</Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Sidebar;
