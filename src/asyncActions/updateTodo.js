import {
  updateTodoAction,
  setErrorAction,
  setCompletedAllAction,
} from "../actions";
import { updateTodoInDB } from "../api/todoApi";

export const updateTodo = (id, updatedTodo) => {
  return async (dispatch) => {
    try {
      await updateTodoInDB(id, updatedTodo);

      dispatch(updateTodoAction({ id, updatedTodo }));
      dispatch(setCompletedAllAction(false));
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with updating... Let's try later!")
      );
    }
  };
};
