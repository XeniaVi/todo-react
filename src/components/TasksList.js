import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../asyncActions/fetchTodos";
import Task from "./Task";
import { Tasks } from "../styles/components";

function TasksList() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.todos.todos);
  const page = useSelector((state) => state.status.page);
  const completed = useSelector((state) => state.status.completed);
  const offset = useSelector((state) => state.status.offset);

  useEffect(() => {
    dispatch(fetchTodos(offset, completed));
  }, [page, completed]);

  return (
    <div>
      <Tasks>
        {items.map((item) => (
          <Task item={item} key={item.id} />
        ))}
      </Tasks>
    </div>
  );
}

export default TasksList;
