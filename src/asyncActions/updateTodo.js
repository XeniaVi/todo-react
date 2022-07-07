import {
  updateTodoAction,
  setErrorAction,
  setCompletedAllAction,
} from "../actions";
import { updateTodo as changeTodo } from "../api/todoApi";

export const updateTodo = (id, updatedTodo) => {
  return async (dispatch) => {
    try {
      await changeTodo(id, updatedTodo);

      dispatch(updateTodoAction({ id, updatedTodo }));
      dispatch(setCompletedAllAction(false));
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with updating... Let's try later!")
      );
    }
  };
};
