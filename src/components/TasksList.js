import Task from "./Task";

const TasksList = ({ items, deleteTask }) => {
  return (
    <div>
      <ul className="list">
        {items.map((item) => (
          <Task item={item} key={item.id} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
