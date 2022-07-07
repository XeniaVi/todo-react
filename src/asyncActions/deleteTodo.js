import { fetchTodos } from "./fetchTodos";
import { deleteTodoFromDB } from "../api/todoApi";
import { setErrorAction } from "../actions";

export const deleteTodo = (id, offset) => {
  console.log(id);
  return async (dispatch) => {
    try {
      await deleteTodoFromDB(id);
      console.log(id);
      dispatch(fetchTodos(offset));
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with removing... Let's try later!")
      );
    }
  };
};
