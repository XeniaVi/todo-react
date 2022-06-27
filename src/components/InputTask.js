function InputTask({
  addTask,
  handleChange,
  handleKeyDown,
  value,
  isShowCheckbox,
  toggleAllStatus,
  completedAll,
  handleChangeInputCheckbox 
}) {
  return (
    <div>
      {isShowCheckbox ? <input type="checkbox" onClick={toggleAllStatus} onChange={handleChangeInputCheckbox} checked={completedAll} /> : ""}
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
