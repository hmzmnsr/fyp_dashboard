import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch all programs
export const fetchPrograms = createAsyncThunk(
  'programs/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/programs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new program
export const createProgram = createAsyncThunk(
  'programs/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/programs', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Update an existing program
export const updateProgram = createAsyncThunk(
  'programs/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/programs/${id}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Delete a program
export const deleteProgram = createAsyncThunk(
  'programs/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/programs/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
