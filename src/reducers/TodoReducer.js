import { ReducersConstants } from "../constants";
import { config } from "../config/config.js";

const initialState = {
  todos: [],
  totalCount: null,
  pagesCount: null,
};

export const TodoReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let todos = [];

  switch (type) {
    case ReducersConstants.GET_TODOS:
      return {
        ...state,
        todos: payload.todos,
        totalCount: payload.count,
        pagesCount: Math.ceil(payload.count / config.TODOS_AT_PAGE),
      };
    case ReducersConstants.ADD_TODO:
      todos =
        state.todos.length >= config.TODOS_AT_PAGE
          ? state.todos.slice(0, config.TODOS_AT_PAGE - 1)
          : state.todos;
      return {
        ...state,
        todos: [payload, ...todos],
        totalCount: state.totalCount + 1,
        pagesCount: Math.ceil(
          (state.totalCount + 1) / config.TODOS_AT_PAGE
        ),
      };
    case ReducersConstants.UPDATE_TODO:
      const { id, updatedTodo } = payload;

      todos = state.todos.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedTodo,
            }
          : item
      );

      return { ...state, todos };
    case ReducersConstants.UPDATE_TODOS:
      todos = state.todos.map((item) =>
        item.completed !== payload
          ? {
              ...item,
              completed: payload,
            }
          : item
      );

      return { ...state, todos };
    default:
      return { ...state };
  }
};
