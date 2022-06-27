import { useState, useEffect } from "react";
import TasksList from "./TasksList";
import InputTask from "./InputTask";

const App = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const [selectFilter, setSelectFilter] = useState("all");
  const [valueEditItem, setValueEditItem] = useState("");

  const addTask = () => {
    if (value) {
      setItems([
        ...items,
        {
          id: Date.now(),
          value: value,
          completed: false,
          isEditing: false,
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

  const deleteCompletedTasks = () => {
    setItems((prevState) =>
      prevState.filter((item) => {
        if (!item.completed) return item;
      })
    );
    setSelectFilter("all");
  };

  const switchEditing = (id) => {
    setItems((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          setValueEditItem(item.value);
          return {
            ...item,
            isEdit: !item.isEdit,
          };
        }
        
        return {
          ...item,
          isEdit: false,
        };
      })
    );
  };

  const editTask = (id) => {
    setItems((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            value: valueEditItem,
            isEdit: !item.isEdit,
          };
        }

        return item;
      })
    );
    setValueEditItem("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      addTask();
    }
  };

  const handleChangeEditItem = (e) => {
    setValueEditItem(e.target.value);
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
        switchEditing={switchEditing}
        handleChange={handleChangeEditItem}
        editTask={editTask}
        value={valueEditItem}
      />
      <div onClick={filterTasks}>
        <button className={selectFilter === "all" ? "select" : ""}>All</button>
        <button className={selectFilter === "active" ? "select" : ""}>
          Active
        </button>
        <button className={selectFilter === "completed" ? "select" : ""}>
          Completed
        </button>
      </div>
      <button onClick={deleteCompletedTasks}>Clear completed</button>
    </div>
  );
};

export default App;
