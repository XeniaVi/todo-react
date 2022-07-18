import {
  updateTodo as updateTodoAction,
  updateTodos as updateTodosAction,
  setCount,
  setIdsCompleted,
} from "slices/todosSlice";
import { setCompletedAll, setError, setFilter } from "slices/setStatusSlice";
import { setSuccessfulRegistration } from "slices/authSlice";
import {
  addTodo as appendTodo,
  updateCompleted,
  deleteTodo as removeTodo,
  deleteCompleted,
  getTodos,
  updateTodo as changeTodo,
  signUp as registration,
  signIn as login,
} from "../api/todoApi";
import { config } from "../config/config";
import { ITodoGet, PostRegistration, UpdatedTodo, PostLogin } from "../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (
    obj: { offset: number; completed?: boolean; token: string | null},
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { offset, completed, token } = obj;
      const response = await getTodos(config.TODOS_PER_PAGE, offset, token, completed);

      const length = response.todos.filter(
        (item: ITodoGet) => item.completed
      ).length;

      dispatch(setCompletedAll(response.todos.length === length));

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
  async (obj: {value: string, token: string | null}, { rejectWithValue, dispatch }) => {
    try {
      const { value, token } = obj;
      const response = await appendTodo({
        value: value,
        completed: false,
        createdAt: Date.now(),
      }, token);

      dispatch(setFilter({ filter: 'all', completedAll: false }));
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
    obj: { id: string; offset: number; completed?: boolean, token: string | null },
    { dispatch }
  ) => {
    try {
      const { id, offset, completed, token } = obj;
      await removeTodo(id, token);
      dispatch(fetchTodos({ offset, token, completed }));
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
      completed?: boolean;
      token: string | null
    },
    { dispatch }
  ) => {
    try {
      const { ids, offset, completed, token } = obj;
      await deleteCompleted(ids, token);
      dispatch(fetchTodos({ offset, token, completed }));
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
  async (obj: { id: string; updatedTodo: UpdatedTodo; token: string | null }, { dispatch }) => {
    try {
      const { id, updatedTodo, token } = obj;
      await changeTodo(id, updatedTodo, token);

      dispatch(updateTodoAction({ id, updatedTodo }));
      dispatch(setCompletedAll(false));
      dispatch(setCount());
      dispatch(setIdsCompleted());
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
    obj: { ids: string[]; completed: boolean; token: string | null },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { ids, completed, token } = obj;
      await updateCompleted(ids, completed, token);

      dispatch(updateTodosAction(completed));
      dispatch(setCompletedAll(completed));
      dispatch(setCount());
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

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (user: PostRegistration, { rejectWithValue, dispatch }) => {
    try {
      await registration(user);
      dispatch(setError(""));
      dispatch(setSuccessfulRegistration(false));
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

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (user: PostLogin, { rejectWithValue, dispatch }) => {
    try {
      const response = await login(user);
      dispatch(setError(""))
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
