import React from 'react';
import styles from './ProfileCardModal.module.css';

const ProfileField = ({ label, value }) => (
  <div className={styles.profileField}>
    <span className={styles.label}>{label}:</span>
    <span className={styles.value}>{value || '—'}</span>
  </div>
);

export default ProfileField;
