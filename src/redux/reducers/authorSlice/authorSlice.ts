import { IAuthorState } from "./interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: IAuthorState = {
  status: null,
  error: null,
  author: null,
};

export const fetchAuthor = createAsyncThunk(
  "register/registerUser",
  async function (userId: string | undefined, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `http://165.227.147.154:8081/api/users/${userId}`
      );
      return { author: response.data.author }; // action payload
    } catch (error) {
      return rejectWithValue("Failed to fetch author");
    }
  }
);

export const authorSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthor.pending, (state) => {
        state.status = "loading";
        state.status = null;
      })
      .addCase(fetchAuthor.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.author = action.payload.author;
      })
      .addCase(fetchAuthor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {} = authorSlice.actions;
export default authorSlice.reducer;
