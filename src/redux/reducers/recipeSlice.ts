import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiData from "../../utils/apiData.json";
import { IRecipe } from "../../interfaces/IRecipe";

interface IRecipeState {
  recipes: Array<IRecipe>;
  status: string;
  error: string | null;
}

const initialState: IRecipeState = {
  recipes: [],
  status: "idle",
  error: null,
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async function () {
    try {
      /* const response = await fetch("../../utils/apiData.json");
      const data = await response.json(); */
      const data = apiData;
      return data;
    } catch (error) {
      // Обработка ошибок, если не удается загрузить данные
      throw Error("Failed to fetch recipes.");
    }
  }
);

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.recipes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        /* state.error = action.error.message; */
      });
  },
});

export const { addRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
