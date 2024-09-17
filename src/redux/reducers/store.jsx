// store.js
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../reducers/profile.reducer";
import systemReducer from "../reducers/system.reducer"

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    system: systemReducer,
  },
});
