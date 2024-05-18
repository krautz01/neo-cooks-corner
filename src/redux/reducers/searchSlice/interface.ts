import { IRecipe } from "@interfaces/IRecipe";

export interface ISearchState {
    recipes: Array<IRecipe>;
    status: string;
    error: string | null;
    searchTerm: string;
  }