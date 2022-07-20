import { useState } from "react";
import { actionUpdateTodo, actionDeleteTodo } from "../asyncActions";
import { useAppSelector, useAppDispatch } from "../hooks";
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
import { ITodoGet } from "types/interfaces";
type Props = {
  item: ITodoGet;
};

function Task({ item }: Props): JSX.Element {
  const offset = useAppSelector((state) => state.status.offset);
  const completed = useAppSelector((state) => state.status.completed);
  const token: string | null = useAppSelector((state) => state.auth.token);
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  const dispatch = useAppDispatch();

  const startEdit = () => {
    setEditing(true);
    setValue(item.value);
  };

  const saveItem = () => {
    const a: any = actionUpdateTodo({
      id: item.id,
      updatedTodo: { value },
      token,
    });
    dispatch(a);
    setEditing(false);
    setValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              dispatch(
                actionUpdateTodo({
                  id: item.id,
                  updatedTodo: { completed: !item.completed },
                  token,
                })
              )
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
        onClick={() =>
          dispatch(actionDeleteTodo({ id: item.id, offset, token, completed }))
        }
      />
    </TaskItem>
  );
}

export default Task;
