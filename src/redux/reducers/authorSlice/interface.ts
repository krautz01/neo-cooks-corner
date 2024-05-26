import { IRecipe } from "@interfaces/IRecipe";

export interface IAuthorState {
  status: "loading" | "resolved" | "failed" | null;
  error: string | null;
  author: IUserData | null;
}

export interface IUserData {
  id: number;
  name: string;
  email: string;
  photoLink: null | string;
  description: null | string;
  recipes: Array<IRecipe> | [];
  likesCount:  number;
  saves: Array<IRecipe> | [];
  followersCount: number;
  followingsCount: number;
}