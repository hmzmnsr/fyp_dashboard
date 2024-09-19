import { createSlice } from '@reduxjs/toolkit';
import { fetchFaculty, createFaculty, updateFaculty, deleteFaculty } from '../actions/faculty.action';

const initialState = {
  faculties: [],
  loading: false,
  error: null,
};

const facultySlice = createSlice({
  name: 'faculty',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all faculty members
      .addCase(fetchFaculty.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFaculty.fulfilled, (state, action) => {
        state.loading = false;
        state.faculties = action.payload;
      })
      .addCase(fetchFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create a new faculty member
      .addCase(createFaculty.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFaculty.fulfilled, (state, action) => {
        state.loading = false;
        state.faculties.push(action.payload);
      })
      .addCase(createFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update an existing faculty member
      .addCase(updateFaculty.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFaculty.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.faculties.findIndex((faculty) => faculty._id === action.payload._id);
        if (index !== -1) {
          state.faculties[index] = action.payload;
        }
      })
      .addCase(updateFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete a faculty member
      .addCase(deleteFaculty.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFaculty.fulfilled, (state, action) => {
        state.loading = false;
        state.faculties = state.faculties.filter((faculty) => faculty._id !== action.payload);
      })
      .addCase(deleteFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default facultySlice.reducer;
