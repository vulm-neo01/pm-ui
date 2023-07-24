// api.js
import { API_BASE_URL } from '../api/apiBase';
import Cookies from 'js-cookie';

export const fetchUserData = () => {
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
