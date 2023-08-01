// api.js
import { API_BASE_URL } from './apiBase';
import Cookies from 'js-cookie';

export const getTaskDetails = async(id) => {
    return fetch(`${API_BASE_URL}/api/tasks/${id}`, {
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

export const getMemberTaskList = async (id) => {
    return fetch(`${API_BASE_URL}/api/tasks/members/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        })
            .then((response) => response.json())
            .catch((error) => {
            console.error('Error fetching project member detail data:', error);
            return null;
        });
};

export const getDocuments = async (id) => {
    return fetch(`${API_BASE_URL}/api/tasks/documents/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        })
            .then((response) => response.json())
            .catch((error) => {
            console.error('Error fetching documents data:', error);
            return null;
        });
}

export const getOneDocument = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/documents/files/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch document data');
    }

    // const arrayBuffer = await response.arrayBuffer();
    // const byteArray = new Uint8Array(arrayBuffer);

    // Chuyển đổi dữ liệu trả về thành dạng Blob
    const blob = await response.blob();
    return blob;
    } catch (error) {
        console.error('Error fetching One document data:', error);
        return null;
    }
};

export const getDiscussions = async (id) => {
    return fetch(`${API_BASE_URL}/api/discussions/task/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        })
            .then((response) => response.json())
            .catch((error) => {
            console.error('Error fetching documents data:', error);
            return null;
        });
}