// api.js
import { API_BASE_URL } from './apiBase';
import Cookies from 'js-cookie';

export const fetchUserData = async () => {
    return fetch(`${API_BASE_URL}/api/users`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
    },
    })
        .then((response) => response.json())
        .catch((error) => {
        console.error('Error fetching user data:', error);
        return null;
    });
};

export const getUserData = async (id) => {
    return fetch(`${API_BASE_URL}/api/users/${id}`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
    },
    })
        .then((response) => response.json())
        .catch((error) => {
        console.error('Error fetching user data:', error);
        return null;
    });
};

export const getAllNotification = async () => {
    return fetch(`${API_BASE_URL}/api/notifications`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
    },
    })
        .then((response) => response.json())
        .catch((error) => {
        console.error('Error fetching user data:', error);
        return null;
    });
};

