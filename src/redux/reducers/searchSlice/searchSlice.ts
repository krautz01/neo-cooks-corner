import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISearchState } from "./interface";
import axios from "axios";

const initialState: ISearchState = {
  recipes: [],
  status: "idle",
  error: null,
  searchTerm: "",
};

export const searchRecipes = createAsyncThunk(
  "search/searchRecipes",
  async function (searchTerm: string) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://165.227.147.154:8081/api/recipes/search?title=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { recipes: response.data, searchTerm: searchTerm }; // action payload
    } catch (error) {
      throw Error("Failed to fetch recipes");
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.recipes = action.payload.recipes;
        state.searchTerm = action.payload.searchTerm;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

/* export const { searchRecipes } = searchSlice.actions; */
export default searchSlice.reducer;
