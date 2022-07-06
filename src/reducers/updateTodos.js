import { GET_TODOS } from "../constants";

const defaultState = {
  todos: [],
  count: null,
};

export const updateTodos = (state = defaultState, action) => {
  console.log("REDUCER action.type: " + action.type);
  switch (action.type) {
    case GET_TODOS:
      console.log(action.type);
      return { ...action.payload };
    default:
      return { ...state };
  }
};
