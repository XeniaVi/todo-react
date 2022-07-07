import {
  addTodoAction,
  setErrorAction,
  setCompletedAction,
  setCompletedAllAction,
  setFilterAction,
} from "../actions";
import { addTodo as appendTodo } from "../api/todoApi";

export const addTodo = (value) => {
  return async (dispatch) => {
    try {
      const response = await appendTodo({
        value: value,
        completed: false,
        createdAt: Date.now(),
      });

      dispatch(addTodoAction(response));
      dispatch(setCompletedAction(null));
      dispatch(setCompletedAllAction(false));
      dispatch(setFilterAction("all"));
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with adding... Let's try later!")
      );
    }
  };
};
