import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./reducers/recipeSlice/recipeSlice";
import searchSlice from "./reducers/searchSlice/searchSlice";
import authSlice from "./reducers/authSlice/authSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  author: authSlice,
  recipes: recipeSlice,
  search: searchSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
