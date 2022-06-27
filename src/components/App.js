import { useState, useEffect } from "react";
import TasksList from "./TasksList";
import InputTask from "./InputTask";

const App = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const [selectFilter, setSelectFilter] = useState("all");
  const [valueEditItem, setValueEditItem] = useState("");
  const [isShowCheckbox, setShowCheckbox] = useState(false);
  const [completedAll, setCompletedAll] = useState(false);

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
      setCompletedAll(false);
    }
  };

  const deleteTask = (id) => {
    const res = items.filter((item) => item.id !== id);
    setItems(res);
  };

  const changeStatus = (id) => {
    setItems((prevState) =>
      prevState.map((item) => {
        return item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item;
      })
    );
    setCompletedAll(false);
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
    setItems((prevState) => prevState.filter((item) => !item.completed));
    setSelectFilter("all");
  };

  const switchEditing = (id) => {
    setItems((prevState) =>
      prevState.map((item) => {
        if (item.id === id) setValueEditItem(item.value);
        return item.id === id
          ? {
              ...item,
              isEdit: !item.isEdit,
            }
          : {
              ...item,
              isEdit: false,
            };
      })
    );
  };

  const editTask = (id) => {
    setItems((prevState) =>
      prevState.map((item) => {
        return item.id === id
          ? {
              ...item,
              value: valueEditItem,
              isEdit: !item.isEdit,
            }
          : item;
      })
    );
    setValueEditItem("");
  };

  const toggleAllStatus = () => {
    completedAll
      ? setItems((prevState) =>
          prevState.map((item) => {
            if (item.completed) {
              return {
                ...item,
                completed: !item.completed,
              };
            }
            return item;
          })
        )
      : setItems((prevState) =>
          prevState.map((item) => {
            if (!item.completed) {
              return {
                ...item,
                completed: !item.completed,
              };
            }
            return item;
          })
        );
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

  const handleChangeInputCheckbox = () => {
    setCompletedAll(!completedAll);
  };

  const handleChangeItem = (id) => {
    changeStatus(id);
  };

  useEffect(() => {
    filterTasks();
    setShowCheckbox(Boolean(items.length));
  }, [items]);

  return (
    <div>
      <InputTask
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        addTask={addTask}
        value={value}
        isShowCheckbox={isShowCheckbox}
        toggleAllStatus={toggleAllStatus}
        completedAll={completedAll}
        handleChangeInputCheckbox={handleChangeInputCheckbox}
      />
      <TasksList
        items={filterItems}
        deleteTask={deleteTask}
        switchEditing={switchEditing}
        handleChange={handleChangeEditItem}
        editTask={editTask}
        value={valueEditItem}
        handleChangeItem={handleChangeItem}
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
