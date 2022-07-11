import { ReducersConstants } from "../constants";
import { IGetTodosAction, ITodoGet, IAddTodosAction, IUpdateTodosAction, IUpdateTodoAction, ISetCompletedAction, ISetFilterAction, ISetErrorAction, ISetCountAction, ISetOffsetAction, ISetPageAction, ISetCompletedAllAction, ITodosState, UpdatedTodoID } from "../types";

export const getTodosAction = (payload: ITodosState): IGetTodosAction => ({
  type: ReducersConstants.GET_TODOS,
  payload,
})
export const addTodoAction = (payload: ITodoGet): IAddTodosAction => ({
  type: ReducersConstants.ADD_TODO,
  payload,
});
export const updateTodoAction = (payload: UpdatedTodoID): IUpdateTodoAction => ({
  type: ReducersConstants.UPDATE_TODO,
  payload,
});
export const updateTodosAction = (payload: boolean): IUpdateTodosAction => ({
  type: ReducersConstants.UPDATE_TODOS,
  payload,
});
export const setCompletedAction = (payload: boolean | null): ISetCompletedAction  => ({
  type: ReducersConstants.SET_COMPLETED,
  payload,
});
export const setCompletedAllAction = (payload: boolean): ISetCompletedAllAction  => ({
  type: ReducersConstants.SET_COMPLETED_ALL,
  payload,
});
export const setPageAction = (payload: number): ISetPageAction  => ({
  type: ReducersConstants.SET_PAGE,
  payload,
});
export const setOffsetAction = (payload: number): ISetOffsetAction  => ({
  type: ReducersConstants.SET_OFFSET,
  payload,
});
export const setCountAction = (payload: number): ISetCountAction   => ({
  type: ReducersConstants.SET_COUNT,
  payload,
});
export const setErrorAction = (payload: string): ISetErrorAction  => ({
  type: ReducersConstants.SET_ERROR,
  payload,
});
export const setFilterAction = (payload: string): ISetFilterAction  => ({
  type: ReducersConstants.SET_FILTER,
  payload,
});
