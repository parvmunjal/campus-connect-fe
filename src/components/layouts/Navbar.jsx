import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link,useNavigate} from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuth } from '../../context/AuthContext'; // adjust path if needed

const NavBar = () => {
  const { auth,logout } = useAuth();
  const navigate=useNavigate();
const handleLogout= ()=>{
  logout();
  navigate('/');
};
  return (
    <Navbar expand="lg" className={styles.navbarCustom} variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.navbarBrandCustom}>
          CampusConnect
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className={styles.basicNavbar}>
          <Nav className={`ms-auto ${styles.navWrapper}`}>
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
                <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item> {/* Will wire this up soon */}
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
