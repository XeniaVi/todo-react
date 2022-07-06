import { LIMIT } from "../constants";

export const fetchTodos = async (offset, completed) => {
  try {
    const { todos, count } = await getTodos(LIMIT, offset, completed);

    setItems(todos);
    setTotalCount(count);
  } catch (e) {
    setError("Something troubled... Let's update the page!");
  }
};
