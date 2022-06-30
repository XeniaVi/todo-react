import axios from "axios";
const URL = "http://localhost:8080/api/todos";

export const getTodos = async () => {
  try {
    let todos = await axios.get(URL);
    todos = todos.data;
    return todos;
  } catch (e) {
    console.log(e);
  }
};
