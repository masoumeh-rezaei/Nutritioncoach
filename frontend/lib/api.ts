// lib/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // برای کوکی‌های JWT
    headers: {
        'Content-Type': 'application/json',
    },
});

// توابع آماده برای استفاده در فرم‌ها:
export const loginUser = async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    return response.data;
};

export const registerUser = async (name: string, email: string, password: string) => {
    const response = await api.post('/register', { name, email, password });
    return response.data;
};
