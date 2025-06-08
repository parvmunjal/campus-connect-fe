import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import ProfileCardModal from '../profile/ProfileCardModal';

const NavBar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate('/');
  };

  const handleProfileOpen = () => {
    setShowProfileModal(true);
  };

  const handleProfileClose = () => {
    setShowProfileModal(false);
  };

  const handleLogoOrHomeClick = () => {
    if (auth.role === "ROLE_ORGANIZER") {
      navigate('/organizer');
    } else if (auth.role === "ROLE_ADMIN") {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  // Inline styles
  const styles = {
    navbarCustom: {
      backgroundColor: 'var(--dark-bg)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      borderBottom: '2px solid var(--primary-color)',
    },
    navbarBrandCustom: {
      fontWeight: 900,
      color: 'var(--primary-color)',
      fontSize: '1.6rem',
      letterSpacing: '1.5px',
      cursor: 'pointer',
    },
    navLinkCustom: {
      color: 'var(--light-bg)',
      fontWeight: 500,
      letterSpacing: '0.05em',
      transition: 'color 0.3s ease',
    },
    navLinkHover: {
      color: 'var(--primary-color)',
    },
    basicNavbar: {
      marginRight: window.innerWidth <= 768 ? '0px' : '-60px',
    },
  };

  return (
    <>
      <Navbar expand="lg" style={styles.navbarCustom} variant="dark" sticky="top">
        <Container>
          <Navbar.Brand onClick={handleLogoOrHomeClick} style={styles.navbarBrandCustom}>
            CampusConnect
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav" style={styles.basicNavbar}>
            <Nav className="ms-auto d-flex align-items-center">
              <Nav.Link onClick={handleLogoOrHomeClick} style={styles.navLinkCustom}>Home</Nav.Link>
              <Nav.Link as={Link} to="/about" style={styles.navLinkCustom}>About</Nav.Link>

              {!auth.token ? (
                <Nav.Link as={Link} to="/auth" style={styles.navLinkCustom}>Sign In / Sign Up</Nav.Link>
              ) : (
                <NavDropdown
                  title={<i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>}
                  id="profile-dropdown"
                  align="end"
                  style={styles.navLinkCustom}
                >
                  <NavDropdown.Item onClick={handleProfileOpen}>My Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Profile Modal */}
      {auth.token && (
        <ProfileCardModal
          show={showProfileModal}
          onClose={handleProfileClose}
          userId={auth.userId}
          role={auth.role}
        />
      )}
    </>
  );
};

export default NavBar;
