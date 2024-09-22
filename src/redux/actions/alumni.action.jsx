import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch all faculty members
export const fetchAlumni = createAsyncThunk(
  'alumni/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/alumni');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new faculty member
export const createAlumni = createAsyncThunk(
    'alumni/create',
    async (alumniData, { rejectWithValue }) => {
      try {
        const response = await api.post('/alumni', alumniData, {
          headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );
  

// Update an existing faculty member
export const updateAlumni = createAsyncThunk(
    'alumni/update',
    async ({ _id, alumniData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/alumni/${_id}`, alumniData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'Failed to update alumni');
        }
    }
);


// Delete a faculty member
export const deleteAlumni = createAsyncThunk(
    'alumni/delete',
    async (_id, { rejectWithValue }) => {
      try {
        await api.delete(`/alumni/${_id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        return _id;
      } catch (error) {
        console.error('Error deleting alumni:', error);
        return rejectWithValue(error.response ? error.response.data : 'Failed to delete alumni');
      }
    }
  );
  
  