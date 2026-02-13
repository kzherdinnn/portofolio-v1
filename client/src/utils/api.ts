import axios from 'axios';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/api/portfolio`;

export const api = {
    // Projects
    getProjects: () => axios.get(`${API_URL}/projects`),
    createProject: (data: any) => axios.post(`${API_URL}/projects`, data),
    updateProject: (id: string, data: any) => axios.put(`${API_URL}/projects/${id}`, data),
    deleteProject: (id: string) => axios.delete(`${API_URL}/projects/${id}`),

    // Experience
    getExperience: () => axios.get(`${API_URL}/experience`),
    createExperience: (data: any) => axios.post(`${API_URL}/experience`, data),
    updateExperience: (id: string, data: any) => axios.put(`${API_URL}/experience/${id}`, data),
    deleteExperience: (id: string) => axios.delete(`${API_URL}/experience/${id}`),

    // Certificates
    getCertificates: () => axios.get(`${API_BASE_URL}/api/certificates`),
    createCertificate: (data: any) => axios.post(`${API_BASE_URL}/api/certificates`, data),
    updateCertificate: (id: string, data: any) => axios.put(`${API_BASE_URL}/api/certificates/${id}`, data),
    deleteCertificate: (id: string) => axios.delete(`${API_BASE_URL}/api/certificates/${id}`),
    reorderCertificates: (orders: { id: string, displayOrder: number }[]) => axios.post(`${API_BASE_URL}/api/certificates/reorder`, { orders }),

    // Project Types
    getProjectTypes: () => axios.get(`${API_BASE_URL}/api/project-types`),
    createProjectType: (data: any) => axios.post(`${API_BASE_URL}/api/project-types`, data),
    deleteProjectType: (id: string) => axios.delete(`${API_BASE_URL}/api/project-types/${id}`),

    // Upload
    uploadImage: (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        return axios.post(`${API_BASE_URL}/api/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};
