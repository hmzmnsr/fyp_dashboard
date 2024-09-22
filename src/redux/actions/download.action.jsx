import api from "../../services/api";
import { createAsyncThunk } from '@reduxjs/toolkit';

// Helper function to extract file name from the file path
const getFileName = (filePath) => {
    const fullFileName = filePath.split(/(\\|\/)/).pop();
    return fullFileName.includes('_') ? fullFileName.split('_').pop() : fullFileName;
};

// Fetch all downloads and strip file paths to keep only file names for frontend display
export const fetchDownloads = createAsyncThunk(
    'downloads/fetchDownloads',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/downloads');
            // Map the response to include file name only
            const downloads = response.data.map(download => ({
                ...download,
                attachment: getFileName(download.attachment), // Extract file name for display
            }));
            return downloads;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'Network error');
        }
    }
);

// Create a new download with multipart form data (handling file upload)
export const createDownload = createAsyncThunk(
    'downloads/createDownload',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await api.post('/downloads', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // Return the created download with file name extracted from full path
            const createdDownload = {
                ...response.data.data,
                attachment: getFileName(response.data.data.attachment), // Keep only the file name
            };
            return createdDownload;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'Network error');
        }
    }
);

// Update an existing download with file upload support
export const updateDownload = createAsyncThunk(
    'downloads/updateDownload',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/downloads/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // Return the updated download with file name extracted from full path
            const updatedDownload = {
                ...response.data.data,
                attachment: getFileName(response.data.data.attachment), // Extract file name
            };
            return updatedDownload;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'Network error');
        }
    }
);

// Delete a download by ID
export const deleteDownload = createAsyncThunk(
    'downloads/deleteDownload',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/downloads/${id}`);
            return id; // Return the ID to remove it from the Redux store
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'Network error');
        }
    }
);
