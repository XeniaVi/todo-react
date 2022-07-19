import axios from "axios";
import { ErrorAuthorization } from "errors";
import { ITodo } from "types/interfaces";
import { UpdatedTodo } from "types/types";
import { config } from "../config/config";

export const getTodos = async (
  limit: number | string,
  offset: number,
  token: string | null,
  completed?: boolean,
) => {
  if (!token) throw new ErrorAuthorization("User is not autorized");

  const extra = typeof completed === "boolean" ? `&completed=${completed}` : "";
  const response = await axios.get(
    `${config.API_URL}?offset=${offset}&limit=${limit}${extra}`, {headers: {authorization: token}}
  );
  return response.data;
};

export const addTodo = async (item: ITodo, token: string | null) => {
  if (!token) throw new ErrorAuthorization("User is not autorized");

  const response = await axios.post(config.API_URL, item, {headers: {authorization: token}});
  return response.data;
};

export const deleteTodo = async (id: string, token: string | null) => {
  if (!token) throw new ErrorAuthorization("User is not autorized");

  return axios.delete(`${config.API_URL}/${id}`, {headers:  {authorization: token}});
};

export const updateTodo = async (id: string, updatedTodo: UpdatedTodo, token: string | null) => {
  if (!token) throw new ErrorAuthorization("User is not autorized");

  const response = await axios.put(`${config.API_URL}/${id}`, updatedTodo, {headers: {authorization: token}});
  return response.data;
};

export const deleteCompleted = async (ids: Array<string>, token: string | null) => {
  if (!token) throw new ErrorAuthorization("User is not autorized");

  return axios.delete(config.API_URL, { headers: {authorization: token}, data: { ids } });
};

export const updateCompleted = async (
  ids: Array<string>,
  completed: boolean, 
  token: string | null
) => {
  if (!token) throw new ErrorAuthorization("User is not autorized");
  const response = await axios.put(config.API_URL, { ids, completed }, {headers: {authorization: token} });
  return response.data;
};
