import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllMSCS,
  getMSCSById,
  createMSCS,
  updateMSCS,
  deleteMSCS,
  updateCourseInMSCS,
  deleteCourseInMSCS,
} from '../actions/mscs.action';

const initialState = {
  mscs: [],
  selectedRoadmap: null,
  loading: false,
  error: null,
};

const mscsSlice = createSlice({
  name: 'mscs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all mscs roadmaps
      .addCase(fetchAllMSCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMSCS.fulfilled, (state, action) => {
        state.loading = false;
        state.mscs = action.payload;
      })
      .addCase(fetchAllMSCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get mscs roadmap by ID
      .addCase(getMSCSById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMSCSById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRoadmap = action.payload;
      })
      .addCase(getMSCSById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create a new mscs roadmap
      .addCase(createMSCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMSCS.fulfilled, (state, action) => {
        state.loading = false;
        state.mscs.push(action.payload);
      })
      .addCase(createMSCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update an existing mscs roadmap
      .addCase(updateMSCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMSCS.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.mscs.findIndex((mscs) => mscs._id === action.payload._id);
        if (index !== -1) {
          state.mscs[index] = action.payload;
        }
      })
      .addCase(updateMSCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a mscs roadmap
      .addCase(deleteMSCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMSCS.fulfilled, (state, action) => {
        state.loading = false;
        state.mscs = state.mscs.filter((mscs) => mscs._id !== action.payload);
      })
      .addCase(deleteMSCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update a specific course within a mscs roadmap
      .addCase(updateCourseInMSCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourseInMSCS.fulfilled, (state, action) => {
        state.loading = false;
        const { roadmapId, course } = action.payload;
        const roadmapIndex = state.mscs.findIndex((mscs) => mscs._id === roadmapId);
        if (roadmapIndex !== -1) {
          const courseIndex = state.mscs[roadmapIndex].courses.findIndex(c => c._id === course._id);
          if (courseIndex !== -1) {
            state.mscs[roadmapIndex].courses[courseIndex] = course;
          }
        }
      })
      .addCase(updateCourseInMSCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a specific course within a mscs roadmap
      .addCase(deleteCourseInMSCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCourseInMSCS.fulfilled, (state, action) => {
        state.loading = false;
        const { roadmapId, courseId } = action.payload;
        const roadmapIndex = state.mscs.findIndex((mscs) => mscs._id === roadmapId);
        if (roadmapIndex !== -1) {
          state.mscs[roadmapIndex].courses = state.mscs[roadmapIndex].courses.filter(c => c._id !== courseId);
        }
      })
      .addCase(deleteCourseInMSCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mscsSlice.reducer;
