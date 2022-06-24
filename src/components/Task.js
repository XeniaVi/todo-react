function Task({ item, deleteTask }) {
  return (
    <div>
      <li className="list-item">
        <input type="checkbox" />
        <span>{item.value}</span>
        <button onClick={() => deleteTask(item.id)}>x</button>
      </li>
    </div>
  );
};

export default Task;
