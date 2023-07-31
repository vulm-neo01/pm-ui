// api.js
import { API_BASE_URL } from './apiBase';
import Cookies from 'js-cookie';

export const getNoteDetails = async(id) => {
    return fetch(`${API_BASE_URL}/api/notes/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        })
            .then((response) => response.json())
            .catch((error) => {
            console.error('Error fetching task detail data:', error);
            return null;
        });
}

export const getNotesList = async() => {
    return fetch(`${API_BASE_URL}/api/users/notes`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        })
            .then((response) => response.json())
            .catch((error) => {
            console.error('Error fetching note list data:', error);
            return null;
        });
}

export const getProjectList = async() => {
    return fetch(`${API_BASE_URL}/api/users/projects`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        })
            .then((response) => response.json())
            .catch((error) => {
            console.error('Error fetching note list data:', error);
            return null;
        });
}

export const getTaskList = async() => {
    return fetch(`${API_BASE_URL}/api/users/tasks`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        })
            .then((response) => response.json())
            .catch((error) => {
            console.error('Error fetching note list data:', error);
            return null;
        });
}

export const getAlert = async() => {
    return fetch(`${API_BASE_URL}/api/notes/alert`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        })
            .then((response) => response.json())
            .catch((error) => {
            console.error('Error fetching note list data:', error);
            return null;
        });
}