import axios from 'axios';

const BASE_URL = 'https://campusconnect-o0ic.onrender.com';

export const fetchUserProfile = async (userId) => {
  const res = await axios.get(`${BASE_URL}/users/${userId}`);
  return res.data;
};

export const fetchOrganizerProfile = async (userId) => {
  const res = await axios.get(`${BASE_URL}/organizers/byuser/${userId}`);
  return res.data;
};
