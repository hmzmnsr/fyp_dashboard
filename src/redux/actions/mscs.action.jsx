import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchAllMSCS = createAsyncThunk(
  'mscs/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/mscs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const getMSCSById = createAsyncThunk(
  'mscs/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/mscs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const createMSCS = createAsyncThunk(
  'mscs/create',
  async (mscsData, { rejectWithValue }) => {
    try {
      const response = await api.post('/mscs', mscsData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const updateMSCS = createAsyncThunk(
  'mscs/update',
  async ({ _id, mscsData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/mscs/${_id}`, mscsData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to update MSCS roadmap');
    }
  }
);

export const deleteMSCS = createAsyncThunk(
  'mscs/delete',
  async (_id, { rejectWithValue }) => {
    try {
      await api.delete(`/mscs/${_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return _id; 
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to delete MSCS roadmap');
    }
  }
);

export const updateCourseInMSCS = createAsyncThunk(
  'mscs/updateCourse',
  async ({ roadmapId, courseId, courseData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/mscs/${roadmapId}/course/${courseId}`, courseData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to update course in MSCS roadmap');
    }
  }
);



export const deleteCourseInMSCS = createAsyncThunk(
  'bscs/deleteCourse',
  async ({ roadmapId, courseId }, { rejectWithValue }) => {
      try {
          await api.delete(`/bscs/${roadmapId}/course/${courseId}`, {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
          });
          return courseId;
      } catch (error) {
          return rejectWithValue(error.response ? error.response.data : 'Failed to delete course from BSCS roadmap');
      }
  }
);


   
