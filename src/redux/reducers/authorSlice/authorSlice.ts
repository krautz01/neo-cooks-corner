/* import { IRegisterFormValues } from "@pages/RegisterPage/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: IAuthState = {
  isAuth: false,
  status: null,
  error: null,
  user: [],
};

export const fetchAuthor = createAsyncThunk(
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

export const authorSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthor.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAuthor.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.isAuth = true;
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.user;
      })
      .addCase(fetchAuthor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {  } = fetchAuthor.actions;
export default fetchAuthor.reducer; */
