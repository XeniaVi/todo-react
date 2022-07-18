import axios from "axios";
import { ITodo, UpdatedTodo, PostRegistration } from "types/index.js";
import { config } from "../config/config";

export const getTodos = async (
  limit: number | string,
  offset: number,
  completed?: boolean
) => {
  const extra = typeof completed === "boolean" ? `&completed=${completed}` : "";
  const response = await axios.get(
    `${config.API_URL}?offset=${offset}&limit=${limit}${extra}`
  );
  return response.data;
};

export const addTodo = async (item: ITodo) => {
  const response = await axios.post(config.API_URL, item);
  return response.data;
};

export const deleteTodo = async (id: string) => {
  return axios.delete(`${config.API_URL}/${id}`, { data: id });
};

export const updateTodo = async (id: string, updatedTodo: UpdatedTodo) => {
  const response = await axios.put(`${config.API_URL}/${id}`, updatedTodo);
  return response.data;
};

export const deleteCompleted = async (ids: Array<string>) => {
  return axios.delete(config.API_URL, { data: { ids } });
};

export const updateCompleted = async (
  ids: Array<string>,
  completed: boolean
) => {
  const response = await axios.put(config.API_URL, { ids, completed });
  return response.data;
};

export const signUp = async (user: PostRegistration) => {
  const response = await axios.post(`${config.AUTH_URL}/registration`, user);
  return response.data;
};

export const signIn = async (user: PostRegistration) => {
  const response = await axios.post(`${config.AUTH_URL}/login`, user);
  console.log(response)
  return response.data;
};
