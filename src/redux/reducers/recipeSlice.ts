import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiData from "../../utils/apiData.json";
import { IRecipe } from "../../interfaces/IRecipe";

interface IRecipeState {
  recipes: Array<IRecipe>;
  status: string;
  error: string | null;
  category: "lunch" | "breakfast" | "dinner";
}

const initialState: IRecipeState = {
  recipes: [],
  status: "idle",
  error: null,
  category: "breakfast",
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async function (category: "lunch" | "breakfast" | "dinner") {
    try {
      /* const response = await fetch("../../utils/apiData.json");
      const data = await response.json(); */
      const data = apiData.filter(
        (recipe: IRecipe) => recipe.category === category
      );
      return { recipes: data, category: category };
    } catch (error) {
      // Обработка ошибок, если не удается загрузить данные
      throw Error("Failed to fetch recipes.");
    }
  }
);

/* export const setCategory = createAsyncThunk(
  "category/setCategory",
  async function (category){
    await fetchRecipes(category)
  }
) */

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.recipes.push(action.payload);
    },
    /* setCategory: (state, action) => {
      state.category = action.payload;
      fetchRecipes(action.payload);
    }, */
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
        /* state.error = action.error.message; */
      });
  },
});

export const { addRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
