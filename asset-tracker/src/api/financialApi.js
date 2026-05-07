import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const registerUser = async (data) => {
  const response = await API.post('/users/register', data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await API.post('/users/login', data);
  return response.data;
};

// ─── Financial Records ────────────────────────────────────────────────────────
export const saveFinancialRecord = async (formData) => {
  const response = await API.post('/financial', formData);
  return response.data;
};

// ─── GET: Fetch all records for a user ───────────────────────────────────────
export const getFinancialRecords = async (userId) => {
  const response = await API.get(`/financial?user_id=${userId}`);
  return response.data;
};

// ─── GET: Fetch a single record by ID ────────────────────────────────────────
export const getFinancialRecordById = async (id) => {
  const response = await API.get(`/financial/${id}`);
  return response.data;
};

// ─── PUT: Update an existing record ──────────────────────────────────────────
export const updateFinancialRecord = async (id, formData) => {
  const response = await API.put(`/financial/${id}`, formData);
  return response.data;
};

// ─── DELETE: Delete a record by ID ───────────────────────────────────────────
export const deleteFinancialRecord = async (id) => {
  const response = await API.delete(`/financial/${id}`);
  return response.data;
};
