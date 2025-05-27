import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './ProfileCardModal.module.css';
import ProfileField from './ProfileField';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../common/Loader';

const BASE_URL = 'https://campusconnect-o0ic.onrender.com';

const ProfileCardModal = ({ show, onClose }) => {
  const { auth } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!show || !auth.userId || !auth.role) return;
      //console.log(auth)
      setLoading(true);
      try {
        const endpoint =
          auth.role === 'ROLE_ORGANIZER'
            ? `${BASE_URL}/organizers/byuser/${auth.userId}`
            : `${BASE_URL}/users/${auth.userId}`;

        const res = await axios.get(endpoint);
        setProfileData(res.data);
      } catch (err) {
        toast.error('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [show, auth.userId, auth.role]);

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className={styles.profileImageWrapper}>
              <img
                src={profileData?.dpUrl || '/default-profile.png'}
                alt="Profile"
                className={styles.profileImage}
              />
            </div>

            <div className={styles.fieldsContainer}>
              <ProfileField label="Name" value={profileData?.name} />
              <ProfileField label="Email" value={profileData?.email} />
              <ProfileField label="Phone Number" value={profileData?.phoneNumber} />

              {auth.role === 'ROLE_ORGANIZER' && (
                <>
                  <ProfileField label="Description" value={profileData?.description} />
                  <ProfileField label="Event Gallery" value={profileData?.eventGallery} />
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
