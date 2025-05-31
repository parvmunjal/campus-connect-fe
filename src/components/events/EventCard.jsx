// src/components/events/EventCard.jsx
import React from 'react';
import styles from './EventCard.module.css';

const EventCard = ({ event, onClick }) => {
  const dateTime = new Date(event.eventDate);
  const formattedDate = dateTime.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  const formattedTime = dateTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={styles.card} onClick={() => onClick(event)}>
      <h3 className={styles.name}>{event.eventName}</h3>
      <p className={styles.detail}><strong>📍 Location:</strong> {event.location}</p>
      <p className={styles.detail}><strong>🎓 Organizer:</strong> {event.organizer.name}</p>
      <div className={styles.date}>
        🗓️ {formattedDate} – {formattedTime}
      </div>
    </div>
  );
};

export default EventCard;
