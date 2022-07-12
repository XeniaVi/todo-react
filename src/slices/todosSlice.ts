import { createSlice } from "@reduxjs/toolkit";
import { config } from "../config/config";
import { ITodosState } from "types";
import { fetchTodos, addTodo } from "asyncActions";

const initialState: ITodosState = {
  todos: [],
  totalCount: 0,
  pagesCount: 0,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    updateTodo(state, action) {
      const { id, updatedTodo } = action.payload;
      const todos = state.todos.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedTodo,
            }
          : item
      );
      return { ...state, todos };
    },
    updateTodos(state, action) {
      const todos = state.todos.map((item) =>
        item.completed !== action.payload
          ? {
              ...item,
              completed: action.payload,
            }
          : item
      );
      return { ...state, todos };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      return {
        ...state,
        todos: action.payload.todos,
        totalCount: action.payload.count,
        pagesCount: Math.ceil(
          action.payload.count / Number(config.TODOS_PER_PAGE)
        ),
      };
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      const todos =
        state.todos.length >= Number(config.TODOS_PER_PAGE)
          ? state.todos.slice(0, Number(config.TODOS_PER_PAGE) - 1)
          : state.todos;
      return {
        ...state,
        todos: [action.payload, ...todos],
        totalCount: state.totalCount + 1,
        pagesCount: Math.ceil(
          (state.totalCount + 1) / Number(config.TODOS_PER_PAGE)
        ),
      };
    });
  },
});

const { actions, reducer } = todosSlice;
export const { updateTodo, updateTodos } = actions;

export default reducer;
