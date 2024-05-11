import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IUserDataState {
  isAuth: boolean;
  accessToken: string;
  refreshToken: string;
  userId: number;
  email: string;
}

const initialState: IUserDataState = {
  isAuth: false,
  accessToken: "",
  refreshToken: "",
  userId: 0,
  email: "",
};

export const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
});

export const { login, logout } = userDataSlice.actions;
export default userDataSlice.reducer;
