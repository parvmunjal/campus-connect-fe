import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--dark-bg)',
        color: 'var(--light-bg)',
        padding: '1rem 0',
        marginTop: 'auto',
      }}
    >
      <Container className="text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} Campus Connect. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
