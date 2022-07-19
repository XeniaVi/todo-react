import { createSlice } from "@reduxjs/toolkit";
import { IStatusState } from "types/interfaces";
import { config } from "../config/config";

const initialState: IStatusState = {
  completedAll: false,
  filter: "all",
  offset: 0,
  currentPage: 1,
  errorMessage: "",
};

export const setStatusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    resetStatus(state) {
      return {
        ...state,
        completedAll: false,
        filter: "all",
        offset: 0,
        currentPage: 1,
        errorMessage: "",
      }
    }, 
    setPage(state, action) {
      return {
        ...state,
        offset: (Number(action.payload) - 1) * Number(config.TODOS_PER_PAGE),
        currentPage: action.payload,
      };
    },
    setCompletedAll(state, action) {
      return { ...state, completedAll: action.payload };
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
  setPage,
  setCompletedAll,
  setError,
  setFilter,
  resetStatus,
} = actions;

export default reducer;
