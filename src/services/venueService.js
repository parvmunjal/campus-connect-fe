// src/services/venueService.js
import axios from 'axios';

const BASE_URL = 'https://campusconnect-o0ic.onrender.com';

export const fetchAvailabilityByDate = async (date) => {
  try {
    const response = await axios.get(`${BASE_URL}/availability`, {
      params: { date },
    });
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || 'Something went wrong';
    return { success: false, message };
  }
};
