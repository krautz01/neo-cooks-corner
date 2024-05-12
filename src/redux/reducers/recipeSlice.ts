import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IRecipeState {
  recipe: Array<object>;
}

const initialState: IRecipeState = {
  recipe: [],
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Array<object>>) => {
      state.recipe = action.payload;
    },
    removeRecipe: (state) => {
      state.recipe = [];
    },
  },
});

export const { addRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
