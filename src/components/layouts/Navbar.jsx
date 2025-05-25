import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const NavBar = () => {
  return (
    <Navbar expand="lg" className={styles.navbarCustom} variant="dark" sticky="top">
      <Container>
        {/* Left-aligned brand */}
        <Navbar.Brand as={Link} to="/" className={styles.navbarBrandCustom}>
          CampusConnect
        </Navbar.Brand>

        {/* Toggle button for mobile view */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Right-aligned links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`ms-auto ${styles.navWrapper}`}>
            <Nav.Link as={Link} to="/" className={styles.navLinkCustom}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className={styles.navLinkCustom}>About</Nav.Link>
            <Nav.Link as={Link} to="/auth" className={styles.navLinkCustom}>Sign In / Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
