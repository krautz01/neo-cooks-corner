export interface IIngredients {
  name: string;
  quantity: string;
}

export interface IRecipe {
  photo: string;
  title: string;
  likes: number;
  category: string;
  author: string;
  savedCount: number;
  id: number;
  cookingLink: string;
  ingredients: Array<IIngredients>;
}
