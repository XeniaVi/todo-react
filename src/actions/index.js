import { GET_TODOS, ADD_TODO } from "../constants";

export const getTodosAction = (payload) => ({ type: GET_TODOS, payload });
export const addTodoAction = (payload) => ({ type: ADD_TODO, payload });
