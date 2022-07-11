import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux';
import { updateTodo } from 'asyncActions';

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

export type UpdatedTodoID = {
  id: string,
  updatedTodo: UpdatedTodo
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
  payload: ITodosState
}

export interface IAddTodosAction {
  type: string,
  payload: ITodoGet
}

export interface IUpdateTodoAction {
  type: string,
  payload: UpdatedTodoID
}

export interface IUpdateTodosAction {
  type: string,
  payload: boolean
}

export interface ISetCompletedAction {
  type: string,
  payload: boolean | null
}

export interface ISetCompletedAllAction {
  type: string,
  payload: boolean
}

export interface ISetPageAction {
  type: string,
  payload: number
}

export interface ISetOffsetAction {
  type: string,
  payload: number
}

export interface ISetCountAction {
  type: string,
  payload: number
}

export interface ISetErrorAction {
  type: string,
  payload: string
}

export interface ISetFilterAction {
  type: string,
  payload: string
}

export type ActionTypes = ISetCompletedAllAction | IAddTodosAction | IUpdateTodoAction | ISetCompletedAction | IUpdateTodosAction | IGetTodosAction | ISetFilterAction | ISetErrorAction | ISetCountAction | ISetPageAction | ISetOffsetAction