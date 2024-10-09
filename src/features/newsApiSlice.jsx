import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  newsData: [],
  error: false,
  loading: false,
};

export const getNewsData = createAsyncThunk(
  "getNews", //type ismi
  async () => {
    //Api istek fonksiyonu
    const API_KEY = "1a1a999e0d7240a6bd2dead87bcca78e";
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
    const { data } = await axios.get(url);
    console.log("data", data.articles);
    return data.data.articles;
  }
);

const newsApiSlice = createSlice({
  name: "newApi",
  initialState,
  reducers: {
    clearNewsData: (state) => {
      state.newsData = [];
    },
    // setNewsData: (state, { payload }) => {},
  },
});

export const { setNews } = newsApiSlice.actions;

export default newsApiSlice.reducer;
