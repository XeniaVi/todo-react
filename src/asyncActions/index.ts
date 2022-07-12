import {
  updateTodo as updateTodoAction,
  updateTodos as updateTodosAction,
} from "slices/todosSlice";
import {
  setCompleted,
  setCompletedAll,
  setCount,
  setError,
  setFilter,
} from "slices/setStatusSlice";
import {
  addTodo as appendTodo,
  updateCompleted,
  deleteTodo as removeTodo,
  deleteCompleted,
  getTodos,
  updateTodo as changeTodo,
} from "../api/todoApi";
import { config } from "../config/config";
import { ITodoGet, UpdatedTodo } from "../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (
    obj: { offset: number; completed?: null | boolean },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { offset, completed } = obj;
      const response = await getTodos(config.TODOS_PER_PAGE, offset, completed);

      const length = response.todos.filter(
        (item: ITodoGet) => item.completed
      ).length;

      dispatch(setCompletedAll(response.todos.length === length));
      dispatch(
        setCount(
          response.todos.filter((item: ITodoGet) => !item.completed).length
        )
      );

      return response;
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response) {
          dispatch(
            setError(`${response.data.message} Try update the page....`)
          );
        } else {
          dispatch(setError(`Try update the page...`));
        }
      }
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (value: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await appendTodo({
        value: value,
        completed: false,
        createdAt: Date.now(),
      });

      dispatch(setCompleted(null));
      dispatch(setCompletedAll(false));
      dispatch(setFilter("all"));
      return response;
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response) {
          dispatch(
            setError(`${response.data.message} Try update the page....`)
          );
        } else {
          dispatch(setError(`Try update the page...`));
        }
      }
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (
    obj: { id: string; offset: number; completed: boolean | null },
    { dispatch }
  ) => {
    try {
      const { id, offset, completed } = obj;
      await removeTodo(id);
      dispatch(fetchTodos({ offset, completed }));
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response) {
          dispatch(
            setError(`${response.data.message} Try update the page....`)
          );
        } else {
          dispatch(setError(`Try update the page...`));
        }
      }
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (
    obj: {
      ids: string[];
      offset: number;
      completed: boolean | null;
    },
    { dispatch }
  ) => {
    try {
      const { ids, offset, completed } = obj;
      await deleteCompleted(ids);
      dispatch(fetchTodos({ offset, completed }));
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response) {
          dispatch(
            setError(`${response.data.message} Try update the page....`)
          );
        } else {
          dispatch(setError(`Try update the page...`));
        }
      }
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (obj: { id: string; updatedTodo: UpdatedTodo }, { dispatch }) => {
    try {
      const { id, updatedTodo } = obj;
      await changeTodo(id, updatedTodo);

      dispatch(updateTodoAction({ id, updatedTodo }));
      dispatch(setCompletedAll(false));
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response) {
          dispatch(
            setError(`${response.data.message} Try update the page....`)
          );
        } else {
          dispatch(setError(`Try update the page...`));
        }
      }
    }
  }
);

export const updateTodos = createAsyncThunk(
  "todos/updateTodos",
  async (
    obj: { ids: string[]; completed: boolean },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { ids, completed } = obj;
      await updateCompleted(ids, completed);

      dispatch(updateTodosAction(completed));
      dispatch(setCompletedAll(completed));
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response) {
          dispatch(
            setError(`${response.data.message} Try update the page....`)
          );
        } else {
          dispatch(setError(`Try update the page...`));
        }
      }
    }
  }
);
