import React from 'react';
import DashboardCard from '../components/dashboard/DashboardCard';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Dashboard.module.css';

import { FaCalendarAlt, FaPlusCircle, FaMapMarkerAlt, FaUsers, FaEye } from 'react-icons/fa';

const OrganizerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.fullPage}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Welcome Organizer!</h2>
        
        <div className={styles.cardGrid}>
          <DashboardCard
            icon={<FaCalendarAlt />}
            title="My Events"
            onClick={() => navigate('/organizer/myevents')}
          />
          <DashboardCard
            icon={<FaPlusCircle />}
            title="Create Event"
            onClick={() => navigate('/organizer/create')}
          />
          <DashboardCard
            icon={<FaMapMarkerAlt />}
            title="Venue Availability"
            onClick={() => navigate('/organizer/venue')}
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

export default OrganizerDashboard;
