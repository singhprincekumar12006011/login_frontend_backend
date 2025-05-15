import React, { useState } from "react";

import { 
  ChevronDown, 
  ChevronRight, 
  Home, 
  FileText, 
  BarChart2, 
  Settings, 
  User, 
  Menu, 
  X,
  FileUser
} from "lucide-react";
import { GrUserWorker } from "react-icons/gr";

// Custom CSS for additional styling
const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    backgroundColor: '#06202B',
    color: "#ecf0f1",
    paddingTop: "20px",
    position: "fixed",
    left: 0,
    top: 0,
    transition: "width 0.3s ease",
    overflow: "hidden",
    zIndex: 1000
  },
  collapsedSidebar: {
    width: "0",
    height: "100vh",
    backgroundColor: '#06202B',
    color: "#ecf0f1",
    paddingTop: "20px",
    position: "fixed",
    left: 0,
    top: 0,
    transition: "width 0.3s ease",
    overflow: "hidden",
    zIndex: 1000
  },
  navLink: {
    color: "#ecf0f1",
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    textDecoration: "none",
    cursor: "pointer"
  },
  navLinkHover: {
    backgroundColor: '#06202B',
    borderRadius: "4px"
  },
  subNavLink: {
    color: "#bdc3c7",
    padding: "8px 15px 8px 45px",
    textDecoration: "none",
    display: "block",
    cursor: "pointer"
  },
  toggleButton: {
    position: "fixed",
    top: "20px",
    left: "20px",
    zIndex: 999,
    backgroundColor: '#06202B',
    color: "#ecf0f1",
    border: "none",
    borderRadius: "4px",
    padding: "10px",
    cursor: "pointer"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 15px 20px 15px",
    borderBottom: "1px solid #34495e",
    marginBottom: "15px"
  },
  profileSection: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    borderTop: "1px solid #34495e",
    padding: "15px 0"
  },
  contentArea: {
    transition: "margin-left 0.3s ease",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    
  }
};

