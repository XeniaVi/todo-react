function Task({
  item,
  deleteTask,
  changeStatus,
  switchEditing,
  handleChange,
  value,
  editTask,
}) {
  return (
    <div>
      <li className="list-item">
        <input
          type="checkbox"
          onClick={() => changeStatus(item.id)}
          defaultChecked={item.completed}
        />
        {!item.isEdit ? (
          <span
            onDoubleClick={() => switchEditing(item.id)}
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
        <button onClick={() => deleteTask(item.id)}>x</button>
      </li>
    </div>
  );
}

export default Task;
