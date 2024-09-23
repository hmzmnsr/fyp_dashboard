import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch all BSCS roadmaps
export const fetchAllBSCS = createAsyncThunk(
  'bscs/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/bscs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Get a specific BSCS roadmap by ID
export const getBSCSById = createAsyncThunk(
  'bscs/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/bscs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new BSCS roadmap
export const createBSCS = createAsyncThunk(
  'bscs/create',
  async (bscsData, { rejectWithValue }) => {
    try {
      const response = await api.post('/bscs', bscsData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Update an existing BSCS roadmap
export const updateBSCS = createAsyncThunk(
  'bscs/update',
  async ({ id, bscsData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/bscs/${id}`, bscsData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to update BSCS roadmap');
    }
  }
);

// Delete a BSCS roadmap
export const deleteBSCS = createAsyncThunk(
  'bscs/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/bscs/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to delete BSCS roadmap');
    }
  }
);
