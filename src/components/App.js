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

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <InputTask handleChange={handleChange} addTask={addTask} value={value} />
      <TasksList items={items} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
