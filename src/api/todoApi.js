import axios from "axios";
import { config } from "../config/config.js";

export const getTodos = async () => {
  try {
    const response = await axios.get(config.API_URL);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const addTodoToDB = async (item) => {
  const response = await axios.post(config.API_URL, item);
  return response.data;
};
