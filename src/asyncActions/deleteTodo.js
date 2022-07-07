import { fetchTodos } from "./fetchTodos";
import { deleteTodoFromDB } from "../api/todoApi";
import { setErrorAction } from "../actions";

export const deleteTodo = (id, offset) => {
  return async (dispatch) => {
    try {
      await deleteTodoFromDB(id);
      dispatch(fetchTodos(offset));
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with removing... Let's try later!")
      );
    }
  };
};
