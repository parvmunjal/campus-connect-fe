// src/services/venueService.js
import axios from "axios";

const BASE_URL = "https://campusconnect-o0ic.onrender.com";

export const fetchAvailabilityByDate = async (date) => {
  try {
    const response = await axios.get(`${BASE_URL}/availability`, {
      params: { date },
    });
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong";
    return { success: false, message };
  }
};
export const createAvailabilitySlot = async ({
  venue,
  date,
  startTime,
  endTime,
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/availability`, {
      venue,
      date,
      startTime,
      endTime,
    });

    return {success: true, data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error creating slot",
    };
  }
};
