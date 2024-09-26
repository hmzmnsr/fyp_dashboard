import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchAllBSSE = createAsyncThunk(
  'bsse/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/bsse');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const getBSSEById = createAsyncThunk(
  'bsse/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/bsse/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const createBSSE = createAsyncThunk(
  'bsse/create',
  async (bsseData, { rejectWithValue }) => {
    try {
      const response = await api.post('/bsse', bsseData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const updateBSSE = createAsyncThunk(
  'bsse/update',
  async ({ _id, bsseData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/bsse/${_id}`, bsseData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to update BSSE roadmap');
    }
  }
);

export const deleteBSSE = createAsyncThunk(
  'bsse/delete',
  async (_id, { rejectWithValue }) => {
    try {
      await api.delete(`/bsse/${_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return _id; 
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to delete BSSE roadmap');
    }
  }
);

export const updateCourseInBSSE = createAsyncThunk(
  'bsse/updateCourse',
  async ({ roadmapId, courseId, courseData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/bsse/${roadmapId}/course/${courseId}`, courseData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to update course in BSSE roadmap');
    }
  }
);



export const deleteCourseInBSSE = createAsyncThunk(
  'bsse/deleteCourse',
  async ({ roadmapId, courseId }, { rejectWithValue }) => {
      try {
          await api.delete(`/bsse/${roadmapId}/course/${courseId}`, {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
          });
          return courseId;
      } catch (error) {
          return rejectWithValue(error.response ? error.response.data : 'Failed to delete course from BSSE roadmap');
      }
  }
);


   
