// src/pages/admin/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";
import Loader from "../components/common/Loader";
import ProfileCardModal from "../components/profile/ProfileCardModal";
import styles from "../styles/ManageUsers.module.css";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await getAllUsers();
        setUsers(res);
        setFilteredUsers(res);
      } catch (err) {
        toast.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();
    const results = users.filter(
      user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(results);
  }, [search, users]);

  return (
    <div className={styles.container}>
      <h2>Manage Users</h2>

      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <Loader />
      ) : (
        <div className={styles.userList}>
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={styles.userCard}
              onClick={() => setSelectedUserId(user.id)}
            >
              <div className={styles.userInfo}>
                <FaUser className={styles.icon} />
                <span>{user.name}</span>
              </div>
              <div className={styles.userInfo}>
                <FaEnvelope className={styles.icon} />
                <span>{user.email}</span>
              </div>
              <div className={styles.userInfo}>
                <FaPhone className={styles.icon} />
                <span>{user.phoneNumber || 'N/A'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <ProfileCardModal
        show={!!selectedUserId}
        userId={selectedUserId}
        role="ROLE_USER"
        onClose={() => setSelectedUserId(null)}
      />
    </div>
  );
};

export default ManageUsers;
