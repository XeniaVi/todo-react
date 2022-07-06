import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../asyncActions/fetchTodos";
import Task from "./Task";
import { Tasks } from "../styles/components";

function TasksList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.todos.todos);

  console.log(items);

  useEffect(() => {
    dispatch(fetchTodos(0));
  }, []);

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
