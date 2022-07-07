import axios from "axios";
import { config } from "../config/config.js";

export const getTodos = async (limit, offset, completed) => {
  const extra = typeof completed === "boolean" ? `&completed=${completed}` : "";
  const response = await axios.get(
    `${config.API_URL}?offset=${offset}&limit=${limit}${extra}`
  );
  return response.data;
};

export const addTodoToDB = async (item) => {
  const response = await axios.post(config.API_URL, item);
  return response.data;
};

export const deleteTodoFromDB = async (id) => {
  return axios.delete(`${config.API_URL}/${id}`, id);
};

export const updateTodoInDB = async (id, updatedTodo) => {
  const response = await axios.put(`${config.API_URL}/${id}`, updatedTodo);
  return response.data;
};

export const deleteCompleted = async (ids) => {
  return axios.delete(config.API_URL, { data: { ids } });
};

export const updateCompleted = async (ids, completed) => {
  const response = await axios.put(config.API_URL, { ids, completed });
  return response.data;
};
