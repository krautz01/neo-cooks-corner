import { IRecipe } from "@interfaces/IRecipe";

export interface IRecipesState {
  recipes: Array<IRecipe>;
  status: string;
  error: string | null;
  category: "LUNCH" | "BREAKFAST" | "DINNER";
}
