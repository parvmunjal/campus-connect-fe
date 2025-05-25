import axios from 'axios';

const BASE_URL = 'https://campusconnect-o0ic.onrender.com';

export const signin = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signin`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Invalid credentials. Please try again.');
      } else {
        throw new Error(error.response.data?.message || 'Sign in failed.');
      }
    } else {
      throw new Error('Network error. Please check your connection.');
    }
  }
};

export const signup = async (userInfo) => {
  try {
    const isOrganizer = userInfo.role === 'ROLE_ORGANIZER';
    const endpoint = isOrganizer ? '/organizers' : '/auth/signup';

    const response = await axios.post(`${BASE_URL}${endpoint}`, userInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400 && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Signup failed. Please check your details.');
      }
    } else {
      throw new Error('Network error. Please check your connection.');
    }
  }
};
