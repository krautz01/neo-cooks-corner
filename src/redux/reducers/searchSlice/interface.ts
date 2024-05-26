import { IRecipe } from "@interfaces/IRecipe";
import { IChef } from "@interfaces/iChef";

export interface ISearchState {
  recipes: Array<IRecipe>;
  chefs: Array<IChef>;
  status: string;
  error: string | null;
  searchTerm: string;
}
