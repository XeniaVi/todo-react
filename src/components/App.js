import { useState, useEffect } from "react";
import TasksList from "./TasksList";
import InputTask from "./InputTask";

const App = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);

  const addTask = () => {
    if (value) {
      setItems([
        ...items,
        {
          id: Date.now(),
          value: value,
          completed: false,
        },
      ]);
      setValue("");
    }
  };

  const deleteTask = (id) => {
    const res = items.filter((item) => item.id !== id);
    setItems(res);
  };

  const changeStatus = (id) => {
    let res = items.map(item => {
      if(item.id === id) {
        return {
          ...item,
          completed: !item.completed
        }
      }

      return item;
    });
    setItems(res);
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <InputTask handleChange={handleChange} addTask={addTask} value={value} />
      <TasksList items={items} deleteTask={deleteTask} changeStatus={changeStatus}/>
    </div>
  );
};

export default App;
