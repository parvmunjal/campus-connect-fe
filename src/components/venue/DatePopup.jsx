// src/components/DatePopup.jsx
import React, { useEffect, useState } from 'react';
import styles from './DatePopup.module.css';
import { fetchAvailabilityByDate } from '../../services/venueService.js';

const DatePopup = ({ selectedDate, onClose }) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const formattedDisplay = selectedDate.toDateString();
  const formattedApi = selectedDate.toISOString().split('T')[0];

  useEffect(() => {
    const loadSlots = async () => {
      setLoading(true);
      const res = await fetchAvailabilityByDate(formattedApi);
      if (res.success) {
        setSlots(res.data);
        setError('');
      } else {
        setSlots([]);
        setError(res.message);
      }
      setLoading(false);
    };

    loadSlots();
  }, [formattedApi]);

  return (
    <div className={styles.popup}>
      <div className={styles.card}>
        <h2>Selected Date: {formattedDisplay}</h2>

        <div className={styles.slotSection}>
          <h3>Available Slots</h3>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : slots.length === 0 ? (
            <p>No slots available.</p>
          ) : (
            <table className={styles.slotTable}>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot, idx) => (
                  <tr key={idx}>
                    <td>{slot.startTime} - {slot.endTime}</td>
                    <td>{slot.venue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <button className={styles.closeBtn} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DatePopup;
