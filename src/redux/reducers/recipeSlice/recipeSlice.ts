import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRecipesState } from "./interface";
import axios from "axios";

const initialState: IRecipesState = {
  recipes: [],
  status: "idle",
  error: null,
  category: "BREAKFAST",
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async function (category: "LUNCH" | "BREAKFAST" | "DINNER") {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://165.227.147.154:8081/api/recipes?category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { recipes: response.data, category: category };
    } catch (error) {
      throw Error("Failed to fetch recipes");
    }
  }
);

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.recipes = action.payload;
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
        state.recipes = action.payload.recipes;
        state.category = action.payload.category;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { addRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
