import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../asyncActions";
import Task from "./Task";
import { Tasks } from "../styles/components";

function TasksList() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.todos.todos);
  const currentPage = useSelector((state) => state.status.currentPage);
  const completed = useSelector((state) => state.status.completed);
  const offset = useSelector((state) => state.status.offset);

  useEffect(() => {
    dispatch(fetchTodos(offset, completed));
  }, [currentPage, completed]);

  return (
    <Tasks>
      {items.map((item) => (
        <Task item={item} key={item.id} />
      ))}
    </Tasks>
  );
}

export default TasksList;
