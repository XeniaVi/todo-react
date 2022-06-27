function InputTask({ addTask, handleChange, handleKeyDown, value }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Add task"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
      />
      <button onClick={addTask}>Add</button>
    </div>
  );
}

export default InputTask;
