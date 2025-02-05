// src/api.js
const BASE_URL = "http://127.0.0.1:8000/api/v1.0.0";

export const apiFetch = async (endpoint, options = {}) => {
    return await fetch(`${BASE_URL}${endpoint}`, options);
};