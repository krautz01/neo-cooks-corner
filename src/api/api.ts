import axios, { AxiosResponse } from "axios";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://165.227.147.154:8081/api",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const addToLikes = (recipeId: number): Promise<AxiosResponse> => {
  const response = instance.get(`/recipes/likes/add/${recipeId}`);
  console.log(response);
  return response;
};

const addToSaves = (recipeId: number): Promise<AxiosResponse> => {
  return instance.get(`/recipes/saved/add/${recipeId}`);
};

const removeFromLikes = (recipeId: number): Promise<AxiosResponse> => {
  return instance.get(`/recipes/likes/remove/${recipeId}`);
};

const removeFromSaves = (recipeId: number): Promise<AxiosResponse> => {
  return instance.get(`/recipes/saved/remove/${recipeId}`);
};

const followOnAuthor = (userId: number): Promise<AxiosResponse> => {
  return instance.get(`/users/followings/add/${userId}`);
};

const unFollowFromAuthor = (userId: number): Promise<AxiosResponse> => {
  return instance.get(`/users/followings/remove/${userId}`);
};

interface IIngredients {
  name: string;
  quantity: string;
}

interface ICreateRecipe {
  title: string;
  description: string;
  ingredientsList: IIngredients[];
  difficulty: string;
  category: string;
  youtubeLink: string;
  preparationTime: string;
}

const createRecipe = (
  recipeCreateDto: ICreateRecipe,
  photo: File | null
): Promise<AxiosResponse> => {
  const formData = new FormData();
  console.log(recipeCreateDto);
  formData.append(
    "recipeCreateDto",
    new Blob([JSON.stringify(recipeCreateDto)], { type: "application/json" })
  );
  if (photo) {
    formData.append("photo", photo, photo.name);
    console.log(photo);
  }
  console.log(formData);
  return axios.post(
    "http://165.227.147.154:8081/api/recipes/create",
    formData,
    {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const manageProfile = (
  name: string,
  description: string,
  photo: File | null
): Promise<AxiosResponse> => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  if (photo) {
    formData.append("photo", photo);
  }

  return axios.post("http://165.227.147.154:8081/api/users", formData, {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export {
  addToLikes,
  addToSaves,
  removeFromLikes,
  removeFromSaves,
  followOnAuthor,
  unFollowFromAuthor,
  createRecipe,
  manageProfile,
};
