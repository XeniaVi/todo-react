function Task({
  item,
  deleteTask,
  changeStatus,
  switchEditing,
  handleChange,
  value,
  editTask,
  handleChangeItem,
}) {
  return (
    <div>
      <li className="list-item">
        <input
          type="checkbox"
          checked={item.completed ? true : false}
          onChange={() => handleChangeItem(item.id)}
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