export default function DashboardLayout() {
  const [openReports, setOpenReports] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div style={sidebarVisible ? styles.sidebar : styles.collapsedSidebar}>
        <div className="container">
          {/* Header with title and close button */}
          <div style={styles.header}>
            <h4 className="m-0">Admin Panal</h4>
            <X 
              size={20} 
              onClick={toggleSidebar} 
              style={{ cursor: "pointer" }}
              className=""
            />
          </div>

          {/* Application setion */}
          

          {/* Sidebar Navigation */}
          <nav className="nav flex-column">
            <div className="nav-item">
              <a 
                href="/dashboard" 
                className="nav-link"
                style={{
                  ...styles.navLink, 
                  ...(hoveredLink === "home" ? styles.navLinkHover : {})
                }} 
                onMouseEnter={() => setHoveredLink("home")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Home size={18} style={{ marginRight: "15px" }} />
                Home
              </a>
            </div>

            {/* Application */}
            <div className="nav-item">
              <a 
                href="/dashboard/applications" 
                className="nav-link"
                style={{
                  ...styles.navLink, 
                  ...(hoveredLink === "home" ? styles.navLinkHover : {})
                }} 
                onMouseEnter={() => setHoveredLink("home")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <FileUser size={18} style={{ marginRight: "15px" }} />
                Application
              </a>
            </div>

            {/* Employee */}
            <div className="nav-item">
              <a 
                href="/dashboard/employeedata" 
                className="nav-link"
                style={{
                  ...styles.navLink, 
                  ...(hoveredLink === "home" ? styles.navLinkHover : {})
                }} 
                onMouseEnter={() => setHoveredLink("home")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <GrUserWorker size={18} style={{ marginRight: "15px" }} />
                Employee
              </a>
            </div>

            {/* Employee Profile */}
            <div className="nav-item">
              <a 
                href="/dashboard/employeeprofile" 
                className="nav-link"
                style={{
                  ...styles.navLink, 
                  ...(hoveredLink === "home" ? styles.navLinkHover : {})
                }} 
                onMouseEnter={() => setHoveredLink("home")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <FileUser size={18} style={{ marginRight: "15px" }} />
                Profile
              </a>
            </div>

            <div className="nav-item">
              <div 
                onClick={() => setOpenReports(!openReports)}
                style={{
                  ...styles.navLink, 
                  ...(hoveredLink === "reports" ? styles.navLinkHover : {})
                }}
                className="d-flex justify-content-between align-items-center" 
                onMouseEnter={() => setHoveredLink("reports")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <div className="d-flex align-items-center">
                  <FileText size={18} style={{ marginRight: "15px" }} />
                  Reports
                </div>
                {openReports ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              <div className={openReports ? "show" : "collapse"}>
                <div style={{ borderLeft: "1px solid #34495e", marginLeft: "22px" }}>
                  <a 
                    href="#monthlyReports" 
                    className="nav-link"
                    style={{
                      ...styles.subNavLink,
                      ...(hoveredLink === "monthlyReports" ? styles.navLinkHover : {})
                    }}
                    onMouseEnter={() => setHoveredLink("monthlyReports")}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Monthly Reports
                  </a>
                  <a 
                    href="#yearlyReports" 
                    className="nav-link"
                    style={{
                      ...styles.subNavLink,
                      ...(hoveredLink === "yearlyReports" ? styles.navLinkHover : {})
                    }}
                    onMouseEnter={() => setHoveredLink("yearlyReports")}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Yearly Reports
                  </a>
                </div>
              </div>
            </div>

            <div className="nav-item">
              <a 
                href="#analytics" 
                className="nav-link"
                style={{
                  ...styles.navLink,
                  ...(hoveredLink === "analytics" ? styles.navLinkHover : {})
                }}
                onMouseEnter={() => setHoveredLink("analytics")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <BarChart2 size={18} style={{ marginRight: "15px" }} />
                Analytics
              </a>
            </div>

            <div className="nav-item">
              <div 
                onClick={() => setOpenSettings(!openSettings)}
                style={{
                  ...styles.navLink, 
                  ...(hoveredLink === "settings" ? styles.navLinkHover : {})
                }}
                className="d-flex justify-content-between align-items-center"
                onMouseEnter={() => setHoveredLink("settings")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <div className="d-flex align-items-center">
                  <Settings size={18} style={{ marginRight: "15px" }} />
                  Settings
                </div>
                {openSettings ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              <div className={openSettings ? "show" : "collapse"}>
                <div style={{ borderLeft: "1px solid #34495e", marginLeft: "22px" }}>
                  <a 
                    href="#userSettings" 
                    className="nav-link"
                    style={{
                      ...styles.subNavLink,
                      ...(hoveredLink === "userSettings" ? styles.navLinkHover : {})
                    }}
                    onMouseEnter={() => setHoveredLink("userSettings")}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    User Settings
                  </a>
                  <a 
                    href="#appSettings" 
                    className="nav-link"
                    style={{
                      ...styles.subNavLink,
                      ...(hoveredLink === "appSettings" ? styles.navLinkHover : {})
                    }}
                    onMouseEnter={() => setHoveredLink("appSettings")}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    App Settings
                  </a>
                </div>
              </div>
            </div>

            {/* Profile section at bottom */}
            <div style={styles.profileSection}>
              <a 
                href="#profile" 
                className="nav-link"
                style={{
                  ...styles.navLink,
                  ...(hoveredLink === "profile" ? styles.navLinkHover : {})
                }}
                onMouseEnter={() => setHoveredLink("profile")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <User size={18} style={{ marginRight: "15px" }} />
                Profile
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Toggle button when sidebar is collapsed */}
      {!sidebarVisible && (
        <button
          onClick={toggleSidebar}
          style={styles.toggleButton}
          aria-label="Open Sidebar"
        >
          <Menu size={20} />
        </button>
      )}

      

      {/* Main Content Area with dynamic margin */}
      <main style={{ 
        ...styles.contentArea,
        marginLeft: !isMobile &&sidebarVisible ? "240px" : "0" 
      }}>
        {/* Sample content - this would be replaced with actual page content */}

      </main>
    </div>
  );
}