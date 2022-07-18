import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../hooks'
import { fetchTodos } from "../asyncActions";
import Task from "./Task";
import { Tasks } from "../styles/components";

import { ITodoGet } from "types";

function TasksList(): JSX.Element {
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.todos.todos);
  const currentPage = useAppSelector((state) => state.status.currentPage);
  const completed = useAppSelector((state) => state.status.completed);
  const offset = useAppSelector((state) => state.status.offset);
  const filter = useAppSelector((state) => state.status.filter);
  const token: string | null = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(fetchTodos({ offset, token, completed }));
  }, [currentPage, completed, offset, dispatch, filter]);

  return (
    <Tasks>
      {items.map((item: ITodoGet) => (
        <Task item={item} key={item.id} />
      ))}
    </Tasks>
  );
}

export default TasksList;
