import {
  updateTodosAction,
  setErrorAction,
  setCompletedAllAction,
} from "../actions";
import { updateCompleted } from "../api/todoApi";

export const updateTodos = (ids, completed) => {
  return async (dispatch) => {
    try {
      await updateCompleted(ids, completed);

      dispatch(updateTodosAction(completed));
      dispatch(setCompletedAllAction(completed));
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with updating... Let's try later!")
      );
    }
  };
};
