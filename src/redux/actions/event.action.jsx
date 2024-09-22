import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch all faculty members
export const fetchEvent = createAsyncThunk(
  'event/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/event');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new faculty member
export const createEvent = createAsyncThunk(
  'event/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/event', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Update an existing faculty member
export const updateEvent = createAsyncThunk(
  'event/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/event/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Delete a faculty member
export const deleteEvent = createAsyncThunk(
  'event/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/event/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
); 
 