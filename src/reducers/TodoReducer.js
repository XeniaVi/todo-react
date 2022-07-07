import { GET_TODOS, ADD_TODO, UPDATE_TODO, UPDATE_TODOS } from "../constants";
import { LIMIT } from "../constants";

const defaultState = {
  todos: [],
  totalCount: null,
  pages: null,
};

export const TodoReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  let todos = [];

  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: payload.todos,
        totalCount: payload.count,
        pages: Math.ceil(payload.count / LIMIT),
      };
    case ADD_TODO:
      todos =
        state.todos.length >= LIMIT
          ? state.todos.slice(0, LIMIT - 1)
          : state.todos;
      return {
        ...state,
        todos: [payload, ...todos],
        totalCount: state.totalCount + 1,
        pages: Math.ceil((state.totalCount + 1) / LIMIT),
      };
    case UPDATE_TODO:
      const { id, updatedTodo } = payload;

      todos = state.todos.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedTodo,
            }
          : item
      );

      return { ...state, todos: todos };
    case UPDATE_TODOS:
      todos = state.todos.map((item) =>
        item.completed !== payload
          ? {
              ...item,
              completed: payload,
            }
          : item
      );

      return { ...state, todos: todos };
    default:
      return { ...state };
  }
};
