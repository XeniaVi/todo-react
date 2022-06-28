import {
  ButtonDelete,
  ButtonSave,
  CheckboxList,
  Input,
  TaskInner,
  TaskItem,
  EditInput,
} from "../styles/components";

function Task({
  item,
  deleteTask,
  switchEditing,
  handleChange,
  value,
  editTask,
  handleChangeItem,
}) {
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
            u
          </CheckboxList>
          {!item.isEditing ? (
            <div
              onDoubleClick={() => switchEditing(item.id)}
              className={`${item.completed ? "done" : ""}`}
            >
              {item.value}
            </div>
          ) : (
            <EditInput>
              <Input type="text" value={value} onChange={handleChange} />
              <ButtonSave onClick={() => editTask(item.id)}>Save</ButtonSave>
            </EditInput>
          )}
        </TaskInner>
        <ButtonDelete onClick={() => deleteTask(item.id)}>x</ButtonDelete>
      </TaskItem>
    </div>
  );
}

export default Task;
