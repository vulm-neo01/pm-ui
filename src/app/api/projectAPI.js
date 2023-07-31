// api.js
import { API_BASE_URL } from './apiBase';
import Cookies from 'js-cookie';

export const getProjectDetails = async(id) => {
    return fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        })
            .then((response) => response.json())
            .catch((error) => {
            console.error('Error fetching project detail data:', error);
            return null;
        });
}

export const getTaskList = async (id) => {
    return fetch(`${API_BASE_URL}/api/tasks/list/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        })
            .then((response) => response.json())
            .catch((error) => {
            console.error('Error fetching project detail data:', error);
            return null;
        });
};

export const getUserList = async (id) => {
    return fetch(`${API_BASE_URL}/api/projects/users/${id}`, {
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

export const getMemberList = async (id) => {
    return fetch(`${API_BASE_URL}/api/projects/members/${id}`, {
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

export const getManagerList = async (id) => {
    return fetch(`${API_BASE_URL}/api/projects/managers/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        })
            .then((response) => response.json())
            .catch((error) => {
            console.error('Error fetching manager detail data:', error);
            return null;
        });
};

export const getManagerIdList = async (id) => {
    return fetch(`${API_BASE_URL}/api/projects/managerIds/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        })
            .then((response) => response.json())
            .catch((error) => {
            console.error('Error fetching manager Ids detail data:', error);
            return null;
        });
};

export const getMemberIdList = async (id) => {
    return fetch(`${API_BASE_URL}/api/projects/memberIds/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        })
            .then((response) => response.json())
            .catch((error) => {
            console.error('Error fetching member Ids detail data:', error);
            return null;
        });
};

export const getDocuments = async (id) => {
    return fetch(`${API_BASE_URL}/api/projects/documents/${id}`, {
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