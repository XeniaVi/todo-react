import {
  GET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  SET_COMPLETED,
  SET_PAGE,
  SET_OFFSET,
  DELETE_TODO,
} from "../constants";

export const getTodosAction = (payload) => ({ type: GET_TODOS, payload });
export const addTodoAction = (payload) => ({ type: ADD_TODO, payload });
export const updateTodoAction = (payload) => ({ type: UPDATE_TODO, payload });

export const setCompletedAction = (payload) => ({
  type: SET_COMPLETED,
  payload,
});
export const setPageAction = (payload) => ({
  type: SET_PAGE,
  payload,
});
export const setOffsetAction = (payload) => ({
  type: SET_OFFSET,
  payload,
});
