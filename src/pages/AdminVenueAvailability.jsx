import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/VenueAvailability.module.css';
import DatePopup from '../components/venue/DatePopup';

const AdminVenueAvailability = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [dates, setDates] = useState([]);

  // Generate next 30 days
  useEffect(() => {
    const today = new Date();
    const next30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date;
    });
    setDates(next30Days);
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.page}>
    <div className={styles.pageWrapper}>
      <div className={styles.calendar}>
        <h1>Venue Availability</h1>
        <div className={styles.grid}>
          {dates.map((date, idx) => {
            const formatted = date.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            });
            return (
              <div
                key={idx}
                className={`${styles.day} ${idx === 0 ? styles.currentDay : ''}`}
                onClick={() => handleDateClick(date)}
              >
                {formatted}
              </div>
            );
          })}
        </div>
      </div>

      {showPopup && (
        <DatePopup selectedDate={selectedDate} onClose={closePopup} isAdmin={true} />
      )}
    </div>
    </div>
  );
};



export default AdminVenueAvailability;
