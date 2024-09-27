import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllADPCS,
  getADPCSById,
  createADPCS,
  updateADPCS,
  deleteADPCS,
  updateCourseInADPCS,
  deleteCourseInADPCS,
} from '../actions/adpcs.action';

const initialState = {
  adpcs: [],
  selectedRoadmap: null,
  loading: false,
  error: null,
};

const adpcsSlice = createSlice({
  name: 'adpcs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all adpcs roadmaps
      .addCase(fetchAllADPCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllADPCS.fulfilled, (state, action) => {
        state.loading = false;
        state.adpcs = action.payload;
      })
      .addCase(fetchAllADPCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get adpcs roadmap by ID
      .addCase(getADPCSById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getADPCSById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRoadmap = action.payload;
      })
      .addCase(getADPCSById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create a new adpcs roadmap
      .addCase(createADPCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(createADPCS.fulfilled, (state, action) => {
        state.loading = false;
        state.adpcs.push(action.payload);
      })
      .addCase(createADPCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update an existing adpcs roadmap
      .addCase(updateADPCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateADPCS.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.adpcs.findIndex((adpcs) => adpcs._id === action.payload._id);
        if (index !== -1) {
          state.adpcs[index] = action.payload;
        }
      })
      .addCase(updateADPCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a adpcs roadmap
      .addCase(deleteADPCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteADPCS.fulfilled, (state, action) => {
        state.loading = false;
        state.adpcs = state.adpcs.filter((adpcs) => adpcs._id !== action.payload);
      })
      .addCase(deleteADPCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update a specific course within a adpcs roadmap
      .addCase(updateCourseInADPCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourseInADPCS.fulfilled, (state, action) => {
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
      .addCase(updateCourseInADPCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a specific course within a adpcs roadmap
      .addCase(deleteCourseInADPCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCourseInADPCS.fulfilled, (state, action) => {
        state.loading = false;
        const { roadmapId, courseId } = action.payload;
        const roadmapIndex = state.adpcs.findIndex((adpcs) => adpcs._id === roadmapId);
        if (roadmapIndex !== -1) {
          state.adpcs[roadmapIndex].courses = state.adpcs[roadmapIndex].courses.filter(c => c._id !== courseId);
        }
      })
      .addCase(deleteCourseInADPCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adpcsSlice.reducer;
