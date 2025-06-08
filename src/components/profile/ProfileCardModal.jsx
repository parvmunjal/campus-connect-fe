import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './ProfileCardModal.module.css';
import ProfileField from './ProfileField';
import { toast } from 'react-toastify';
import Loader from '../common/Loader';
import { fetchUserProfile, fetchOrganizerProfile } from '../../services/profileService.js';

const ProfileCardModal = ({ show, onClose, userId, role }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!show || !userId || !role) return;
      setLoading(true);
      try {
        let data;
        if (role === 'ROLE_ORGANIZER') {
          data = await fetchOrganizerProfile(userId);
          if (data.eventGallery) {
            const images = data.eventGallery.split(',').map((url) => url.trim());
            setGalleryImages(images);
            setCurrentImageIndex(0);
          }
        } else {
          data = await fetchUserProfile(userId);
        }
        setProfileData(data);
      } catch (err) {
        toast.error('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [show, userId, role]);

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className={styles.profileImageWrapper}>
              <img
                src={profileData?.dpUrl || '/default-profile.jpg'}
                alt="Profile"
                className={styles.profileImage}
              />
            </div>

            <div className={styles.fieldsContainer}>
              <ProfileField label="Name" value={profileData?.name} />
              <ProfileField label="Email" value={profileData?.email} />
              <ProfileField label="Phone Number" value={profileData?.phoneNumber} />

              {role === 'ROLE_ORGANIZER' && (
                <>
                  <ProfileField label="Description" value={profileData?.description} />
                  {galleryImages.length > 0 && (
                    <div className={styles.profileField}>
                      <div className={styles.label}>Event Gallery</div>
                      <div className={styles.carouselWrapper}>
                        <button
                          className={styles.arrow}
                          onClick={() =>
                            setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
                          }
                        >
                          ‹
                        </button>
                        <img
                          src={galleryImages[currentImageIndex]}
                          alt={`Event ${currentImageIndex + 1}`}
                          className={styles.carouselImage}
                        />
                        <button
                          className={styles.arrow}
                          onClick={() =>
                            setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
                          }
                        >
                          ›
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCardModal;
