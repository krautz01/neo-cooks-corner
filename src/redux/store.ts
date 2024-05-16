import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import recipeSlice from "./reducers/recipeSlice";
import searchSlice from "./reducers/searchSlice";

const rootReducer = combineReducers({
  auth: userSlice,
  recipes: recipeSlice,
  search: searchSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
