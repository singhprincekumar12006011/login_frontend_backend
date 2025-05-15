import React, { useState } from "react";
import logo from "./logo1.png";

function Footer() {
  // States for interactive elements
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [emailValue, setEmailValue] = useState("");
  const [subscribeHovered, setSubscribeHovered] = useState(false);

  // Company information
  const companyInfo = {
    name: "Prince Kumar",
    tagline: "Professional solutions for modern businesses",
    address: "Netaji Subhash Place, Delhi",
    city: "Delhi",
    email: "jenis@superlativesolutions.org",
    phone: "+91 7428 698 673",
  };

  // Footer background gradient - matches header style
  const footerStyle = {
    backgroundColor: "rgba(1, 1, 26, 1)",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  };

  // Section title style
  const sectionTitleStyle = {
    position: "relative",
    paddingBottom: "12px",
    marginBottom: "20px",
    display: "inline-block",
  };

  const titleUnderlineStyle = {
    content: '""',
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "40px",
    height: "2px",
    backgroundColor: "#4dc4ff",
  };

  // Social media icons
  const socialMedia = [
    { name: "Facebook", icon: "facebook", url: "#" },
    { name: "Twitter", icon: "twitter", url: "#" },
    { name: "LinkedIn", icon: "linkedin", url: "#" },
    { name: "Instagram", icon: "instagram", url: "#" },
  ];

  // Quick links for navigation
  const quickLinks = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
    { name: "Services", url: "/services" },
    { name: "Employee Portal", url: "/employee" },
    { name: "Contact", url: "/contact" },
  ];

  // Links for services
  const serviceLinks = [
    { name: "HR Management", url: "#hr" },
    { name: "Recruitment", url: "#recruitment" },
    { name: "Employee Training", url: "#training" },
    { name: "Performance Reviews", url: "#performance" },
    { name: "Payroll Services", url: "#payroll" },
  ];

  // Social icon component with hover effect
  const SocialIcon = ({ icon, name, url }) => {
    const isHovered = hoveredSocial === name;

    return (
      <a
        href={url}
        className="text-decoration-none me-3"
        onMouseEnter={() => setHoveredSocial(name)}
        onMouseLeave={() => setHoveredSocial(null)}
      >
        <div
          className="d-flex align-items-center justify-content-center rounded-circle"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: isHovered ? "#4dc4ff" : "rgba(255, 255, 255, 0.1)",
            color: isHovered ? "#01011a" : "#ffffff",
            transition: "all 0.3s ease",
            transform: isHovered ? "translateY(-3px)" : "translateY(0)",
          }}
        >
          <i className={`bi bi-${icon}`}></i>
        </div>
      </a>
    );
  };

  // Link item component with hover effect
  const LinkItem = ({ name, url }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <li className="mb-2">
        <a
          href={url}
          className="text-decoration-none text-white-50"
          style={{
            transition: "all 0.2s ease",
            paddingLeft: isHovered ? "5px" : "0",
            color: isHovered ? "#4dc4ff" : "",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <i
            className="bi bi-chevron-right me-1"
            style={{
              fontSize: "10px",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          ></i>
          {name}
        </a>
      </li>
    );
  };

  // Handle subscribe click
  const handleSubscribeClick = () => {
    if (emailValue.trim() !== "" && emailValue.includes("@")) {
      alert(`Thank you for subscribing with: ${emailValue}`);
      setEmailValue("");
    } else {
      alert("Please enter a valid email address");
    }
  };

  return (
    <footer style={footerStyle} className="text-white">
      <div className="bg-secondary">
        <div
          style={{ height: "3px" }}
          className="container bg-white rounded-circle"
        ></div>
      </div>
      <div className="container pt-5">
        {/* Main Footer Content */}
        <div className="row gy-4">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6">
            <a href="/">
            <img src={logo} alt="Logo"  style={{
                width: "350px",
                marginLeft: '-25px',
                marginTop: '-20px'
              }}/>
            </a>
            <p className="text-white-50 mb-4">{companyInfo.tagline}</p>

            <div className="mb-4">
              <p className="mb-1 d-flex align-items-start">
                <i className="bi bi-geo-alt-fill me-2 text-info"></i>
                <span>
                  {companyInfo.address}
                  <br />
                  {companyInfo.city}
                </span>
              </p>
              <p className="mb-1 d-flex align-items-center">
                <i className="bi bi-envelope-fill me-2 text-info"></i>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-white-50 text-decoration-none hover-blue"
                >
                  {companyInfo.email}
                </a>
              </p>
              <p className="mb-3 d-flex align-items-center">
                <i className="bi bi-telephone-fill me-2 text-info"></i>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="text-white-50 text-decoration-none hover-blue"
                >
                  {companyInfo.phone}
                </a>
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="d-flex">
              {socialMedia.map((social) => (
                <SocialIcon key={social.name} {...social} />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 style={sectionTitleStyle}>
              Quick Links
              <div style={titleUnderlineStyle}></div>
            </h5>
            <ul className="list-unstyled">
              {quickLinks.map((link) => (
                <LinkItem key={link.name} {...link} />
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 style={sectionTitleStyle}>
              Services
              <div style={titleUnderlineStyle}></div>
            </h5>
            <ul className="list-unstyled">
              {serviceLinks.map((link) => (
                <LinkItem key={link.name} {...link} />
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h5 style={sectionTitleStyle}>
              Newsletter
              <div style={titleUnderlineStyle}></div>
            </h5>
            <p className="text-white-50">
              Subscribe to our newsletter to receive updates and news.
            </p>

            <div className="mt-3">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  style={{
                    backgroundColor: "rgb(236, 231, 231)",
                    border: "1px solid rgba(228, 228, 157, 0.93)",
                    color: "white",
                  }}
                />
                <button
                  className="btn"
                  onClick={handleSubscribeClick}
                  style={{
                    backgroundColor: subscribeHovered
                      ? "#4dc4ff"
                      : "rgba(77, 196, 255, 0.2)",
                    border: "1px solid #4dc4ff",
                    color: subscribeHovered ? "#01011a" : "#ffffff",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={() => setSubscribeHovered(true)}
                  onMouseLeave={() => setSubscribeHovered(false)}
                >
                  Subscribe
                </button>
              </div>
            </div>

            
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="border-top border-secondary py-4">
              <div className="row align-items-center">
                <div className="col-md-6 text-center text-md-start">
                  <p className="mb-0 text-white-50">
                    © {new Date().getFullYear()} {companyInfo.name}. All rights
                    reserved.
                  </p>
                </div>
                <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
                  <div className="d-flex justify-content-center justify-content-md-end">
                    <a
                      href="#"
                      className="text-white-50 text-decoration-none mx-2"
                    >
                      Privacy Policy
                    </a>
                    <span className="text-white-50">|</span>
                    <a
                      href="#"
                      className="text-white-50 text-decoration-none mx-2"
                    >
                      Terms of Service
                    </a>
                    <span className="text-white-50">|</span>
                    <a
                      href="#"
                      className="text-white-50 text-decoration-none mx-2"
                    >
                      Sitemap
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
