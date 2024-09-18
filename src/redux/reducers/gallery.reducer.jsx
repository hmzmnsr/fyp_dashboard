import { createSlice } from "@reduxjs/toolkit";
import { fetchAlbums, createAlbum, updateAlbum, deleteAlbum } from "../actions/gallery.action.jsx";

const initialState = {
  albums: [],
  loading: false,
  error: null,
};

export const gallerySlice = createSlice({
  name: "GALLERY",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Albums
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Album
      .addCase(createAlbum.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAlbum.fulfilled, (state, action) => {
        state.loading = false;
        state.albums.push(action.payload);
      })
      .addCase(createAlbum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Album
      .addCase(updateAlbum.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAlbum.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = state.albums.map(album => 
          album._id === action.payload._id ? action.payload : album
        );
      })
      .addCase(updateAlbum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Album
      .addCase(deleteAlbum.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = state.albums.filter(album => album._id !== action.payload);
      })
      .addCase(deleteAlbum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default gallerySlice.reducer;