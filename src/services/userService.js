import axios from "axios";

const API_URL = "http://localhost:5159/api/User";

// Save token in localStorage
export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }
    return response.data;
};

export const registerUser = async (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

// Fetch current user
export const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    return axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Update user settings
export const updateUserSettings = async (id, settings) => {
    const token = localStorage.getItem("token");
    return axios.put(`${API_URL}/settings/${id}`, settings, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
