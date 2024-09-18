import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../reducers/profile.reducer";
import systemReducer from "../reducers/system.reducer";
import galleryReducer from "../reducers/gallery.reducer";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    system: systemReducer,
    gallery: galleryReducer,
  },
});
