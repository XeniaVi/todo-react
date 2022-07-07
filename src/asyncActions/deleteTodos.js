import { fetchTodos } from "./fetchTodos";
import { deleteCompleted } from "../api/todoApi";
import { setErrorAction } from "../actions";

export const deleteTodos = (ids, offset, completed) => {
  return async (dispatch) => {
    try {
      await deleteCompleted(ids);
      dispatch(fetchTodos(offset, completed));
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with removing... Let's try later!")
      );
    }
  };
};
