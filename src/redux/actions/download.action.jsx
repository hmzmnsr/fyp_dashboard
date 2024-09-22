import api from "../../services/api";
import { createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all downloads
export const fetchDownloads = createAsyncThunk(
    'downloads/fetchDownloads',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/downloads');
            const downloads = response.data; 
            return downloads;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'Network error');
        }
    }
);

// Create a new download
export const createDownload = createAsyncThunk(
    'downloads/createDownload',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await api.post('/downloads', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const createdDownload = response.data.data;
            return createdDownload;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'Network error');
        }
    }
);

// Update an existing download
export const updateDownload = createAsyncThunk(
    'downloads/updateDownload',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/downloads/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const updatedDownload = response.data.data;
            return updatedDownload;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'Network error');
        }
    }
);

// Delete a download
export const deleteDownload = createAsyncThunk(
    'downloads/deleteDownload',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/downloads/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'Network error');
        }
    }
);
