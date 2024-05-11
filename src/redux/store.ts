import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./reducers/userDataSlice";

const rootReducer = combineReducers({
  auth: userDataSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
