// src/components/clubs/ClubCard.jsx
import React from 'react';
import styles from './ClubCard.module.css';

const ClubCard = ({ club, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(club)}>
      <img
        src={club.dpUrl || '/default-logo.png'}
        alt={club.name}
        className={styles.logo}
      />
      <h3 className={styles.name}>{club.name}</h3>
    </div>
  );
};

export default ClubCard;
