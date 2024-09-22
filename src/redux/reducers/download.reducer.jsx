import { createSlice } from '@reduxjs/toolkit';
import { fetchDownloads, createDownload, updateDownload, deleteDownload } from "../actions/download.action";

const initialState = {
    downloads: [],
    loading: false,
    error: null,
};

const downloadSlice = createSlice({
    name: 'downloads',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch downloads
            .addCase(fetchDownloads.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDownloads.fulfilled, (state, action) => {
                state.loading = false;
                state.downloads = action.payload; // Payload already has the file name
            })
            .addCase(fetchDownloads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create download
            .addCase(createDownload.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDownload.fulfilled, (state, action) => {
                state.loading = false;
                state.downloads.push(action.payload); // Payload already has the file name
            })
            .addCase(createDownload.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update download
            .addCase(updateDownload.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateDownload.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.downloads.findIndex(download => download._id === action.payload._id);
                if (index !== -1) {
                    state.downloads[index] = action.payload; // Payload already has the file name
                }
            })
            .addCase(updateDownload.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete download
            .addCase(deleteDownload.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteDownload.fulfilled, (state, action) => {
                state.loading = false;
                state.downloads = state.downloads.filter(download => download._id !== action.payload);
            })
            .addCase(deleteDownload.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default downloadSlice.reducer;
