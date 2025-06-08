import React from 'react';
import styles from '../styles/About.module.css';

const About = () => {
  return (
    <div className={styles.container + " container py-5"}>
      <h2 className="mb-4 text-primary">About Campus Connect</h2>

      <p className="lead">
        <strong>Campus Connect</strong> is a centralized platform designed to streamline event
        management and student engagement within university campuses. Whether you're a student,
        club organizer, or administrator, Campus Connect makes organizing and participating in events easier than ever.
      </p>

      <hr />

      <h4 className="mt-4">🚀 Key Features:</h4>
      <ul className="mt-2">
        <li>Browse and register for campus events</li>
        <li>Discover and follow university clubs</li>
        <li>Organizers can create and manage their events</li>
        <li>Admins can approve events and manage venue schedules</li>
        <li>Realtime email updates</li>
      </ul>

      <h4 className="mt-4">💡 Built With:</h4>
      <p>
        ReactJS, Spring Boot, MySQL, React-Bootstrap, and a sprinkle of passion!
      </p>
    </div>
  );
};

export default About;
