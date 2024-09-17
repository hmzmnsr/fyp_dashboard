// reducers/system.reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { PageNames } from "../../utils/enums";

const initialState = {
  page: PageNames.HOME,
};

export const systemSlice = createSlice({
  name: "SYSTEM",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setCurrentPage } = systemSlice.actions;

export default systemSlice.reducer;
