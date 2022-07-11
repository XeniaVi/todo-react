import { useState } from "react";
import { updateTodo, deleteTodo } from "../asyncActions";
import { useAppSelector, useAppDispatch } from '../hooks'

import {
  ButtonDelete,
  ButtonSave,
  ButtonCancel,
  CheckboxList,
  Input,
  TaskInner,
  TaskItem,
  EditInput,
  TaskText,
} from "../styles/components";
import { IRootState, ITodoGet, HTMLElementEvent } from "types";
import { AnyAction } from "redux";
type Props = {
  item: ITodoGet;
}

function Task ({ item }: Props):JSX.Element {
  const offset = useAppSelector((state) => state.status.offset);
  const completed = useAppSelector((state) => state.status.completed);
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  const dispatch = useAppDispatch();

  const startEdit = () => {
    setEditing(true);
    setValue(item.value);
  };

  const saveItem = () => {
    const a: any = updateTodo(item.id, { value })
    dispatch(a);
    setEditing(false);
    setValue("");
  };

  const handleChange = (e: HTMLElementEvent<HTMLButtonElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <TaskItem>
      <TaskInner>
        <CheckboxList>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() =>
              dispatch(updateTodo(item.id, { completed: !item.completed }))
            }
          />
        </CheckboxList>
        {!isEditing ? (
          <TaskText
            onDoubleClick={startEdit}
            $mode={item.completed ? "done" : ""}
          >
            {item.value}
          </TaskText>
        ) : (
          <EditInput>
            <Input type="text" value={value} onChange={handleChange} />
            <ButtonSave onClick={() => saveItem()}>Save</ButtonSave>
            <ButtonCancel onClick={() => setEditing(false)}>
              Cancel
            </ButtonCancel>
          </EditInput>
        )}
      </TaskInner>
      <ButtonDelete
        onClick={() => dispatch(deleteTodo(item.id, offset, completed))}
      ></ButtonDelete>
    </TaskItem>
  );
}

export default Task;
