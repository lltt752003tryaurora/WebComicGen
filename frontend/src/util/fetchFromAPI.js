// fetchFromAPI.js (sử dụng Axios)

import axios from "axios";

const API_BASE_URL = "https://csc13010-comicgen.onrender.com/v1";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export async function login(username, password) {
    try {
        const response = await apiClient.post("/auth/login", { username, password });
        const data = response.data; 

        console.log("Login successful:", data);
        return data;
    } catch (error) {
        console.error("Login failed:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function signup(formData) {
    try {
        const response = await apiClient.post("/auth/register", formData);
        const data = response.data;

        console.log("Signup successful:", data);
        return data;
    } catch (error) {
        console.error("Signup failed:", error.response?.data?.message || error.message);
        throw error;
    }
}