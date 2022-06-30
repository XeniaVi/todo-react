import { useState } from "react";
import {
  ButtonDelete,
  ButtonSave,
  CheckboxList,
  Input,
  TaskInner,
  TaskItem,
  EditInput,
  TaskText,
} from "../styles/components";

function Task({ item, deleteTask, editTask, handleChangeItem }) {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  const startEdit = () => {
    setEditing(true);
    setValue(item.value);
  };

  const saveItem = (id) => {
    editTask(id, value);
    setEditing(false);
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <TaskItem>
        <TaskInner>
          <CheckboxList>
            <input
              type="checkbox"
              checked={item.completed ? true : false}
              onChange={() => handleChangeItem(item.id)}
            />
          </CheckboxList>
          {!isEditing ? (
            <TaskText
              onDoubleClick={() => startEdit()}
              $mode={item.completed ? "done" : ""}
            >
              {item.value}
            </TaskText>
          ) : (
            <EditInput>
              <Input type="text" value={value} onChange={handleChange} />
              <ButtonSave onClick={() => saveItem(item.id)}>Save</ButtonSave>
              <ButtonSave onClick={() => setEditing(false)}>Cancel</ButtonSave>
            </EditInput>
          )}
        </TaskInner>
        <ButtonDelete onClick={() => deleteTask(item.id)}></ButtonDelete>
      </TaskItem>
    </div>
  );
}

export default Task;
