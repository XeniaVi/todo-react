import { createSlice } from "@reduxjs/toolkit";
import { config } from "../config/config";
import { ITodoGet, ITodosState } from "types";
import { fetchTodos, addTodo } from "asyncActions";

const initialState: ITodosState = {
  todos: [],
  totalCount: 0,
  pagesCount: 0,
  notCompletedCount: 0,
  idsCompleted: [],
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
    setCount(state) {
      return {
        ...state,
        notCompletedCount: state.todos.filter(
          (item: ITodoGet) => !item.completed
        ).length,
      };
    },
    setIdsCompleted(state) {
      const ids = state.todos
        .filter((item) => item.completed)
        .map((item) => item.id);
      return {
        ...state,
        idsCompleted: ids,
      };
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
        notCompletedCount: action.payload.todos.filter(
          (item: ITodoGet) => !item.completed
        ).length,
        idsCompleted: action.payload.todos
          .filter((item: ITodoGet) => item.completed)
          .map((item: ITodoGet) => item.id),
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
export const { updateTodo, updateTodos, setCount, setIdsCompleted } = actions;

export default reducer;
