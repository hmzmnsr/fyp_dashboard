import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchAllADPCS = createAsyncThunk(
  'adpcs/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/adpcs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const getADPCSById = createAsyncThunk(
  'adpcs/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/adpcs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const createADPCS = createAsyncThunk(
  'adpcs/create',
  async (adpcsData, { rejectWithValue }) => {
    try {
      const response = await api.post('/adpcs', adpcsData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const updateADPCS = createAsyncThunk(
  'adpcs/update',
  async ({ _id, adpcsData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/adpcs/${_id}`, adpcsData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to update ADPCS roadmap');
    }
  }
);

export const deleteADPCS = createAsyncThunk(
  'adpcs/delete',
  async (_id, { rejectWithValue }) => {
    try {
      await api.delete(`/adpcs/${_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return _id; 
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to delete ADPCS roadmap');
    }
  }
);

export const updateCourseInADPCS = createAsyncThunk(
  'adpcs/updateCourse',
  async ({ roadmapId, courseId, courseData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/adpcs/${roadmapId}/course/${courseId}`, courseData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to update course in ADPCS roadmap');
    }
  }
);



export const deleteCourseInADPCS = createAsyncThunk(
  'adpcs/deleteCourse',
  async ({ roadmapId, courseId }, { rejectWithValue }) => {
      try {
          await api.delete(`/adpcs/${roadmapId}/course/${courseId}`, {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
          });
          return courseId;
      } catch (error) {
          return rejectWithValue(error.response ? error.response.data : 'Failed to delete course from ADPCS roadmap');
      }
  }
);


   
