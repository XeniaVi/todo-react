import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import rootReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export default configureStore({
  reducer: rootReducer,
  devtools: composeWithDevTools(applyMiddleware(thunk)),
});
