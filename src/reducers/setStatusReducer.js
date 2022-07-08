import { ReducersConstants } from "../constants";
import { config } from "../config/config.js";

const initialState = {
  completed: null,
  completedAll: false,
  filter: "all",
  offset: 0,
  currentPage: 1,
  count: 0,
  errorMessage: "",
};

export const setStatusReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ReducersConstants.SET_COMPLETED:
      return {
        ...state,
        completed: payload,
      };

    case ReducersConstants.SET_PAGE:
      return {
        ...state,
        offset: (payload - 1) * config.TODOS_AT_PAGE,
        currentPage: payload,
      };
    case ReducersConstants.SET_OFFSET:
      return {
        ...state,
        offset: payload,
      };
    case ReducersConstants.SET_COMPLETED_ALL:
      return { ...state, completedAll: payload };
    case ReducersConstants.SET_COUNT:
      return { ...state, count: payload };
    case ReducersConstants.SET_ERROR:
      return { ...state, errorMessage: payload };
    case ReducersConstants.SET_FILTER:
      return { ...state, filter: payload };
    default:
      return { ...state };
  }
};
