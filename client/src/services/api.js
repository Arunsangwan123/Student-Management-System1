import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('sms_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (data) => client.post('/auth/login', data);
export const fetchStudents = (params) => client.get('/students', { params });
export const createStudent = (data) => client.post('/students', data);
export const getStudent = (id) => client.get(`/students/${id}`);
export const updateStudent = (id, data) => client.put(`/students/${id}`, data);
export const deleteStudent = (id) => client.delete(`/students/${id}`);

export default client;
