import { IRecipe } from "@interfaces/IRecipe";

export interface IChef {
  id: number;
  name: string;
  email: string;
  photoLink: string;
  description: string;
  recipes: Array<IRecipe>;
  likesCount: number;
  saves: null | Array<IRecipe>;
  followersCount: number;
  followingsCount: number;
}
