import { fetchTodos } from "./fetchTodos";
import { deleteCompleted } from "../api/todoApi";

export const deleteTodos = (ids, offset) => {
  console.log(ids);
  return async (dispatch) => {
    try {
      await deleteCompleted(ids);
      console.log(ids);
      dispatch(fetchTodos(offset));
    } catch (e) {
      console.log(e);
      //setError("Something troubled with adding... Let's try later");
    }
  };
};
