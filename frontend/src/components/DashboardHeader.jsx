import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FaDigitalOcean, FaBell, FaUser } from 'react-icons/fa'; // Using different icons
import{ useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { logoutUser } from '../services/authService';

function ProfessionalHeader() {
  const { user, setUser } = useContext(AuthContext);

  return (
    <Navbar
      variant="dark"
      expand="lg"
      className="shadow-sm py-3 "
      style={{ backgroundColor: '#06202B' }} // Dark blue background
    >
      <Container fluid style={{
        paddingLeft: '80px', 
      }}>
        <Navbar.Brand className="d-flex align-items-center fw-semibold fs-5 text-light">
          <FaDigitalOcean className="me-2 text-info" size="1.75em" />
          <span className="ms-1 text-white">
            <a href="/dashboard" className='text-decoration-none text-white'>Admin Portal</a>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Item className="me-3">
              <Nav.Link
                href="#overview"
                className="text-light hover-effect"
                style={{ transition: 'color 0.3s' }}
              >
                Overview
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="me-3">
              <Nav.Link
                href="#reports"
                className="text-light hover-effect"
                style={{ transition: 'color 0.3s' }}
              >
                Reports
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="me-3">
              <Nav.Link
                href="#analytics"
                className="text-light hover-effect"
                style={{ transition: 'color 0.3s' }}
              >
                Analytics
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="me-3">
              <Nav.Link href="#notifications" className="position-relative">
                <FaBell size="1.25em" className="text-warning" />
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                  <span className="visually-hidden">unread messages</span>
                </span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#profile" className="d-flex align-items-center text-info">
                <FaUser size="1.5em" className="me-2" />
                <span className="fw-medium">{user?.username}</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ProfessionalHeader;
