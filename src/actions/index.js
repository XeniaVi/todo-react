import { GET_TODOS, ADD_TODO, UPDATE_TODO } from "../constants";

export const getTodosAction = (payload) => ({ type: GET_TODOS, payload });
export const addTodoAction = (payload) => ({ type: ADD_TODO, payload });
export const updateTodoAction = (payload) => ({ type: UPDATE_TODO, payload });
