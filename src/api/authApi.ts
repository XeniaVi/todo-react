import axios from "axios";
import { PostRegistration } from "types/interfaces";
import { config } from "../config/config";

export const signUp = async (user: PostRegistration) => {
    const response = await axios.post(`${config.AUTH_URL}/registration`, user);
    return response.data;
  };
  
  export const signIn = async (user: PostRegistration) => {
    const response = await axios.post(`${config.AUTH_URL}/login`, user);
    return response.data;
  };