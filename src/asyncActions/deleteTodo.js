import { fetchTodos } from "../asyncActions/fetchTodos";
import { deleteTodoFromDB } from "../api/todoApi";

export const deleteTodo = (id, offset) => {
  console.log(id);
  return async (dispatch) => {
    try {
      await deleteTodoFromDB(id);
      console.log(id);
      dispatch(fetchTodos(offset));
    } catch (e) {
      console.log(e);
      //setError("Something troubled with adding... Let's try later");
    }
  };
};
