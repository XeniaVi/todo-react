import {
  addTodoAction,
  setErrorAction,
  setCompletedAction,
  setCompletedAllAction,
} from "../actions";
import { addTodoToDB } from "../api/todoApi";

export const addTodo = (value) => {
  console.log("addTodo  async action", value);
  return async (dispatch) => {
    try {
      const response = await addTodoToDB({
        value: value,
        completed: false,
        timestamp: Date.now(),
      });

      dispatch(addTodoAction(response));
      dispatch(setCompletedAction(null));
      dispatch(setCompletedAllAction(false));
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with adding... Let's try later!")
      );
    }
  };
};
