import { type } from "@testing-library/user-event/dist/type";
import {
  SET_COMPLETED,
  SET_PAGE,
  SET_OFFSET,
  SET_COMPLETED_ALL,
  SET_COUNT,
} from "../constants";
import { LIMIT } from "../constants";

const defaultState = {
  completed: null,
  completedAll: false,
  offset: 0,
  page: 1,
  count: 0,
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
    default:
      return { ...state };
  }
};
