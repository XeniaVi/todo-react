import { GET_TODOS, ADD_TODO, UPDATE_TODO } from "../constants";
import { LIMIT } from "../constants";

const defaultState = {
  todos: [],
  totalCount: null,
  pages: null,
};

export const TodoReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  console.log("REDUCER TodoReducer action.type: " + type);

  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: payload.todos,
        totalCount: payload.count,
        pages: Math.ceil(payload.count / LIMIT),
      };
    case ADD_TODO:
      const todos =
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

      const todosUpdated = state.todos.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedTodo,
            }
          : item
      );

      return { ...state, todos: todosUpdated };
    default:
      return { ...state };
  }
};
