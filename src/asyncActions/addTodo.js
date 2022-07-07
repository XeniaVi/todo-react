import {
  addTodoAction,
  setErrorAction,
  setCompletedAction,
  setCompletedAllAction,
  setFilterAction,
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
      dispatch(setFilterAction("all"));
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with adding... Let's try later!")
      );
    }
  };
};
