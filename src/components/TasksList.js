import Task from "./Task";

function TasksList({ items, deleteTask, changeStatus }) {
  return (
    <div>
      <ul className="list">
        {items.map((item) => (
          <Task
            item={item}
            key={item.id}
            deleteTask={deleteTask}
            changeStatus={changeStatus}
          />
        ))}
      </ul>
    </div>
  );
}

export default TasksList;
