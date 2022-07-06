import { GET_TODOS } from "../constants";

const defaultState = {
  todos: [],
  count: null,
};

export const updateTodos = (state = defaultState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {};
    default:
      return { ...state };
  }
};
