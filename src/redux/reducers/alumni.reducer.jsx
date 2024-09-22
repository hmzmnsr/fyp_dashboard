import { createSlice } from '@reduxjs/toolkit';
import { fetchAlumni, createAlumni, updateAlumni, deleteAlumni } from "../actions/alumni.action";

const initialState = {
  alumni: [],
  loading: false,
  error: null,
};

const alumniSlice = createSlice({
  name: 'alumni',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all alumni
      .addCase(fetchAlumni.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlumni.fulfilled, (state, action) => {
        state.loading = false;
        state.alumni = action.payload;
      })
      .addCase(fetchAlumni.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) 
      // Create a new faculty member
      .addCase(createAlumni.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAlumni.fulfilled, (state, action) => {
        state.loading = false;
        state.alumni.push(action.payload);
      })
      .addCase(createAlumni.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update an existing faculty member
      .addCase(updateAlumni.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAlumni.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.alumni.findIndex((alumni) => alumni._id === action.payload._id);
        if (index !== -1) {
          state.alumni[index] = action.payload;
        }
      })
      .addCase(updateAlumni.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete a faculty member
      .addCase(deleteAlumni.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAlumni.fulfilled, (state, action) => {
        state.loading = false;
        state.alumni = state.alumni.filter((alumni) => alumni._id !== action.payload);
      })
      .addCase(deleteAlumni.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default alumniSlice.reducer;
