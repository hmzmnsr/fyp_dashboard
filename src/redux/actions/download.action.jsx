import api from "../../services/api";
import { createAsyncThunk } from '@reduxjs/toolkit';

// Async actions for Downloads
export const fetchDownloads = createAsyncThunk('downloads/fetchDownloads', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/downloads');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const createDownload = createAsyncThunk('downloads/createDownload', async (formData, { rejectWithValue }) => {
    try {
        const response = await api.post('/downloads', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateDownload = createAsyncThunk('downloads/updateDownload', async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/downloads/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteDownload = createAsyncThunk('downloads/deleteDownload', async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/downloads/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
