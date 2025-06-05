import React, { useState, useEffect } from 'react';
import styles from './EventDetailsModal.module.css';
import { useAuth } from '../../context/AuthContext';
import {
  registerForEvent,
  getUserRegisteredEvents,
  eventAnalytics,
} from '../../services/eventService';
import { toast } from 'react-toastify';
import ProfileCardModal from '../profile/ProfileCardModal';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const EventDetailsModal = ({ event, onClose }) => {
  const { auth } = useAuth();
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [checkingRegistration, setCheckingRegistration] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        if (!auth?.userId || !event?.id || auth.role !== 'ROLE_USER') return;
        setCheckingRegistration(true);
        const registeredEvents = await getUserRegisteredEvents(auth.userId);
        const alreadyRegistered = registeredEvents.some((e) => e.id === event.id);
        setIsRegistered(alreadyRegistered);
      } catch (err) {
        console.error('Failed to check registration:', err);
        toast.error('Failed to check registration status.');
      } finally {
        setCheckingRegistration(false);
      }
    };

    checkRegistration();
  }, [auth.userId, event?.id, auth.role]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (activeTab !== 'analytics' || !event?.id) return;
      try {
        setLoadingAnalytics(true);
        const users = await eventAnalytics(event.id);
        setRegisteredUsers(users);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
        toast.error('Failed to fetch analytics.');
      } finally {
        setLoadingAnalytics(false);
      }
    };

    fetchAnalytics();
  }, [activeTab, event?.id]);

  if (!event) return null;

  const formattedDate = new Date(event.eventDate).toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const feeDisplay =
    !event.registrationFee || event.registrationFee === 0
      ? 'Free'
      : `Rs ${event.registrationFee}`;

  const handleRegister = async () => {
    if (isRegistered) {
      toast.info('You are already registered for this event.');
      return;
    }

    setRegistering(true);
    try {
      await registerForEvent(event.id, auth.userId);
      toast.success('Successfully registered for the event!');
      setIsRegistered(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Registration failed');
    } finally {
      setRegistering(false);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>

          {auth?.role === 'ROLE_ORGANIZER' && auth.userId === event.organizer.user.id && (
            <div className={styles.tabBar}>
              <button
                className={`${styles.tab} ${activeTab === 'details' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'analytics' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                Analytics
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'edit' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('edit')}
              >
                Edit Event
              </button>
            </div>
          )}

          <div className={styles.content}>
            {activeTab === 'details' && (
              <>
                <div className={styles.posterContainer}>
                  <img
                    src={event.posterUrl || '/default-poster.jpg'}
                    alt="Event Poster"
                    className={styles.poster}
                  />
                </div>

                <div className={styles.details}>
                  <h2 className={styles.title}>{event.eventName}</h2>
                  <p className={styles.date}>
                    <strong>Date & Time:</strong> {formattedDate}
                  </p>
                  <p className={styles.location}>
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className={styles.organizer}>
                    <strong>Organizer:</strong>{' '}
                    <span
                      className={styles.organizerLink}
                      onClick={() => setShowProfileModal(true)}
                    >
                      {event.organizer?.name}
                    </span>
                  </p>
                  <p className={styles.fee}>
                    <strong>Registration Fee:</strong> {feeDisplay}
                  </p>
                  <p className={styles.description}>
                    <strong>Description:</strong> {event.description}
                  </p>

                  {auth?.role === 'ROLE_USER' && (
                    <>
                      {checkingRegistration ? (
                        <button className={styles.registerBtn} disabled>
                          Checking registration...
                        </button>
                      ) : !isRegistered ? (
                        <button
                          className={styles.registerBtn}
                          onClick={handleRegister}
                          disabled={registering}
                        >
                          {registering ? 'Registering...' : 'Register'}
                        </button>
                      ) : (
                        <button className={styles.registeredBtn} disabled>
                          Registered
                        </button>
                      )}
                    </>
                  )}
                </div>
              </>
            )}

            {activeTab === 'analytics' && (
              <div className={styles.analyticsContainer}>
                <div className={styles.userList}>
                  <h3>Registered Users</h3>
                  {loadingAnalytics ? (
                    <p>Loading...</p>
                  ) : registeredUsers.length === 0 ? (
                    <p>No registrations yet.</p>
                  ) : (
                    <ul>
                      {registeredUsers.map((user) => (
                        <li
                          key={user.id}
                          className={styles.userItem}
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setShowProfileModal(true);
                          }}
                        >
                          {user.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className={styles.analyticsRight}>
  <div className={styles.analyticsHeader}>
    <h3>Total Registrations: {registeredUsers.length}</h3>
  </div>

  <div className={styles.chartContainer}>
    <Bar
      data={{
        labels: ['Registered Users'],
        datasets: [
          {
            label: 'Users',
            data: [registeredUsers.length], 
            backgroundColor: ['#4e73df'],
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
      }}
    />
  </div>

  <p className={styles.comingSoon}>More analytics coming soon...</p>
</div>

              </div>
            )}

            {activeTab === 'edit' && (
              <div className={styles.tabContent}>
                <h2>✏️ Edit Event</h2>
                <p>This tab will contain the event editing form pre-filled with current data.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showProfileModal && selectedUserId && (
        <ProfileCardModal
          show={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          userId={selectedUserId}
          role="ROLE_USER"
        />
      )}
    </>
  );
};

export default EventDetailsModal;
