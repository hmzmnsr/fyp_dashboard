import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchAllPHDCS = createAsyncThunk(
  'phdcs/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/phdcs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const getPHDCSById = createAsyncThunk(
  'phdcs/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/phdcs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const createPHDCS = createAsyncThunk(
  'phdcs/create',
  async (phdcsData, { rejectWithValue }) => {
    try {
      const response = await api.post('/phdcs', phdcsData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const updatePHDCS = createAsyncThunk(
  'phdcs/update',
  async ({ _id, phdcsData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/phdcs/${_id}`, phdcsData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to update PHDCS roadmap');
    }
  }
);

export const deletePHDCS = createAsyncThunk(
  'phdcs/delete',
  async (_id, { rejectWithValue }) => {
    try {
      await api.delete(`/phdcs/${_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return _id; 
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to delete PHDCS roadmap');
    }
  }
);

export const updateCourseInPHDCS = createAsyncThunk(
  'phdcs/updateCourse',
  async ({ roadmapId, courseId, courseData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/phdcs/${roadmapId}/course/${courseId}`, courseData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to update course in PHDCS roadmap');
    }
  }
);



export const deleteCourseInPHDCS = createAsyncThunk(
  'phdcs/deleteCourse',
  async ({ roadmapId, courseId }, { rejectWithValue }) => {
      try {
          await api.delete(`/phdcs/${roadmapId}/course/${courseId}`, {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
          });
          return courseId;
      } catch (error) {
          return rejectWithValue(error.response ? error.response.data : 'Failed to delete course from PHDCS roadmap');
      }
  }
);


   
