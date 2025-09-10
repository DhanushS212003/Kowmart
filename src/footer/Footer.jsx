import React from "react";
import logo from "../assets/img/logo/footer_logo.png";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer_section">
      <footer role="contentinfo">
        <div className="footer_container">
          <div className="left_section">
            <img className="footer_logo" src={logo} alt="Kowmart Footer logo" />
            <p className="footer_content">
              Kowmart.com is an online marketplace established with the aim to
              strengthen Livestock Economy of the country. It helps livestock
              enterprises/self-employed/individuals to achieve their full
              potential while ensuring livestock wellbeing.
            </p>
          </div>

          <div className="right_section">
            <h5>CONNECT WITH US</h5>
            <p className="footer_com_info">
              Email:{" "}
              <a href="mailto:info@kowmart.com" className="fw-bold text-white">
                info@kowmart.com
              </a>
            </p>
            <p className="footer_com_info">
              Ph.no:{" "}
              <a href="tel:1234567890" className="fw-bold text-white">
                1234567890
              </a>
            </p>
            <address className="footer_com_info lh-base">
              Address: <span className="fw-bold"> Chennai, India </span>
            </address>
            <div className="com_icons">
              <a
                href="https://facebook.com"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook fs-5"></i>
              </a>
              <a
                href="https://wa.me/1234567890"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp fs-5"></i>
              </a>
              <a
                href="https://instagram.com"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
