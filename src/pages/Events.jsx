// src/pages/Events.jsx
import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../services/eventService.js';
import EventCard from '../components/events/EventCard';
import Loader from '../components/common/Loader';
import { toast } from 'react-toastify';
import styles from '../styles/Event.module.css'; 

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCardClick = (event) => {
    console.log('Clicked Event:', event);
  };

  return (
    <div className={styles.fullPage}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Upcoming Events</h2>

        {loading ? (
          <Loader />
        ) : (
          <div className={styles.cardGrid}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} onClick={handleCardClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
