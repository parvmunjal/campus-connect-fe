// src/services/userService.js
import axios from 'axios';
const BASE_URL = 'https://campusconnect-o0ic.onrender.com';

export const getAllUsers = async (eventId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');

  const res = await axios.get(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};