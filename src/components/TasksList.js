import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../asyncActions/fetchTodos";
import Task from "./Task";
import { Tasks } from "../styles/components";

function TasksList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.todos.todos);
  const currentPage = useSelector((state) => state.todos.currentPage);
  const completed = useSelector((state) => state.status.completed);
  const offset = useSelector((state) => state.status.offset);

  console.log(offset);

  useEffect(() => {
    dispatch(fetchTodos(offset));
  }, []);

  useEffect(() => {
    dispatch(fetchTodos(offset, completed));
  }, [currentPage, completed]);

  return (
    <div>
      <Tasks>
        {items.map((item) => (
          <Task
            item={item}
            key={item.id}
            // deleteTask={deleteTask}
            // handleChangeItem={handleChangeItem}
            // editTask={editTask}
          />
        ))}
      </Tasks>
    </div>
  );
}

export default TasksList;
