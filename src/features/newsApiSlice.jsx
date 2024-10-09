import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const newsApiSlice = createSlice({
  name: "newApi",
  initialState,
  reducers: {
    setNews: (state, { payload }) => {
      state = payload;
      return state;
    },
  },
});

export const { setNews } = newsApiSlice.actions;

export default newsApiSlice.reducer;
