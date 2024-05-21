import axios, { AxiosResponse } from "axios";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://165.227.147.154:8081/api/", // URL
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
  return instance.get(`/recipes/saved/remove/${recipeId}`);
};

const removeFromLikes = (recipeId: number): Promise<AxiosResponse> => {
  return instance.get(`/recipes/likes/add/${recipeId}`);
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

export {
  addToLikes,
  addToSaves,
  removeFromLikes,
  removeFromSaves,
  followOnAuthor,
  unFollowFromAuthor,
};
