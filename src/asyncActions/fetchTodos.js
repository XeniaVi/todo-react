import {
  getTodosAction,
  setCompletedAllAction,
  setCountAction,
  setErrorAction,
} from "../actions";
import { getTodos } from "../api/todoApi";
import constants from "../constants";

const { TODOS_AT_PAGE } = constants;

export const fetchTodos = (offset, completed) => {
  return async (dispatch) => {
    try {
      const response = await getTodos(TODOS_AT_PAGE, offset, completed);
      dispatch(getTodosAction(response));

      const { todos } = response.todos;
      const length = todos.filter((item) => item.completed).length;

      dispatch(setCompletedAllAction(todos.length === length));
      dispatch(setCountAction(todos.filter((item) => !item.completed).length));
    } catch (e) {
      dispatch(setErrorAction("Something troubled... Let's update the page!"));
    }
  };
};
