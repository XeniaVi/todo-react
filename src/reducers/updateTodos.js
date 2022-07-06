import { GET_TODOS, ADD_TODO, UPDATE_TODO } from "../constants";
import { LIMIT } from "../constants";

const defaultState = {
  todos: [],
  totalCount: null,
  pages: null,
};

export const updateTodos = (state = defaultState, action) => {
  console.log("REDUCER UpdateTodos action.type: " + action.type);
  console.log(action.payload);
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload.todos,
        totalCount: action.payload.count,
        pages: Math.ceil(action.payload.count / LIMIT),
      };
    case ADD_TODO:
      const todos =
        state.todos.length >= LIMIT
          ? state.todos.slice(0, LIMIT - 1)
          : state.todos;
      return {
        ...state,
        todos: [action.payload, ...todos],
        totalCount: state.totalCount + 1,
        pages: Math.ceil((state.totalCount + 1) / LIMIT),
      };
    case UPDATE_TODO:
      const { id, post } = action.payload;
      console.log(id, post);
      const todosUpdated = state.todos.map((item) =>
        item.id === id
          ? {
              ...item,
              ...post,
            }
          : item
      );
      return { ...state, todos: todosUpdated };
    default:
      return { ...state };
  }
};
