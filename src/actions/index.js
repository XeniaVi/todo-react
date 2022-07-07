import constants from "../constants";

export const getTodosAction = (payload) => ({
  type: constants.GET_TODOS,
  payload,
});
export const addTodoAction = (payload) => ({
  type: constants.ADD_TODO,
  payload,
});
export const updateTodoAction = (payload) => ({
  type: constants.UPDATE_TODO,
  payload,
});
export const updateTodosAction = (payload) => ({
  type: constants.UPDATE_TODOS,
  payload,
});

export const setCompletedAction = (payload) => ({
  type: constants.SET_COMPLETED,
  payload,
});
export const setCompletedAllAction = (payload) => ({
  type: constants.SET_COMPLETED_ALL,
  payload,
});
export const setPageAction = (payload) => ({
  type: constants.SET_PAGE,
  payload,
});
export const setOffsetAction = (payload) => ({
  type: constants.SET_OFFSET,
  payload,
});
export const setCountAction = (payload) => ({
  type: constants.SET_COUNT,
  payload,
});
export const setErrorAction = (payload) => ({
  type: constants.SET_ERROR,
  payload,
});
export const setFilterAction = (payload) => ({
  type: constants.SET_FILTER,
  payload,
});
