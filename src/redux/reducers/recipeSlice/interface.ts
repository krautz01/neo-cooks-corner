import { IRecipe } from "@interfaces/IRecipe";

export interface IRecipesState {
  recipes: Array<IRecipe>;
  recipeById: IRecipe | null;
  status: string;
  error: string | null;
  category: "LUNCH" | "BREAKFAST" | "DINNER";
}
