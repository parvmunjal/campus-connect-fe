import React, { useState, useEffect } from 'react';
import styles from './EventDetailsModal.module.css';
import { useAuth } from '../../context/AuthContext';
import { registerForEvent, getUserRegisteredEvents } from '../../services/eventService';
import { toast } from 'react-toastify';
import ProfileCardModal from '../profile/ProfileCardModal';

const EventDetailsModal = ({ event, onClose }) => {
  const { auth } = useAuth();
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [checkingRegistration, setCheckingRegistration] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        if (!auth?.userId || !event?.id) return;

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
  }, [auth.userId, event?.id]);

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

          <div className={styles.content}>
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
          </div>
        </div>
      </div>

      {showProfileModal && (
        <ProfileCardModal
          show={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          userId={event.organizer?.user?.id}
          role="ROLE_ORGANIZER"
        />
      )}
    </>
  );
};

export default EventDetailsModal;
