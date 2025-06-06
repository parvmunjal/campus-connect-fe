// src/pages/admin/EventApprovals.jsx
import React, { useEffect, useState } from 'react';
import { fetchPendingEvents,fetchApprovedEvents } from '../services/eventService';
import EventCard from '../components/events/EventCard';
import EventDetailsModal from '../components/events/EventDetailsModal';
import Loader from '../components/common/Loader';
import { toast } from 'react-toastify';
import styles from '../styles/Event.module.css';

const EventApprovals = () => {
  const [events, setEvents] = useState([]);
  const [selectedTab, setSelectedTab] = useState('pending'); // 'pending' | 'approved'
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data =
        selectedTab === 'pending' ? await fetchPendingEvents() : await fetchApprovedEvents();
      setEvents(data);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [selectedTab]);

  return (
    <div className={styles.fullPage}>
      <div className={styles.container}>
        <div className={styles.tabHeader}>
          <button
            className={`${styles.tab} ${selectedTab === 'pending' ? styles.activeTab : ''}`}
            onClick={() => setSelectedTab('pending')}
          >
            Pending Approvals
          </button>
          <button
            className={`${styles.tab} ${selectedTab === 'approved' ? styles.activeTab : ''}`}
            onClick={() => setSelectedTab('approved')}
          >
            Approved Events
          </button>
        </div>

        {loading ? (
          <Loader />
        ) : events.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>No {selectedTab} events found.</p>
        ) : (
          <div className={styles.cardGrid}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
            ))}
          </div>
        )}
      </div>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          isApprovalMode={selectedEvent.pendingStatus} 
        />
      )}
    </div>
  );
};

export default EventApprovals;
