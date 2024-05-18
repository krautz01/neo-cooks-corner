import { IRegisterFormValues } from "@pages/RegisterPage/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILoginFormValues } from "@pages/LoginPage/interface";
import { IAuthState } from "./interface";
import axios from "axios";

const initialState: IAuthState = {
  isAuth: false,
  status: null,
  error: null,
  user: [],
};

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async function (data: IRegisterFormValues, { rejectWithValue }) {
    try {
      const response = await axios.post(
        "http://165.227.147.154:8081/api/users/auth/register",
        data
      );
      return { token: response.data.token, user: response.data.user }; // action payload
    } catch (error) {
      return rejectWithValue("Failed to register user");
    }
  }
);

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async function (data: ILoginFormValues, { rejectWithValue }) {
    try {
      const response = await axios.post(
        "http://165.227.147.154:8081/api/users/auth/login",
        data
      );
      return { token: response.data.token, user: response.data.user }; // action payload
    } catch (error) {
      return rejectWithValue("Failed to login user");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.isAuth = true;
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.isAuth = true;
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        console.log(action.error.message);
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
