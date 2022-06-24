function Task({ value }) {
  return (
    <div>
      <li className="list-item">
        <input type="checkbox"></input>
        <span>{value}</span>
        <button>x</button>
      </li>
    </div>
  );
}

export default Task;
