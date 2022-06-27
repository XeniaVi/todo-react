import Task from "./Task";

function TasksList({
  items,
  deleteTask,
  changeStatus,
  canEditTask,
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
            canEditTask={canEditTask}
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
