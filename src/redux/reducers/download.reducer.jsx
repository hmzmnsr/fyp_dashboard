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
            .addCase(fetchDownloads.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDownloads.fulfilled, (state, action) => {
                state.loading = false;
                state.downloads = action.payload;
            })
            .addCase(fetchDownloads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createDownload.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDownload.fulfilled, (state, action) => {
                state.loading = false;
                state.downloads.push(action.payload);
            })
            .addCase(createDownload.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateDownload.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateDownload.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.downloads.findIndex(download => download._id === action.payload._id);
                if (index !== -1) {
                    state.downloads[index] = action.payload;
                }
            })
            .addCase(updateDownload.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
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
