// src/services/clubService.js
import axios from 'axios';
const BASE_URL = 'https://campusconnect-o0ic.onrender.com';

export const getAllOrganizers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/organizers`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to fetch organizers.');
    } else {
      throw new Error('Network error. Please try again.');
    }
  }
};
