// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import { FaCalendarAlt, FaUsers, FaBookmark } from 'react-icons/fa';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  const { auth } = useAuth();

  return (
    <div className={styles.fullPage}>
    <div className={styles.container}>
    
        <h2 className={styles.heading}>Welcome to Campus Connect</h2>

      <div className={styles.cardGrid}>
        <DashboardCard
          icon={<FaCalendarAlt />}
          title="View Events"
          onClick={() => console.log('View Events')}
        />
        <DashboardCard
          icon={<FaUsers />}
          title="Explore Clubs"
          onClick={() => console.log('Explore Clubs')}
        />
        {auth.token && (
          <DashboardCard
            icon={<FaBookmark />}
            title="My Bookings"
            onClick={() => console.log('My Bookings')}
          />
        )}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
