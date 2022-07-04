import axios from "axios";
import { config } from "../config/config.js";

export const getTodos = async () => {
  const response = await axios.get(config.API_URL);
  return response.data;
};

export const addTodoToDB = async (item) => {
  const response = await axios.post(config.API_URL, item);
  return response.data;
};

export const deleteTodoFromDB = (id) => {
  axios.delete(`${config.API_URL}/${id}`, id);
};

export const updateTodoInDB = async (id, value) => {
  const response = await axios.put(`${config.API_URL}/${id}`, { value });
  return response.data;
};
