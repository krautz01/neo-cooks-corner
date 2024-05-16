import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRecipe } from "../../interfaces/IRecipe";
import apiData from "../../utils/apiData.json";

interface ISearchState {
  recipes: Array<IRecipe>;
  status: string;
  error: string | null;
  searchTerm: string;
}

const initialState: ISearchState = {
  recipes: [],
  status: "idle",
  error: null,
  searchTerm: "",
};

export const searchRecipes = createAsyncThunk(
  "search/searchRecipes",
  async function (searchTerm: string) {
    if (searchTerm === "") {
      return {
        recipes: [],
        searchTerm: searchTerm,
      };
    }
    try {
      /* const response = await fetch("../../utils/apiData.json");
      const data = await response.json(); */
      const data = apiData.filter((recipe: IRecipe) =>
        recipe.title.includes(searchTerm)
      );
      return { recipes: data, searchTerm: searchTerm };
    } catch (error) {
      // Обработка ошибок, если не удается загрузить данные
      throw Error("Failed to fetch recipes.");
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
        /* state.error = action.error.message; */
      });
  },
});

/* export const { searchRecipes } = searchSlice.actions; */
export default searchSlice.reducer;
