function Task({ item, deleteTask, changeStatus }) {
  return (
    <div>
      <li className="list-item">
        <input type="checkbox" onClick={() => changeStatus(item.id)} />
        <span className={`${item.completed ? 'done' : '' }`}>
          {item.value}
        </span>
        <button onClick={() => deleteTask(item.id)}>x</button>
      </li>
    </div>
  );
}

export default Task;
