import {
  updateTodo as updateTodoAction,
  updateTodos as updateTodosAction,
  setCount,
  setIdsCompleted,
} from "slices/todosSlice";
import { setCompletedAll, setError, setFilter } from "slices/setStatusSlice";
import { setSignOut, setSuccessfulRegistration } from "slices/authSlice";
import {
  addTodo,
  updateCompleted,
  deleteTodo,
  deleteCompleted,
  getTodos,
  updateTodo,
} from "../api/todoApi";
import { signUp, signIn } from "../api/authApi";
import { config } from "../config/config";
import { UpdatedTodo } from "../types/types";
import { ITodoGet, PostRegistration, PostLogin } from "../types/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ErrorAuthorization } from "errors";

export const actionGetTodos = createAsyncThunk(
  "todos/actionGetTodos",
  async (
    obj: { offset: number; completed?: boolean; token: string | null },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { offset, completed, token } = obj;
      const response = await getTodos(
        config.TODOS_PER_PAGE,
        offset,
        token,
        completed
      );

      const length = response.todos.filter(
        (item: ITodoGet) => item.completed
      ).length;

      dispatch(setCompletedAll(response.todos.length === length));

      return response;
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response) {
          if (response.data.status === 500) dispatch(setSignOut());

          dispatch(
            setError(`${response.data.message}. Try update the page....`)
          );
        } else {
          dispatch(setError(`Try update the page...`));
        }
      } else if (e instanceof ErrorAuthorization) {
        dispatch(setError(e.message));
      }
    }
  }
);

export const actionAddTodo = createAsyncThunk(
  "todos/actionAddTodo",
  async (
    obj: { value: string; token: string | null },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { value, token } = obj;
      const response = await addTodo(
        {
          value: value,
          completed: false,
          createdAt: Date.now(),
        },
        token
      );

      dispatch(setFilter({ filter: "all", completedAll: false }));
      return response;
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response) {
          dispatch(
            setError(`${response.data.message}. Try update the page....`)
          );
        } else {
          dispatch(setError(`Try update the page...`));
        }
      } else if (e instanceof ErrorAuthorization) {
        dispatch(setError(e.message));
      }
    }
  }
);

export const actionDeleteTodo = createAsyncThunk(
  "todos/actionDeleteTodo",
  async (
    obj: {
      id: string;
      offset: number;
      completed?: boolean;
      token: string | null;
    },
    { dispatch }
  ) => {
    try {
      const { id, offset, completed, token } = obj;
      await deleteTodo(id, token);
      dispatch(actionGetTodos({ offset, token, completed }));
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response) {
          dispatch(
            setError(`${response.data.message}. Try update the page....`)
          );
        } else {
          dispatch(setError(`Try update the page...`));
        }
      } else if (e instanceof ErrorAuthorization) {
        dispatch(setError(e.message));
      }
    }
  }
);

export const actionDeleteTodos = createAsyncThunk(
  "todos/actionDeleteTodos",
  async (
    obj: {
      ids: string[];
      offset: number;
      completed?: boolean;
      token: string | null;
    },
    { dispatch }
  ) => {
    try {
      const { ids, offset, completed, token } = obj;
      await deleteCompleted(ids, token);
      dispatch(actionGetTodos({ offset, token, completed }));
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response) {
          dispatch(
            setError(`${response.data.message}. Try update the page....`)
          );
        } else {
          dispatch(setError(`Try update the page...`));
        }
      } else if (e instanceof ErrorAuthorization) {
        dispatch(setError(e.message));
      }
    }
  }
);

export const actionUpdateTodo = createAsyncThunk(
  "todos/actionUpdateTodo",
  async (
    obj: { id: string; updatedTodo: UpdatedTodo; token: string | null },
    { dispatch }
  ) => {
    try {
      const { id, updatedTodo, token } = obj;
      await updateTodo(id, updatedTodo, token);

      dispatch(updateTodoAction({ id, updatedTodo }));
      dispatch(setCompletedAll(false));
      dispatch(setCount());
      dispatch(setIdsCompleted());
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response) {
          dispatch(
            setError(`${response.data.message}. Try update the page....`)
          );
        } else {
          dispatch(setError(`Try update the page...`));
        }
      } else if (e instanceof ErrorAuthorization) {
        dispatch(setError(e.message));
      }
    }
  }
);

export const actionUpdateTodos = createAsyncThunk(
  "todos/actionUpdateTodos",
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
            setError(`${response.data.message}. Try update the page....`)
          );
        } else {
          dispatch(setError(`Try update the page...`));
        }
      } else if (e instanceof ErrorAuthorization) {
        dispatch(setError(e.message));
      }
    }
  }
);

export const actionSignUp = createAsyncThunk(
  "auth/actionSignUp",
  async (user: PostRegistration, { rejectWithValue, dispatch }) => {
    try {
      await signUp(user);
      dispatch(setError(""));
      dispatch(setSuccessfulRegistration(false));
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response) {
          dispatch(
            setError(`${response.data.message}. Try update the page....`)
          );
        } else {
          dispatch(setError(`Try update the page...`));
        }
      }
    }
  }
);

export const actionSignIn = createAsyncThunk(
  "auth/actionSignIn",
  async (user: PostLogin, { rejectWithValue, dispatch }) => {
    try {
      const response = await signIn(user);
      dispatch(setError(""));
      return response;
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response) {
          dispatch(
            setError(`${response.data.message}. Try update the page....`)
          );
        } else {
          dispatch(setError(`Try update the page...`));
        }
      }
    }
  }
);
