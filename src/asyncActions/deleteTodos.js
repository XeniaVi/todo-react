import { fetchTodos } from "./fetchTodos";
import { deleteCompleted } from "../api/todoApi";
import { setErrorAction } from "../actions";

export const deleteTodos = (ids, offset) => {
  console.log(ids);
  return async (dispatch) => {
    try {
      await deleteCompleted(ids);
      console.log(ids);
      dispatch(fetchTodos(offset));
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with removing... Let's try later!")
      );
    }
  };
};
