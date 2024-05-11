import { createSlice } from "@reduxjs/toolkit";
/* import type { PayloadAction } from "@reduxjs/toolkit"; */
import { RootState } from "./../store";

// Define a type for the slice state
interface IUserDataState {
  isAuth: boolean;
  email: string;
  username: string;
}

// Define the initial state using that type
const initialState: IUserDataState = {
  isAuth: false,
  email: "",
  username: "",
};

export const userDataSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    auth: (state) => {
      state.isAuth = true;
    },
  },
});

export const { auth } = userDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default userDataSlice.reducer;
