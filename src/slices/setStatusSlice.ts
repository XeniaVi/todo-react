import { createSlice } from "@reduxjs/toolkit";
import { IStatusState } from "types";
import { config } from "../config/config";

const initialState: IStatusState = {
  completedAll: false,
  filter: "all",
  offset: 0,
  currentPage: 1,
  count: 0,
  errorMessage: "",
};

export const setStatusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setCompleted(state, action) {
      return {
        ...state,
        completed: action.payload,
      };
    },
    setPage(state, action) {
      return {
        ...state,
        offset: (Number(action.payload) - 1) * Number(config.TODOS_PER_PAGE),
        currentPage: action.payload,
      };
    },
    setOffset(state, action) {
      return {
        ...state,
        offset: action.payload,
      };
    },
    setCompletedAll(state, action) {
      return { ...state, completedAll: action.payload };
    },
    setCount(state, action) {
      return { ...state, count: action.payload };
    },
    setError(state, action) {
      return { ...state, errorMessage: action.payload };
    },
    setFilter(state, action) {
      return {
        ...state,
        filter: action.payload.filter,
        completedAll: action.payload.completedAll,
        completed: action.payload.completed,
        offset: 0,
        currentPage: 1,
      };
    },
  },
});

const { actions, reducer } = setStatusSlice;
export const {
  setCompleted, //check
  setPage, //check
  setOffset, //check
  setCompletedAll,
  setCount,
  setError,
  setFilter,
} = actions;

export default reducer;
