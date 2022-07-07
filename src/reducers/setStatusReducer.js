import {
  SET_COMPLETED,
  SET_PAGE,
  SET_OFFSET,
  SET_COMPLETED_ALL,
  SET_COUNT,
  SET_ERROR,
  SET_FILTER,
} from "../constants";
import { LIMIT } from "../constants";

const defaultState = {
  completed: null,
  completedAll: false,
  filter: "all",
  offset: 0,
  page: 1,
  count: 0,
  errorMessage: "",
};

export const setStatusReducer = (state = defaultState, action) => {
  console.log("REDUCER setStatus action.type: " + action.type);
  const { type, payload } = action;
  switch (type) {
    case SET_COMPLETED:
      return {
        ...state,
        completed: payload,
      };

    case SET_PAGE:
      return {
        ...state,
        offset: (payload - 1) * LIMIT,
        page: payload,
      };
    case SET_OFFSET:
      return {
        ...state,
        offset: payload,
      };
    case SET_COMPLETED_ALL:
      return { ...state, completedAll: payload };
    case SET_COUNT:
      return { ...state, count: payload };
    case SET_ERROR:
      return { ...state, errorMessage: payload };
    case SET_FILTER:
      return { ...state, filter: payload };
    default:
      return { ...state };
  }
};
