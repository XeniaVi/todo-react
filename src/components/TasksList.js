import Task from "./Task";

function TasksList({
  items,
  deleteTask,
  switchEditing,
  handleChange,
  value,
  editTask,
  handleChangeItem
}) {
  return (
    <div>
      <ul className="list">
        {items.map((item) => (
          <Task
            item={item}
            key={item.id}
            deleteTask={deleteTask}
            switchEditing={switchEditing}
            handleChange={handleChange}
            editTask={editTask}
            value={value}
            handleChangeItem={handleChangeItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default TasksList;
