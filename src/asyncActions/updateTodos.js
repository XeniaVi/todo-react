import { updateTodosAction, setErrorAction } from "../actions";
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
      dispatch(
        setErrorAction("Something troubled with updating... Let's try later!")
      );
    }
  };
};
