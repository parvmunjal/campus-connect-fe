import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
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
  return (
    <>
      <Navbar expand="lg" className={styles.navbarCustom} variant="dark" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className={styles.navbarBrandCustom}>
            CampusConnect
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav" className={styles.basicNavbar}>
            <Nav className={`ms-auto d-flex align-items-center ${styles.navWrapper}`}>
              <Nav.Link as={Link} to="/" className={styles.navLinkCustom}>Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className={styles.navLinkCustom}>About</Nav.Link>

              {!auth.token ? (
                <Nav.Link as={Link} to="/auth" className={styles.navLinkCustom}>Sign In / Sign Up</Nav.Link>
              ) : (
                <NavDropdown
                  title={<i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>}
                  id="profile-dropdown"
                  align="end"
                  className={styles.navLinkCustom}
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
      />
      )}
    </>
  );
};

export default NavBar;
