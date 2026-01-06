export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").trim();

export const apiUrl = (endpoint) => `${API_BASE_URL.replace(/\/$/, "")}/${endpoint}`;
