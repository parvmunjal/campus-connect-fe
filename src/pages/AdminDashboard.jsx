import React from 'react';
import DashboardCard from '../components/dashboard/DashboardCard';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Dashboard.module.css';

import { FaCheckCircle, FaMapMarkerAlt, FaUserShield, FaUsers, FaEye } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.fullPage}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Welcome Admin!</h2>
        
        <div className={styles.cardGrid}>
          <DashboardCard
            icon={<FaCheckCircle />}
            title="Event Approvals"
            onClick={() => navigate('/admin/approvals')}
          />
          <DashboardCard
            icon={<FaMapMarkerAlt />}
            title="Venue Availability"
            onClick={() => navigate('/admin/venue')}
          />
          <DashboardCard
            icon={<FaUserShield />}
            title="Manage Users"
            onClick={() => navigate('/admin/users')}
          />
        </div>

        <div className={styles.cardGrid}>
          <DashboardCard
            icon={<FaEye />}
            title="View Events"
            onClick={() => navigate('/events')}
          />
          <DashboardCard
            icon={<FaUsers />}
            title="Explore Clubs"
            onClick={() => navigate('/clubs')}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
