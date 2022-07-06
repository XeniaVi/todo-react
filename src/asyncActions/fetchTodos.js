import { getTodosAction } from "../actions";
import { getTodos } from "../api/todoApi";
import { LIMIT } from "../constants";

export const fetchTodos = (offset, completed) => {
  return async (dispatch) => {
    try {
      const response = await getTodos(LIMIT, offset, completed);

      dispatch(getTodosAction(response));
    } catch (e) {
      console.log(e);
      //setError("Something troubled... Let's update the page!");
    }
  };
};
