import { Dispatch } from "react";
import { Action } from "redux";
import { RootState } from '../store'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import {
  getTodosAction,
  addTodoAction,
  setErrorAction,
  setCompletedAction,
  setCompletedAllAction,
  setFilterAction,
  setCountAction,
  updateTodoAction,
  updateTodosAction,
} from "../actions";
import {
  addTodo as appendTodo,
  updateCompleted,
  deleteTodo as removeTodo,
  deleteCompleted,
  getTodos,
  updateTodo as changeTodo,
} from "../api/todoApi";
import { config } from "../config/config.js";
import { ActionTypes, ITodoGet, ITodosState, UpdatedTodo } from "../types";

export const fetchTodos = (offset: number, completed?: boolean | null): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, ActionTypes>): Promise<void>  => {
    try {
      const response = await getTodos(config.TODOS_PER_PAGE, offset, completed);
      dispatch(getTodosAction(response));

      const length = response.todos.filter((item: ITodoGet) => item.completed).length;

      dispatch(setCompletedAllAction(response.todos.length === length));
      dispatch(
        setCountAction(response.todos.filter((item: ITodoGet) => !item.completed).length)
      );
    } catch (e: unknown) {
      dispatch(
        //setErrorAction(`${e.response.data.message} Try update the page...`)
        setErrorAction(`Try update the page...`)
      );
    }
  };
};

export const addTodo = (value: string): ThunkAction<Promise<void>, {}, {}, AnyAction>  => {
  return async (dispatch: ThunkDispatch<{}, {}, ActionTypes>): Promise<void> => {
    try {
      const response = await appendTodo({
        value: value,
        completed: false,
        createdAt: Date.now(),
      });

      dispatch(addTodoAction(response));
      dispatch(setCompletedAction(null));
      dispatch(setCompletedAllAction(false));
      dispatch(setFilterAction("all"));
    } catch (e) {
      //dispatch(setErrorAction(`${e.response.data.message} Try later...`));
      dispatch(setErrorAction(`Try later...`));
    }
  };
};

export const deleteTodo = (id: string, offset: number, completed: boolean): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, ActionTypes>): Promise<void> => {
    try {
      await removeTodo(id);
      dispatch(fetchTodos(offset, completed));
    } catch (e) {
      //dispatch(setErrorAction(`${e.response.data.message} Try later...`));
      dispatch(setErrorAction(`Try later...`));
    }
  };
};

export const deleteTodos = (ids: string[], offset: number, completed: boolean | null): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, ActionTypes>): Promise<void> => {
    try {
      await deleteCompleted(ids);
      dispatch(fetchTodos(offset, completed));
    } catch (e) {
      //dispatch(setErrorAction(`${e.response.data.message} Try later...`));
      dispatch(setErrorAction(`Try later...`));
    }
  };
};

export const updateTodo = (id: string, updatedTodo: UpdatedTodo): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, ActionTypes>): Promise<void> => {
    try {
      await changeTodo(id, updatedTodo);

      dispatch(updateTodoAction({ id, updatedTodo }));
      dispatch(setCompletedAllAction(false));
    } catch (e) {
      //dispatch(setErrorAction(`${e.response.data.message} Try later...`));
      dispatch(setErrorAction(`Try later...`));
    }
  };
};

export const updateTodos = (ids: string[], completed: boolean) => {
  return async (dispatch: Function) => {
    try {
      await updateCompleted(ids, completed);

      dispatch(updateTodosAction(completed));
      dispatch(setCompletedAllAction(completed));
    } catch (e) {
      //dispatch(setErrorAction(`${e.response.data.message} Try later...`));
      dispatch(setErrorAction(`Try later...`));
    }
  };
};
