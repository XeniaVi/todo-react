import { getTodosAction } from "../actions";
import {
  setCompletedAllAction,
  setCountAction,
  setErrorAction,
} from "../actions";
import { getTodos } from "../api/todoApi";
import { LIMIT } from "../constants";

export const fetchTodos = (offset, completed) => {
  return async (dispatch) => {
    try {
      const response = await getTodos(LIMIT, offset, completed);

      dispatch(getTodosAction(response));
      dispatch(
        setCompletedAllAction(
          LIMIT === response.todos.filter((item) => item.completed).length
        )
      );
      dispatch(
        setCountAction(response.todos.filter((item) => !item.completed).length)
      );
    } catch (e) {
      console.log(e);
      dispatch(setErrorAction("Something troubled... Let's update the page!"));
    }
  };
};
