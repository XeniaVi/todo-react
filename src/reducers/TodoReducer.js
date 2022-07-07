import constants from "../constants";

const initialState = {
  todos: [],
  totalCount: null,
  pagesCount: null,
};

const { GET_TODOS, ADD_TODO, UPDATE_TODO, UPDATE_TODOS, TODOS_AT_PAGE } =
  constants;

export const TodoReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let todos = [];

  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: payload.todos,
        totalCount: payload.count,
        pagesCount: Math.ceil(payload.count / TODOS_AT_PAGE),
      };
    case ADD_TODO:
      todos =
        state.todos.length >= TODOS_AT_PAGE
          ? state.todos.slice(0, TODOS_AT_PAGE - 1)
          : state.todos;
      return {
        ...state,
        todos: [payload, ...todos],
        totalCount: state.totalCount + 1,
        pagesCount: Math.ceil((state.totalCount + 1) / TODOS_AT_PAGE),
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

      return { ...state, todos };
    case UPDATE_TODOS:
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
