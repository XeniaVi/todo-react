import Task from "./Task";
import { Tasks } from "../styles/components";

function TasksList({ items, deleteTask, handleChangeItem, editTask }) {
  return (
    <div>
      <Tasks>
        {items.map((item) => (
          <Task
            item={item}
            key={item.id}
            deleteTask={deleteTask}
            handleChangeItem={handleChangeItem}
            editTask={editTask}
          />
        ))}
      </Tasks>
    </div>
  );
}

export default TasksList;
