// src/services/eventService.js
import axios from 'axios';

const BASE_URL = 'https://campusconnect-o0ic.onrender.com';

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/events`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to fetch events.');
    } else {
      throw new Error('Network error. Please try again.');
    }
  }
};

export const registerForEvent = async (eventId, userId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');

  const res = await axios.post(
    `${BASE_URL}/events/${eventId}/register/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getUserRegisteredEvents = async (userId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');

  const res = await axios.get(`${BASE_URL}/events/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const getOrganizerCreatedEvents = async (userId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');

  const res = await axios.get(`${BASE_URL}/events/byorganizer/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const createEvent = async (payload) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');

  const res = await axios.post(`${BASE_URL}/events`,payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const eventAnalytics = async (eventId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');

  const res = await axios.get(`${BASE_URL}/users/event/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const updateEvent = async (eventId, updatedData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');

  const res = await axios.put(`${BASE_URL}/events/${eventId}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const fetchPendingEvents = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');

  const res = await axios.get(`${BASE_URL}/events/pending`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const fetchApprovedEvents = async () => {
  const res = await axios.get(`${BASE_URL}/events/approved`, {
  });
  return res.data;
};
export const approveEvent = async (eventId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');

  const res = await axios.patch(`${BASE_URL}/events/pending/approve/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const rejectEvent = async (eventId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');

  const res = await axios.patch(`${BASE_URL}/events/pending/reject/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


