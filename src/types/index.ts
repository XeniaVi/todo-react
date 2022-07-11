import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux';

export interface ITodo {
  value: string;
  completed: boolean;
  createdAt: number;
}

export interface ITodoGet extends ITodo {
  id: string;
 }

export type UpdatedTodo = {
  value?: string,
  completed?: boolean;
}

export interface ITodosState {
  todos: ITodoGet[],
  totalCount: number,
  pagesCount: number,
}

export interface IStatusState {
  completed: null | boolean,
  completedAll: boolean,
  filter: string,
  offset: number,
  currentPage: number,
  count: number,
  errorMessage: string,
}

export interface IReducersConstants {
  GET_TODOS: string,
  ADD_TODO: string,
  UPDATE_TODO: string,
  UPDATE_TODOS: string,
  DELETE_TODO: string,
  SET_COMPLETED: string,
  SET_COMPLETED_ALL: string,
  SET_PAGE: string,
  SET_OFFSET: string,
  SET_COUNT: string,
  SET_ERROR: string,
  SET_FILTER: string,
};

export interface IRootState {
  todos: ITodosState,
  status: IStatusState,
}

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}

export interface IGetTodosAction {
  type: string,
  payload: Array<ITodoGet>
}

export interface IAddTodosAction {
  type: string,
  payload: ITodoGet
}

export interface IUpdateTodoAction {
  type: string,
  payload: ITodoGet
}

export interface IUpdateTodosAction {
  type: string,
  payload: ITodoGet
}

export interface ISetCompletedAction {
  type: string,
  payload: ITodoGet
}

export interface ISetCompletedAllAction {
  type: string,
payload: ITodoGet
}

export interface ISetPageAction {
  type: string,
payload: ITodoGet
}

export interface ISetOffsetAction {
  type: string,
payload: ITodoGet
}

export interface ISetCountAction {
  type: string,
payload: ITodoGet
}

export interface ISetErrorAction {
  type: string,
payload: ITodoGet
}

export interface ISetFilterAction {
  type: string,
  payload: ITodoGet
}