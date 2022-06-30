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
          </CheckboxList>
          {!item.isEditing ? (
            <TaskText
              onDoubleClick={() => switchEditing(item.id)}
              $mode={item.completed ? "done" : ""}
            >
              {item.value}
            </TaskText>
          ) : (
            <EditInput>
              <Input type="text" value={value} onChange={handleChange} />
              <ButtonSave onClick={() => editTask(item.id)}>Save</ButtonSave>
            </EditInput>
          )}
        </TaskInner>
        <ButtonDelete onClick={() => deleteTask(item.id)}></ButtonDelete>
      </TaskItem>
    </div>
  );
}

export default Task;
