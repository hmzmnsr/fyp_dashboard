import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Fetch all albums
export const fetchAlbums = createAsyncThunk(
  'gallery/fetchAlbums',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/gallery/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching albums:', error);
      return rejectWithValue('Failed to fetch albums');
    }
  }
);

// Create album
export const createAlbum = createAsyncThunk(
  'gallery/createAlbum',
  async (albumData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', albumData.name);

      if (albumData.coverPhoto) {
        formData.append('coverPhoto', albumData.coverPhoto);
      }

      if (albumData.images && Array.isArray(albumData.images)) {
        albumData.images.forEach((image) => {
          formData.append('images', image);
        });
      }

      const response = await api.post('/gallery/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating album:', error);
      return rejectWithValue('Failed to create album');
    }
  }
);

// Update album
export const updateAlbum = createAsyncThunk(
  'gallery/updateAlbum',
  async ({ _id, albumData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', albumData.name);

      if (albumData.coverPhoto) {
        formData.append('coverPhoto', albumData.coverPhoto);
      }

      if (albumData.images && Array.isArray(albumData.images)) {
        albumData.images.forEach((image) => {
          formData.append('images', image);
        });
      }

      const response = await api.put(`/gallery/${_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error updating album:', error);
      return rejectWithValue('Failed to update album');
    }
  }
);

// Delete album
export const deleteAlbum = createAsyncThunk(
  'gallery/deleteAlbum',
  async (albumId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/gallery/${albumId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting album:', error);
      return rejectWithValue('Failed to delete album');
    }
  }
);
