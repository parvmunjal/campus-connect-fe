// src/components/dashboard/DashboardCard.jsx
import React from 'react';
import styles from './DashboardCard.module.css';

const DashboardCard = ({ icon, title, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.iconWrapper}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};

export default DashboardCard;
