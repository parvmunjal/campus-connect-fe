import React, { useState } from 'react';
import styles from '../styles/CreateEvents.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { createEvent } from '../services/eventService.js';

const CreateEvents = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    location: '',
    registrationFee: '',
    description: '',
    posterUrl: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    navigate('/organizer');
  };

  const handleSave = async () => {
    const { eventName, eventDate, location, description, posterUrl, registrationFee} = formData;

    if (!eventName || !eventDate || !location || !description) {
      toast.error('Please fill out all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        eventName,
        description,
        eventDate: new Date(eventDate).toISOString(),
        location,
        posterUrl,
        registrationFee: parseFloat(registrationFee || 0),
        organizer: {
          id: auth.userId,
        },
      };
      await createEvent(payload);
      toast.success('Event created successfully!');
      navigate('/organizer/myevents');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create event');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.modal}>
        <div className={styles.content}>
          <div className={styles.posterContainer}>
            {formData.posterUrl ? (
              <img
                src={formData.posterUrl}
                alt="Event Poster"
                className={styles.poster}
              />
            ) : (
              <p>Paste a poster URL to preview</p>
            )}
          </div>

          <div className={styles.details}>
            <input
              type="text"
              name="eventName"
              placeholder="Event Name"
              className={styles.input}
              value={formData.eventName}
              onChange={handleChange}
              required
            />

            <input
              type="datetime-local"
              name="eventDate"
              className={styles.input}
              value={formData.eventDate}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              className={styles.input}
              value={formData.location}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="registrationFee"
              placeholder="Registration Fee (₹)"
              className={styles.input}
              value={formData.registrationFee}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Event Description"
              className={styles.textarea}
              value={formData.description}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="posterUrl"
              placeholder="Poster Image URL"
              className={styles.input}
              value={formData.posterUrl}
              onChange={handleChange}
            />

            <div className={styles.buttonGroup}>
              <button
                className={styles.saveButton}
                onClick={handleSave}
                disabled={submitting}
              >
                {submitting ? 'Saving...' : 'Save'}
              </button>
              <button className={styles.cancelButton} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvents;
