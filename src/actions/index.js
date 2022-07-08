import { ReducersConstants } from "../constants";

export const getTodosAction = (payload) => ({
  type: ReducersConstants.GET_TODOS,
  payload,
});
export const addTodoAction = (payload) => ({
  type: ReducersConstants.ADD_TODO,
  payload,
});
export const updateTodoAction = (payload) => ({
  type: ReducersConstants.UPDATE_TODO,
  payload,
});
export const updateTodosAction = (payload) => ({
  type: ReducersConstants.UPDATE_TODOS,
  payload,
});

export const setCompletedAction = (payload) => ({
  type: ReducersConstants.SET_COMPLETED,
  payload,
});
export const setCompletedAllAction = (payload) => ({
  type: ReducersConstants.SET_COMPLETED_ALL,
  payload,
});
export const setPageAction = (payload) => ({
  type: ReducersConstants.SET_PAGE,
  payload,
});
export const setOffsetAction = (payload) => ({
  type: ReducersConstants.SET_OFFSET,
  payload,
});
export const setCountAction = (payload) => ({
  type: ReducersConstants.SET_COUNT,
  payload,
});
export const setErrorAction = (payload) => ({
  type: ReducersConstants.SET_ERROR,
  payload,
});
export const setFilterAction = (payload) => ({
  type: ReducersConstants.SET_FILTER,
  payload,
});
