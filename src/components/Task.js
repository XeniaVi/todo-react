import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../asyncActions/updateTodo";
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

function Task({ item }) {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const startEdit = () => {
    setEditing(true);
    setValue(item.value);
  };

  const saveItem = () => {
    dispatch(updateTodo(item.id, { value }));
    setEditing(false);
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <TaskItem>
      <TaskInner>
        <CheckboxList>
          <input
            type="checkbox"
            checked={item.completed ? true : false}
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
      <ButtonDelete /*onClick={() => deleteTask(item.id)}*/></ButtonDelete>
    </TaskItem>
  );
}

export default Task;
