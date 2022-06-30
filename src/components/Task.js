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
              onChange={() => handleChangeItem(item._id)}
            />
          </CheckboxList>
          {!item.isEditing ? (
            <TaskText
              onDoubleClick={() => switchEditing(item._id)}
              $mode={item.completed ? "done" : ""}
            >
              {item.value}
            </TaskText>
          ) : (
            <EditInput>
              <Input type="text" value={value} onChange={handleChange} />
              <ButtonSave onClick={() => editTask(item._id)}>Save</ButtonSave>
            </EditInput>
          )}
        </TaskInner>
        <ButtonDelete onClick={() => deleteTask(item._id)}></ButtonDelete>
      </TaskItem>
    </div>
  );
}

export default Task;
