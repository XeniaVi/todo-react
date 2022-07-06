import { SET_COMPLETED } from "../constants";
import { LIMIT } from "../constants";

const defaultState = {
  completed: null,
  completedAll: false,
  offset: 0,
};

export const setStatus = (state = defaultState, action) => {
  console.log("REDUCER setStatus action.type: " + action.type);
  switch (action.type) {
    case SET_COMPLETED:
      return {
        ...state,
        completed: action.payload,
      };
    default:
      return { ...state };
  }
};
