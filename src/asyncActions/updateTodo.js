import { updateTodoAction } from "../actions";
import { updateTodoInDB } from "../api/todoApi";

export const updateTodo = (id, value) => {
  console.log("addTodo  async action", value);
  return async (dispatch) => {
    try {
      const post =
        typeof value === "string " ? { value } : { completed: value };
      await updateTodoInDB(id, post);

      dispatch(updateTodoAction({ id, post }));
      // setCompletedAll(false);
    } catch (e) {
      console.log(e);
      //setError("Something troubled with adding... Let's try later");
    }
  };
};
