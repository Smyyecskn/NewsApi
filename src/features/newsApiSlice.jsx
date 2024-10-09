import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  newsData: [],
  error: false,
  loading: false,
};

//! APİ İSTEĞİ OLDUGUNDA create asyncthunk KULLANMALI.
export const getNewsData = createAsyncThunk(
  "getNews", //type ismi
  async () => {
    //Api istek fonksiyonu
    const API_KEY = "1a1a999e0d7240a6bd2dead87bcca78e";
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
    // console.log(url);
    const { data } = await axios(url);
    console.log("data", data.articles);
    return data.articles;
  }
);

const newsApiSlice = createSlice({
  name: "newApi",
  initialState,
  reducers: {
    clearNewsData: (state) => {
      state.newsData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewsData.fulfilled, (state, action) => {
        state.loading = false;
        state.newsData = action.payload;
      })
      .addCase(getNewsData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { clearNewsData } = newsApiSlice.actions;

export default newsApiSlice.reducer;
