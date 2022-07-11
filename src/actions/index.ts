import { ReducersConstants } from "../constants";
import { IGetTodosAction, ITodoGet, IAddTodosAction, IUpdateTodosAction, IUpdateTodoAction, ISetCompletedAction, ISetFilterAction, ISetErrorAction, ISetCountAction, ISetOffsetAction, ISetPageAction, ISetCompletedAllAction  } from "../types";

export const getTodosAction = (payload: Array<ITodoGet>): IGetTodosAction => ({
  type: ReducersConstants.GET_TODOS,
  payload,
})
export const addTodoAction = (payload: ITodoGet): IAddTodosAction => ({
  type: ReducersConstants.ADD_TODO,
  payload,
});
export const updateTodoAction = (payload: ITodoGet): IUpdateTodoAction => ({
  type: ReducersConstants.UPDATE_TODO,
  payload,
});
export const updateTodosAction = (payload: ITodoGet): IUpdateTodosAction => ({
  type: ReducersConstants.UPDATE_TODOS,
  payload,
});
export const setCompletedAction = (payload: ITodoGet): ISetCompletedAction  => ({
  type: ReducersConstants.SET_COMPLETED,
  payload,
});
export const setCompletedAllAction = (payload: ITodoGet): ISetCompletedAllAction  => ({
  type: ReducersConstants.SET_COMPLETED_ALL,
  payload,
});
export const setPageAction = (payload: ITodoGet): ISetPageAction  => ({
  type: ReducersConstants.SET_PAGE,
  payload,
});
export const setOffsetAction = (payload: ITodoGet): ISetOffsetAction  => ({
  type: ReducersConstants.SET_OFFSET,
  payload,
});
export const setCountAction = (payload: ITodoGet): ISetCountAction   => ({
  type: ReducersConstants.SET_COUNT,
  payload,
});
export const setErrorAction = (payload: ITodoGet): ISetErrorAction  => ({
  type: ReducersConstants.SET_ERROR,
  payload,
});
export const setFilterAction = (payload: ITodoGet): ISetFilterAction  => ({
  type: ReducersConstants.SET_FILTER,
  payload,
});
