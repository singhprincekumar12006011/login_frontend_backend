import React from "react";
import logo from './logo1.png';

function Header() {

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  return (
    <div>
      <nav
        className="navbar navbar-expand-md navbar-dark " 
        style={{
          background: "linear-gradient(135deg,rgb(15, 15, 15) 0%,rgb(4, 90, 124) 100%)"
        }}
      >
        <div className="container-fluid px-5 ">
          <a className="navbar-brand " href="/">
          <span><img src={logo} alt="Company Logo" style={{ width: isMobile ? '150px' : '250px', marginBottom: '-20px', marginLeft: isMobile ? '-40px' : '0'}}  /></span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Nav Menu */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center gap-3" style={{
                  // fontFamily: 'Times New Roman, Times, serif'
                  fontFamily: 'serif',
                  fontSize: '16px'
                }}>
              <li className="nav-item " >
                <a className="nav-link text-white" href="/">
                <span className=" " >Home</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/about"><span className="">About</span></a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="">Career</span>
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/apply">Apply</a></li>
                  <li><a className="dropdown-item" href="/job">Jobs</a></li>
                  <li><a className="dropdown-item" href="#">View All</a></li>
                  <li><a className="dropdown-item" href="#">Attendance</a></li>
                  <li><a className="dropdown-item" href="#">Leave</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/dashboard"><span className="">Dashboard</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/profile"><span className="">Profile</span></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
