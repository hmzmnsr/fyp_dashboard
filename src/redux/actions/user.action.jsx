import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Fetch user profile
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/users/profile");
      return data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return rejectWithValue("Failed to fetch profile");
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/users/login", credentials);
      if (data.token) {
        localStorage.setItem("token", data.token);
        return { token: data.token };
      }
      return rejectWithValue("Incorrect Email/Password");
    } catch (error) {
      console.error("Login failed", error);
      return rejectWithValue("Incorrect Email/Password");
    }
  }
);

// Create user
export const createUser = createAsyncThunk(
  "auth/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/users", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      return rejectWithValue("Failed to create user");
    }
  }
);

// Update password
export const updatePassword = createAsyncThunk(
  "profile/updatePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      await api.patch("/users/password", { oldPassword, newPassword });
    } catch (error) {
      console.error("Error updating password:", error);
      return rejectWithValue("Failed to update password");
    }
  }
);

// Update user profile
export const updateUser = createAsyncThunk(
  "profile/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/users/profile", userData);
      return data;
    } catch (error) {
      console.error("Error updating profile:", error);
      return rejectWithValue("Failed to update profile");
    }
  }
);
