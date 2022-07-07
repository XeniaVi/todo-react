import {
  GET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  UPDATE_TODOS,
  SET_COMPLETED,
  SET_PAGE,
  SET_OFFSET,
  SET_COMPLETED_ALL,
  SET_COUNT,
} from "../constants";

export const getTodosAction = (payload) => ({ type: GET_TODOS, payload });
export const addTodoAction = (payload) => ({ type: ADD_TODO, payload });
export const updateTodoAction = (payload) => ({ type: UPDATE_TODO, payload });
export const updateTodosAction = (payload) => ({ type: UPDATE_TODOS, payload });

export const setCompletedAction = (payload) => ({
  type: SET_COMPLETED,
  payload,
});
export const setCompletedAllAction = (payload) => ({
  type: SET_COMPLETED_ALL,
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
export const setCountAction = (payload) => ({
  type: SET_COUNT,
  payload,
});
