import { SET_COMPLETED, SET_PAGE, SET_OFFSET } from "../constants";
import { LIMIT } from "../constants";

const defaultState = {
  completed: null,
  completedAll: false,
  offset: 0,
  page: 1,
};

export const setStatusReducer = (state = defaultState, action) => {
  console.log("REDUCER setStatus action.type: " + action.type);
  switch (action.type) {
    case SET_COMPLETED:
      return {
        ...state,
        completed: action.payload,
      };

    case SET_PAGE:
      return {
        ...state,
        offset: (action.payload - 1) * LIMIT,
        page: action.payload,
      };
    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload,
      };
    default:
      return { ...state };
  }
};
