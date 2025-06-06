import React, { useEffect, useState } from 'react';
import styles from './DatePopup.module.css';
import { fetchAvailabilityByDate, createAvailabilitySlot } from '../../services/venueService.js';
import { toast } from 'react-toastify';
import Loader from '../common/Loader.jsx';

const DatePopup = ({ selectedDate, onClose, isAdmin = false }) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    venue: '',
  });

  const formattedDisplay = selectedDate.toDateString();
  const formattedApi = selectedDate.toISOString().split('T')[0];

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

  useEffect(() => {
    loadSlots();
  }, [formattedApi]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAddSlot = async () => { 
    setLoading(true)
    const { startTime, endTime, venue } = formData;
    if (!startTime || !endTime || !venue) {
      toast.error('Please fill all fields');
      return;
    }

    const res = await createAvailabilitySlot({
      date: formattedApi,
      startTime,
      endTime,
      venue,
    });

    if (res.success) {
      toast.success('Slot added successfully');
      setFormData({ startTime: '', endTime: '', venue: '' });
      loadSlots(); // refresh slots
    } else {
      toast.error(res.message || 'Failed to add slot');
    }
    setLoading(false)
  };

  return (
    <div className={styles.popup}>
      {loading && <Loader/>}
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

        {isAdmin && (
          <div className={styles.slotSection}>
            <h3>Add New Slot</h3>
            <div className={styles.formGroup}>
  <label htmlFor="startTime">Start Time</label>
  <input
    type="time"
    id="startTime"
    value={formData.startTime}
    onChange={handleInputChange}
  />
</div>

<div className={styles.formGroup}>
  <label htmlFor="endTime">End Time</label>
  <input
    type="time"
    id="endTime"
    value={formData.endTime}
    onChange={handleInputChange}
  />
</div>

<div className={styles.formGroup}>
  <label htmlFor="venue">Venue</label>
  <input
    type="text"
    id="venue"
    value={formData.venue}
    onChange={handleInputChange}
    placeholder="Venue"
  />
</div>

            <button onClick={handleAddSlot} className={styles.closeBtn}>
              Add Slot
            </button>
          </div>
        )}

        <button className={styles.closeBtn} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DatePopup;
