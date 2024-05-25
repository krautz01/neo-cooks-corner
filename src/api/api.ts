import { IRecipe } from "@interfaces/IRecipe";
import axios, { AxiosResponse } from "axios";

const token = localStorage.getItem("token");

if (!token) {
  throw new Error("Token not found in localStorage");
}

const instance = axios.create({
  baseURL: "http://165.227.147.154:8081/api",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const addToLikes = (recipeId: number): Promise<AxiosResponse> => {
  return instance.get(`/recipes/likes/add/${recipeId}`);
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

const createRecipe = (
  recipeCreateDto: IRecipe,
  photo: File | null
): Promise<AxiosResponse> => {
  const formData = new FormData();
  formData.append("recipeCreateDto", JSON.stringify(recipeCreateDto));
  if (photo) {
    formData.append("photo", photo);
  }
  return instance.post("/recipes/create", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
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
  if (!token) {
    return Promise.reject(new Error("Token not found in localStorage"));
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
