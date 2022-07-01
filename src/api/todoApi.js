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

export const deleteTodoFromDB = async (id) => {
  const response = await axios.delete(`${config.API_URL}/${id}`, id);
  return response.data;
};
