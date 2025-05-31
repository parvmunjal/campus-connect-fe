// src/pages/Clubs.jsx
import React, { useEffect, useState } from 'react';
import ClubCard from '../components/clubs/ClubCard';
import styles from '../styles/Clubs.module.css';
import { getAllOrganizers } from '../services/clubService';
import ProfileCardModal from '../components/profile/ProfileCardModal';
import Loader from '../components/common/Loader';
import { toast } from 'react-toastify';

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClub, setSelectedClub] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await getAllOrganizers();
        setClubs(res);
      } catch (err) {
        toast.error('Failed to load clubs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);


  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Explore Clubs</h2>
      {loading?(
        <Loader/>
      ):(
          <div className={styles.grid}>
        {clubs.map((club) => (
          <ClubCard
            key={club.id}
            club={club}
            onClick={() => setSelectedClub(club)}
          />
        ))}
      </div>
      )}
      {selectedClub && (
        <ProfileCardModal
          show={!!selectedClub}
          onClose={() => setSelectedClub(null)}
          userId={selectedClub.user.id}
          role="ROLE_ORGANIZER"
        />
      )}
    </div>
  );
};

export default Clubs;
