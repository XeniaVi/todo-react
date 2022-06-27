import { useState, useEffect } from "react";
import TasksList from "./TasksList";
import InputTask from "./InputTask";

const App = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const [selectFilter, setSelectFilter] = useState("all");

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
    setItems((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }

        return item;
      })
    );
  };

  const filterTasks = (e) => {
    const value = e.target.textContent.toLowerCase();

    switch (value) {
      case "completed":
        setFilterItems(items.filter((item) => item.completed));
        break;
      case "active":
        setFilterItems(items.filter((item) => !item.completed));
        break;
      default:
        setFilterItems(items);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      addTask();
    }
  };

  useEffect(() => {
    setFilterItems(items);
  }, [items]);

  return (
    <div>
      <InputTask
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        addTask={addTask}
        value={value}
      />
      <TasksList
        items={filterItems}
        deleteTask={deleteTask}
        changeStatus={changeStatus}
      />
      <div onClick={filterTasks}>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};

export default App;
