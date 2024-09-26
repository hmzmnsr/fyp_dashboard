import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchAllBSCS = createAsyncThunk(
  'bscs/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/bscs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const getBSCSById = createAsyncThunk(
  'bscs/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/bscs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const createBSCS = createAsyncThunk(
  'bscs/create',
  async (bscsData, { rejectWithValue }) => {
    try {
      const response = await api.post('/bscs', bscsData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const updateBSCS = createAsyncThunk(
  'bscs/update',
  async ({ _id, bscsData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/bscs/${_id}`, bscsData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to update BSCS roadmap');
    }
  }
);

export const deleteBSCS = createAsyncThunk(
  'bscs/delete',
  async (_id, { rejectWithValue }) => {
    try {
      await api.delete(`/bscs/${_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return _id; 
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to delete BSCS roadmap');
    }
  }
);

export const updateCourseInBSCS = createAsyncThunk(
  'bscs/updateCourse',
  async ({ roadmapId, courseId, courseData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/bscs/${roadmapId}/course/${courseId}`, courseData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to update course in BSCS roadmap');
    }
  }
);

export const deleteCourseInBSCS = createAsyncThunk(
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


   
