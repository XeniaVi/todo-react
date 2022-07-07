import { getTodosAction } from "../actions";
import { setCompletedAllAction } from "../actions";
import { getTodos } from "../api/todoApi";
import { LIMIT } from "../constants";

export const fetchTodos = (offset, completed) => {
  return async (dispatch) => {
    try {
      const response = await getTodos(LIMIT, offset, completed);

      dispatch(getTodosAction(response));
      console.log(response);
      dispatch(
        setCompletedAllAction(
          LIMIT === response.todos.filter((item) => item.completed).length
        )
      );
    } catch (e) {
      console.log(e);
      //setError("Something troubled... Let's update the page!");
    }
  };
};
