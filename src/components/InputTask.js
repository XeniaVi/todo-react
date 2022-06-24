const InputTask = ({addTask, handleChange, value}) => {
    return (<div>
        <input type='text' placeholder='Add task' onChange={handleChange} value={value}></input>
        <button onClick={addTask}>Add</button>
      </div>)
}

export default InputTask;