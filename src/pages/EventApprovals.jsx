// src/pages/admin/EventApprovals.jsx
import React, { useEffect, useState } from 'react';
import { fetchPendingEvents } from '../services/eventService';
import EventCard from '../components/events/EventCard';
import EventDetailsModal from '../components/events/EventDetailsModal';
import Loader from '../components/common/Loader';
import { toast } from 'react-toastify';
import styles from '../styles/Event.module.css';

const EventApprovals = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const loadPendingEvents = async () => {
    try {
      const data = await fetchPendingEvents();
      setEvents(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingEvents();
  }, []);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    loadPendingEvents(); // Refresh list after approval/rejection
  };

  return (
    <div className={styles.fullPage}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Event Approvals</h2>

        {loading ? (
          <Loader />
        ) : (
          <div className={styles.cardGrid}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} onClick={() => handleCardClick(event)} />
            ))}
          </div>
        )}
      </div>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={handleCloseModal}
          isApprovalMode={true} 
        />
      )}
    </div>
  );
};

export default EventApprovals;
