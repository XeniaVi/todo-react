import { updateTodoAction, setErrorAction } from "../actions";
import { updateTodoInDB } from "../api/todoApi";

export const updateTodo = (id, updatedTodo) => {
  console.log("addTodo  async action", updatedTodo);
  return async (dispatch) => {
    console.log(111, dispatch);
    try {
      const res = await updateTodoInDB(id, updatedTodo);

      dispatch(updateTodoAction({ id, updatedTodo }));
      // setCompletedAll(false);
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with updating... Let's try later!")
      );
    }
  };
};
