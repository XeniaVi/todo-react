import { updateTodosAction } from "../actions";
import { setCompletedAllAction } from "../actions";
import { updateCompleted } from "../api/todoApi";

export const updateTodos = (ids, completed) => {
  console.log("addTodo  async action", completed);
  return async (dispatch) => {
    console.log(111, dispatch);
    try {
      await updateCompleted(ids, completed);

      dispatch(updateTodosAction(completed));
      dispatch(setCompletedAllAction(completed));
    } catch (e) {
      console.log(e);
      //setError("Something troubled with adding... Let's try later");
    }
  };
};
