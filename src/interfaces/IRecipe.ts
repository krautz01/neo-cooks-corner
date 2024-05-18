export interface IIngredients {
  name: string;
  quantity: string;
}

export interface IRecipe {
  id: number;
  title: string;
  description: string;
  photo: string;
  ingredients: Array<IIngredients>;
  difficulty: string;
  category: string;
  preparationTime: string;
  youtubeLink: string;
  author: string;
  userId: number;
  userName: string;
  likesCount: number;
  savesCount: number;
}
