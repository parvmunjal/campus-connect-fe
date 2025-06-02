import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrganizerCreatedEvents } from '../services/eventService';
import EventCard from '../components/events/EventCard';
import EventDetailModal from '../components/events/EventDetailsModal';
import Loader from '../components/common/Loader';
import { toast } from 'react-toastify';
import styles from '../styles/Bookings.module.css';

const MyEvents = () => {
  const { auth } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await getOrganizerCreatedEvents(auth.userId);
        setBookings(data);
      } catch (err) {
        toast.error('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    if (auth?.userId) loadEvents();
  }, [auth]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>My Events</h2>
      {loading ? (
        <Loader />
      ) : bookings.length === 0 ? (
        <p className={styles.noBookings}>You haven’t created any event yet.</p>
      ) : (
        <div className={styles.cardGrid}>
          {bookings.map((event) => (
            <EventCard key={event._id} event={event} onClick={setSelectedEvent} />
          ))}
        </div>
      )}

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default MyEvents;
