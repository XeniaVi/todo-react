import { fetchTodos } from "./index.js";
import { deleteTodo as removeTodo } from "../api/todoApi";
import { setErrorAction } from "../actions";

export const deleteTodo = (id, offset, completed) => {
  return async (dispatch) => {
    try {
      await removeTodo(id);
      dispatch(fetchTodos(offset, completed));
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with removing... Let's try later!")
      );
    }
  };
};
