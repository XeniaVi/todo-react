import { addTodoAction } from "../actions";
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
      // setCompletedAll(false);
      // setCompleted(null);
      // setTotalCount((prevState) => prevState + 1);
    } catch (e) {
      console.log(e);
      //setError("Something troubled with adding... Let's try later");
    }
  };
};
