import { createSlice } from "@reduxjs/toolkit";
import { getProfile, loginUser } from "../actions/user.action";

const initialState = {
  profile: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const profileSlice = createSlice({
  name: "PROFILE",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.profile = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.profile = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logOut } = profileSlice.actions;

export default profileSlice.reducer;
