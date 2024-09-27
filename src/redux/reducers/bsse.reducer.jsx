import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllBSSE,
  getBSSEById,
  createBSSE,
  updateBSSE,
  deleteBSSE,
  updateCourseInBSSE,
  deleteCourseInBSSE,
} from '../actions/bsse.action';

const initialState = {
  bsse: [],
  selectedRoadmap: null,
  loading: false,
  error: null,
};

const bsseSlice = createSlice({
  name: 'bsse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all BSCS roadmaps
      .addCase(fetchAllBSSE.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBSSE.fulfilled, (state, action) => {
        state.loading = false;
        state.bsse = action.payload;
      })
      .addCase(fetchAllBSSE.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get BSCS roadmap by ID
      .addCase(getBSSEById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBSSEById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRoadmap = action.payload;
      })
      .addCase(getBSSEById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create a new BSCS roadmap
      .addCase(createBSSE.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBSSE.fulfilled, (state, action) => {
        state.loading = false;
        state.bsse.push(action.payload);
      })
      .addCase(createBSSE.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update an existing BSCS roadmap
      .addCase(updateBSSE.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBSSE.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bsse.findIndex((bsse) => bsse._id === action.payload._id);
        if (index !== -1) {
          state.bsse[index] = action.payload;
        }
      })
      .addCase(updateBSSE.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a BSCS roadmap
      .addCase(deleteBSSE.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBSSE.fulfilled, (state, action) => {
        state.loading = false;
        state.bsse = state.bsse.filter((bsse) => bsse._id !== action.payload);
      })
      .addCase(deleteBSSE.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update a specific course within a BSCS roadmap
      .addCase(updateCourseInBSSE.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourseInBSSE.fulfilled, (state, action) => {
        state.loading = false;
        const { roadmapId, updatedCourse } = action.payload;
        const roadmapIndex = state.bsse.findIndex((bsse) => bsse._id === roadmapId);
        if (roadmapIndex !== -1) {
          const courseIndex = state.bsse[roadmapIndex].courses.findIndex(course => course._id === updatedCourse._id);
          if (courseIndex !== -1) {
            state.bsse[roadmapIndex].courses[courseIndex] = updatedCourse;
          }
        }
      })
      .addCase(updateCourseInBSSE.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a specific course within a BSCS roadmap
      .addCase(deleteCourseInBSSE.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCourseInBSSE.fulfilled, (state, action) => {
        state.loading = false;
        const { roadmapId, courseId } = action.payload;
        const roadmapIndex = state.bsse.findIndex((bsse) => bsse._id === roadmapId);
        if (roadmapIndex !== -1) {
          state.bsse[roadmapIndex].courses = state.bsse[roadmapIndex].courses.filter(c => c._id !== courseId);
        }
      })
      .addCase(deleteCourseInBSSE.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bsseSlice.reducer;
