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
    const value = e ? e.target.textContent.toLowerCase() : selectFilter;

    switch (value) {
      case "completed":
        setFilterItems(items.filter((item) => item.completed));
        setSelectFilter("completed");
        break;
      case "active":
        setFilterItems(items.filter((item) => !item.completed));
        setSelectFilter("active");
        break;
      default:
        setFilterItems(items);
        setSelectFilter("all");
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
    filterTasks();
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
        <button className={selectFilter === 'all' ? 'select' : ''}>All</button>
        <button className={selectFilter === 'active' ? 'select' : ''}>Active</button>
        <button className={selectFilter === 'completed' ? 'select' : ''}>Completed</button>
      </div>
    </div>
  );
};

export default App;
