import { createSlice } from '@reduxjs/toolkit';
import { fetchAllBSCS, getBSCSById, createBSCS, updateBSCS, deleteBSCS, } from "../actions/bscs.action";

const initialState = {
  bscs: [],
  selectedRoadmap: null,
  loading: false,
  error: null,
};

const bscsSlice = createSlice({
  name: 'bscs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all BSCS roadmaps
      .addCase(fetchAllBSCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBSCS.fulfilled, (state, action) => {
        state.loading = false;
        state.bscs = action.payload;
      })
      .addCase(fetchAllBSCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get BSCS roadmap by ID
      .addCase(getBSCSById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBSCSById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRoadmap = action.payload;
      })
      .addCase(getBSCSById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create a new BSCS roadmap
      .addCase(createBSCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBSCS.fulfilled, (state, action) => {
        state.loading = false;
        state.bscs.push(action.payload);
      })
      .addCase(createBSCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update an existing BSCS roadmap
      .addCase(updateBSCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBSCS.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bscs.findIndex((bscs) => bscs._id === action.payload._id);
        if (index !== -1) {
          state.bscs[index] = action.payload;
        }
      })
      .addCase(updateBSCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete a BSCS roadmap
      .addCase(deleteBSCS.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBSCS.fulfilled, (state, action) => {
        state.loading = false;
        state.bscs = state.bscs.filter((bscs) => bscs._id !== action.payload);
      })
      .addCase(deleteBSCS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bscsSlice.reducer;
