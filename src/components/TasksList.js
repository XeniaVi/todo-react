import Task from "./Task";
import { Tasks } from "../styles/components";

function TasksList({
  items,
  deleteTask,
  switchEditing,
  handleChange,
  value,
  editTask,
  handleChangeItem,
}) {
  return (
    <div>
      <Tasks>
        {items.map((item) => (
          <Task
            item={item}
            key={item._id}
            deleteTask={deleteTask}
            switchEditing={switchEditing}
            handleChange={handleChange}
            editTask={editTask}
            value={value}
            handleChangeItem={handleChangeItem}
          />
        ))}
      </Tasks>
    </div>
  );
}

export default TasksList;
