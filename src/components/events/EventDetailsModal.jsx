import React, { useState, useEffect } from "react";
import styles from "./EventDetailsModal.module.css";
import { useAuth } from "../../context/AuthContext";
import {
  registerForEvent,
  getUserRegisteredEvents,
  eventAnalytics,
  updateEvent,
  approveEvent,
  rejectEvent,
} from "../../services/eventService";
import { toast } from "react-toastify";
import ProfileCardModal from "../profile/ProfileCardModal";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const EventDetailsModal = ({ event, onClose, isApprovalMode = false }) => {
  const { auth } = useAuth();
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [checkingRegistration, setCheckingRegistration] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    eventName: event.eventName,
    eventDate: new Date(event.eventDate).toISOString().slice(0, 16),
    location: event.location,
    registrationFee: event.registrationFee || "",
    description: event.description,
    posterUrl: event.posterUrl || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const {
      eventName,
      eventDate,
      location,
      description,
      posterUrl,
      registrationFee,
    } = formData;

    if (!eventName || !eventDate || !location || !description) {
      toast.error("Please fill out all required fields.");
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
      };

      await updateEvent(event.id, payload);
      toast.success("Event updated successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update event");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        if (!auth?.userId || !event?.id || auth.role !== "ROLE_USER") return;
        setCheckingRegistration(true);
        const registeredEvents = await getUserRegisteredEvents(auth.userId);
        const alreadyRegistered = registeredEvents.some(
          (e) => e.id === event.id
        );
        setIsRegistered(alreadyRegistered);
      } catch (err) {
        toast.error("Failed to check registration status.");
      } finally {
        setCheckingRegistration(false);
      }
    };

    checkRegistration();
  }, [auth.userId, event?.id, auth.role]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (activeTab !== "analytics" || !event?.id) return;
      try {
        setLoadingAnalytics(true);
        const users = await eventAnalytics(event.id);
        setRegisteredUsers(users);
      } catch (err) {
        toast.error("Failed to fetch analytics.");
      } finally {
        setLoadingAnalytics(false);
      }
    };

    fetchAnalytics();
  }, [activeTab, event?.id]);

  if (!event) return null;

  const formattedDate = new Date(event.eventDate).toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const feeDisplay =
    !event.registrationFee || event.registrationFee === 0
      ? "Free"
      : `Rs ${event.registrationFee}`;

  const handleRegister = async () => {
    if (isRegistered) {
      toast.info("You are already registered for this event.");
      return;
    }

    setRegistering(true);
    try {
      await registerForEvent(event.id, auth.userId);
      toast.success("Successfully registered for the event!");
      setIsRegistered(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  const handleApprove = async () => {
    try {
      await approveEvent(event.id);
      toast.success("Event approved!");
      onClose();
    } catch (err) {
      toast.error("Failed to approve event");
    }
  };

  const handleReject = async () => {
    try {
      await rejectEvent(event.id);
      toast.success("Event rejected.");
      onClose();
    } catch (err) {
      toast.error("Failed to reject event");
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>

          {auth?.role === "ROLE_ORGANIZER" &&
            auth.userId === event.organizer.user.id &&
            !isApprovalMode && (
              <div className={styles.tabBar}>
                <button
                  className={`${styles.tab} ${
                    activeTab === "details" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
                <button
                  className={`${styles.tab} ${
                    activeTab === "analytics" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("analytics")}
                >
                  Analytics
                </button>
                <button
                  className={`${styles.tab} ${
                    activeTab === "edit" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("edit")}
                >
                  Edit Event
                </button>
              </div>
            )}

          <div className={styles.content}>
            {activeTab === "details" && (
              <>
                <div className={styles.posterContainer}>
                  <img
                    src={event.posterUrl || "/default-poster.jpg"}
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
                    <strong>Organizer:</strong>{" "}
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

                  {isApprovalMode && auth?.role === "ROLE_ADMIN" && (
                    <div className={styles.buttonGroup}>
                      <button
                        className={styles.approveButton}
                        onClick={handleApprove}
                      >
                        Approve
                      </button>
                      <button
                        className={styles.rejectButton}
                        onClick={handleReject}
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {!isApprovalMode && auth?.role === "ROLE_USER" && (
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
                          {registering ? "Registering..." : "Register"}
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

            {activeTab === "analytics" && (
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
                  <h3>Total Registrations: {registeredUsers.length}</h3>
                  <div className={styles.chartContainer}>
                    <Bar
                      data={{
                        labels: ["Registered Users"],
                        datasets: [
                          {
                            label: "Users",
                            data: [registeredUsers.length],
                            backgroundColor: ["#4e73df"],
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
                  <p className={styles.comingSoon}>
                    More analytics coming soon...
                  </p>
                </div>
              </div>
            )}

            {activeTab === "edit" && (
              <div className={styles.editContainer}>
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
                      onClick={handleUpdate}
                      disabled={submitting}
                    >
                      {submitting ? "Saving..." : "Save"}
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={() => setActiveTab("details")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
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
