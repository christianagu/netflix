import axios from "axios";

const API_URL = "http://localhost:5159/api/User"; // .NET API

export const registerUser = async (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};

export const updateUserSettings = async (userId, settings) => {
    return axios.put(`${API_URL}/settings/${userId}`, settings);
};
