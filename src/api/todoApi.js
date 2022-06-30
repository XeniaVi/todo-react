import axios from "axios";
import { config } from "../config/config.js";

export const getTodos = async () => {
  try {
    let response = await axios.get(config.API_URL);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
