import React, { useCallback, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/img/logo/header_logo.png";
import { PrimaryButton } from "../styles.jsx";
import { AppContext } from "../context.jsx";
import "./header.css";

const Header = () => {
  const { currentUser } = useContext(AppContext);
  const [openNav, setOpenNav] = useState(false);
  const [openCustomerSelection, setOpenCustomerSelection] = useState(false);

  const handleKeyDown = useCallback((event) => {
    if (event.key === "Escape") setOpenCustomerSelection(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <header>
      <div className="header_container">
        <Link to="/" tabIndex={1} className="primary_color">
          <div className="d-flex align-items-center">
            <div className="logo_container">
              <img className="logo" src={logo} alt="KowMart logo" />
            </div>
            <h2> KowMart </h2>
          </div>
        </Link>

        {/* Mobile Nav */}
        <div className={`sidenav ${openNav ? "show" : "hide"}`}>
          <div className="d-flex flex-column align-items-start row-gap-3 ps-4 py-3">
            <Link
              to="/"
              onClick={() => setOpenNav(false)}
              tabIndex={-1}
              className="primary_color"
            >
              Cattles
            </Link>
            {currentUser && (
              <>
                <Link
                  to="/"
                  onClick={() => setOpenNav(false)}
                  tabIndex={-1}
                  className="primary_color"
                >
                  Notification
                </Link>
                {currentUser.type === "customer" && (
                  <Link to="/sell" onClick={() => setOpenNav(false)} tabIndex={-1}>
                    <PrimaryButton tabIndex={-1}>SELL</PrimaryButton>
                  </Link>
                )}
                <Link
                  to="/profile"
                  onClick={() => setOpenNav(false)}
                  tabIndex={-1}
                >
                  <i
                    className="fa-regular fa-user primary_color fs-5 mt-1"
                    aria-label="Profile"
                    role="img"
                  ></i>
                </Link>
              </>
            )}
            <Link
              to="/about_us"
              onClick={() => setOpenNav(false)}
              tabIndex={-1}
              className="primary_color"
            >
              About Us
            </Link>
            {!currentUser && (
              <PrimaryButton
                tabIndex={-1}
                onClick={() => {
                  setOpenCustomerSelection(true);
                  setOpenNav(false);
                }}
              >
                LOGIN
              </PrimaryButton>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        <button
          className="nav_icons_container border-0 bg-transparent p-0"
          onClick={() => setOpenNav(!openNav)}
          aria-label={
            openNav ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={openNav}
        >
          <i
            className={`fa-solid ${
              openNav ? "fa-xmark" : "fa-bars"
            } nav_togglers`}
          />
        </button>

        {/* Desktop Nav */}
        <div className="d-flex column-gap-5 nav_links_container">
          <Link to="/" tabIndex={2} className="primary_color">
            Cattles
          </Link>
          {currentUser && (
            <Link to="/" tabIndex={3} className="primary_color">
              Notification
            </Link>
          )}
          <Link to="/about_us" tabIndex={3} className="primary_color">
            About Us
          </Link>
        </div>

        <div className="d-flex align-items-center column-gap-3 nav_links_container">
          {currentUser ? (
            <>
              {currentUser.type === "customer" && (
                <Link to="/sell" tabIndex={4}>
                  <PrimaryButton tabIndex={-1}>SELL</PrimaryButton>
                </Link>
              )}
              <Link to="/profile" tabIndex={5}>
                <i
                  className="fa-regular fa-user primary_color fs-5 mt-1"
                  aria-label="Profile"
                  role="img"
                ></i>
              </Link>
            </>
          ) : (
            <PrimaryButton
              tabIndex={4}
              onClick={() => setOpenCustomerSelection(true)}
            >
              LOGIN
            </PrimaryButton>
          )}
        </div>
      </div>

      {/* Login Overlay */}
      <div
        className={`overlay ${openCustomerSelection ? "show_overlay" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Select user type for login"
      >
        <button
          className="closebtn border-0 bg-transparent p-0"
          onClick={() => setOpenCustomerSelection(false)}
          title="close"
          aria-label="Close user selection for login"
        >
          ×
        </button>
        <div className="overlay_content">
          <Link to="login?user=customer">
            <div className="type_container"> Customer </div>
          </Link>
          <Link to="login?user=rep">
            <div className="type_container"> Rep </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
