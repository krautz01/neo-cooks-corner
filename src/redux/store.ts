import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import recipeSlice from "./reducers/recipeSlice";

const rootReducer = combineReducers({
  auth: userSlice,
  recipe: recipeSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
