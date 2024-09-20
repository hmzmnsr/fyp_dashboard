import { createSlice } from '@reduxjs/toolkit';
import { fetchPrograms, createProgram, updateProgram, deleteProgram } from "../actions/program.action";

const initialState = {
  programs: [],
  loading: false,
  error: null,
};

const programSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all programs
      .addCase(fetchPrograms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.programs = action.payload;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create a new program
      .addCase(createProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.programs.push(action.payload);
      })
      .addCase(createProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update an existing program
      .addCase(updateProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProgram.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.programs.findIndex((program) => program._id === action.payload._id);
        if (index !== -1) {
          state.programs[index] = action.payload;
        }
      })
      .addCase(updateProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete a program
      .addCase(deleteProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.programs = state.programs.filter((program) => program._id !== action.payload);
      })
      .addCase(deleteProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default programSlice.reducer;
