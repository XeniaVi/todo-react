import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import rootReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const store =  configureStore({
  reducer: rootReducer,
  //devtools: composeWithDevTools(applyMiddleware(thunk)),
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch