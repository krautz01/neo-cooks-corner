import { IRecipe } from "@interfaces/IRecipe";
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

const createRecipe = (
  recipeCreateDto: IRecipe,
  photo: File | null
): Promise<AxiosResponse> => {
  const formData = new FormData();
  /* formData.append("recipeCreateDto", recipeCreateDto); */
  if (photo) {
    formData.append("photo", photo);
  }
  return instance.post(
    "http://165.227.147.154:8081/api/recipes/create",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

/* const manageProfile = (
  name: string,
  description: string,
  photo: File | null
): Promise<AxiosResponse> => {
  console.log(`${photo}, ${typeof photo}`);
  const formData = new FormData();
  if (photo) {
    formData.append("photo", photo);
  }
  const encodedDescription = encodeURIComponent(description);
  return instance.put(
    `/users?name=${name}&description=${encodedDescription}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}; */

function stringifyFormItem(formItem: unknown) {
  if (typeof formItem === "object" && formItem !== null) {
    return new Blob([JSON.stringify(formItem)], { type: "application/json" });
  } else {
    return `${formItem}`;
  }
}

const changeProfile = async (
  name: string,
  description: string,
  photo: File | null
): Promise<void> => {
  try {
    const formData = new FormData();
    if (photo) {
      formData.append("photo", stringifyFormItem(photo));
    } else {
      console.log("Фото не предоставлено");
    }
    console.log(formData);
    const response: AxiosResponse = await axios.put(
      "http://165.227.147.154:8081/api/users",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        params: {
          name,
          description,
        },
      }
    );
    console.log(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export {
  addToLikes,
  addToSaves,
  removeFromLikes,
  removeFromSaves,
  followOnAuthor,
  unFollowFromAuthor,
  createRecipe,
  changeProfile,
};
