import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch all faculty members
export const fetchFaculty = createAsyncThunk(
  'faculty/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/faculty');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new faculty member
export const createFaculty = createAsyncThunk(
  'faculty/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/faculty', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Update an existing faculty member
export const updateFaculty = createAsyncThunk(
  'faculty/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/faculty/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Delete a faculty member
export const deleteFaculty = createAsyncThunk(
  'faculty/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/faculty/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
