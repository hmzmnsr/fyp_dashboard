import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all faculty members
export const fetchFaculty = createAsyncThunk(
    'faculty/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/faculty');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Create a new faculty member
export const createFaculty = createAsyncThunk(
    'faculty/create',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/faculty', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Update an existing faculty member
export const updateFaculty = createAsyncThunk(
    'faculty/update',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/faculty/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Delete a faculty member
export const deleteFaculty = createAsyncThunk(
    'faculty/delete',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`/api/faculty/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
