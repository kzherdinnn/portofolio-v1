import axios from 'axios';

const API_URL = 'http://localhost:5000/api/portfolio';

export const api = {
    // Expertise
    getExpertise: () => axios.get(`${API_URL}/expertise`),
    createExpertise: (data: any) => axios.post(`${API_URL}/expertise`, data),
    updateExpertise: (id: string, data: any) => axios.put(`${API_URL}/expertise/${id}`, data),
    deleteExpertise: (id: string) => axios.delete(`${API_URL}/expertise/${id}`),

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

    // Upload
    uploadImage: (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        return axios.post('http://localhost:5000/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};
