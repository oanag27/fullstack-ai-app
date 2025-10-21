import { useAuth } from "pages/auth/context/AuthContext";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

const MenuButton: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent p-3">
      <div className="container-fluid">
        <div
          className="collapse navbar-collapse justify-content-end fs-5"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                to="/dashboard"
                className={`nav-link text-white ${
                  location.pathname === "/dashboard" ? "active" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/trips"
                className={`nav-link text-white ${
                  location.pathname === "/trips" ? "active" : ""
                }`}
              >
                Trips
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/worldMap"
                className={`nav-link text-white ${
                  location.pathname === "/worldMap" ? "active" : ""
                }`}
              >
                World Map
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/feedback"
                className={`nav-link text-white ${
                  location.pathname === "/feedback" ? "active" : ""
                }`}
              >
                Feedback
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button
                type="button"
                className="btn btn-link nav-link dropdown-toggle"
                style={{
                  border: "none",
                  color: "white",
                  backgroundColor: "transparent",
                }}
                onClick={toggleDropdown}
              ></button>
              <div
                className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
                style={{
                  width: "50px",
                  marginTop: "10px",
                  marginLeft: "-130px",
                  backgroundColor: "black",
                  borderColor: "white",
                }}
              >
                <button
                  className="dropdown-item text-white bg-transparent fs-5"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MenuButton;
