import { IRecipe } from "@interfaces/IRecipe";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IUserDataState {
  id: null | number;
  name: string;
  email: string;
  photoLink: null | string;
  description: null | string;
  recipes: Array<IRecipe> | [];
  likesCount: null | number;
  saves: [];
  followersCount: null | number;
  followingsCount: null | number;
}

const initialState: IUserDataState = {
  id: null,
  name: "",
  email: "",
  photoLink: null,
  description: null,
  recipes: [],
  likesCount: null,
  saves: [],
  followersCount: null,
  followingsCount: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async function (formData: IFormValues) {
    try {
      const response = await axios.post(
        "http://165.227.147.154:8081/api/users/auth/user/id",
        formData
      );
      console.log(formData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Обработка ошибок, если не удается загрузить данные
      throw Error("Failed to fetch recipes.");
    }
  }
);

export const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /* setUser: (state) => {
      state.isAuth = true;
    }, */
  },
});

export const {  } = userDataSlice.actions;
export default userDataSlice.reducer;
