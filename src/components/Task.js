import { CheckboxList, TaskInner, TaskItem } from "../styles/components";

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
            <span
              onDoubleClick={() => canEditTask(item.id)}
              className={`${item.completed ? "done" : ""}`}
            >
              {item.value}
            </span>
          ) : (
            <div>
              <input type="text" value={value} onChange={handleChange} />
              <button onClick={() => editTask(item.id)}>Save</button>
            </div>
          )}
        </TaskInner>
        <button onClick={() => deleteTask(item.id)}>x</button>
      </TaskItem>
    </div>
  );
}

export default Task;
