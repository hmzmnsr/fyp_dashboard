import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPHDCS,
  getPHDCSById,
  createPHDCS,
  updatePHDCS,
  deletePHDCS,
  updateCourseInPHDCS,
  deleteCourseInPHDCS,
} from '../actions/phdcs.action';

const initialState = {
  phdcs: [],
  selectedRoadmap: null,
  loading: false,
  error: null,
};

const phdcsSlice = createSlice({
  name: 'phdcs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all BSCS roadmaps
      .addCase(fetchAllPHDCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPHDCS.fulfilled, (state, action) => {
        state.loading = false;
        state.phdcs = action.payload;
      })
      .addCase(fetchAllPHDCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get BSCS roadmap by ID
      .addCase(getPHDCSById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPHDCSById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRoadmap = action.payload;
      })
      .addCase(getPHDCSById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create a new BSCS roadmap
      .addCase(createPHDCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPHDCS.fulfilled, (state, action) => {
        state.loading = false;
        state.phdcs.push(action.payload);
      })
      .addCase(createPHDCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update an existing BSCS roadmap
      .addCase(updatePHDCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePHDCS.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.phdcs.findIndex((phdcs) => phdcs._id === action.payload._id);
        if (index !== -1) {
          state.phdcs[index] = action.payload;
        }
      })
      .addCase(updatePHDCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a BSCS roadmap
      .addCase(deletePHDCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePHDCS.fulfilled, (state, action) => {
        state.loading = false;
        state.phdcs = state.phdcs.filter((phdcs) => phdcs._id !== action.payload);
      })
      .addCase(deletePHDCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update a specific course within a BSCS roadmap
      .addCase(updateCourseInPHDCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourseInPHDCS.fulfilled, (state, action) => {
        state.loading = false;
        const { roadmapId, course } = action.payload;
        const roadmapIndex = state.phdcs.findIndex((phdcs) => phdcs._id === roadmapId);
        if (roadmapIndex !== -1) {
          const courseIndex = state.phdcs[roadmapIndex].courses.findIndex(c => c._id === course._id);
          if (courseIndex !== -1) {
            state.phdcs[roadmapIndex].courses[courseIndex] = course;
          }
        }
      })
      .addCase(updateCourseInPHDCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a specific course within a BSCS roadmap
      .addCase(deleteCourseInPHDCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCourseInPHDCS.fulfilled, (state, action) => {
        state.loading = false;
        const { roadmapId, courseId } = action.payload;
        const roadmapIndex = state.phdcs.findIndex((phdcs) => phdcs._id === roadmapId);
        if (roadmapIndex !== -1) {
          state.phdcs[roadmapIndex].courses = state.phdcs[roadmapIndex].courses.filter(c => c._id !== courseId);
        }
      })
      .addCase(deleteCourseInPHDCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default phdcsSlice.reducer;
