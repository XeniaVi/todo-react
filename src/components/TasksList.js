import Task from "./Task";

function TasksList({
  items,
  deleteTask,
  changeStatus,
  switchEditing,
  handleChange,
  value,
  editTask,
}) {
  return (
    <div>
      <ul className="list">
        {items.map((item) => (
          <Task
            item={item}
            key={item.id}
            deleteTask={deleteTask}
            changeStatus={changeStatus}
            switchEditing={switchEditing}
            handleChange={handleChange}
            editTask={editTask}
            value={value}
          />
        ))}
      </ul>
    </div>
  );
}

export default TasksList;
