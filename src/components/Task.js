import classNames from "classnames";

function Task({ item, deleteTask, changeStatus }) {
  return (
    <div>
      <li className="list-item">
        <input type="checkbox" onClick={() => changeStatus(item.id)} />
        <span className={classNames([""], { ["done"]: item.completed })}>
          {item.value}
        </span>
        <button onClick={() => deleteTask(item.id)}>x</button>
      </li>
    </div>
  );
}

export default Task;
