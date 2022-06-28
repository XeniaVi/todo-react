import { useState, useEffect } from "react";
import TasksList from "./TasksList";
import InputTask from "./InputTask";
import { Container, Wrapper, Title } from "../styles/components";

const App = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
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
      setCount((prevCount) => prevCount + 1);
    }
  };

  const deleteTask = (id) => {
    const res = items.filter((item) => {
      if (id === item.id && !item.completed) setCount(count - 1);

      return item.id !== id;
    });
    setItems(res);
  };

  const changeStatus = (id) => {
    setItems((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
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
      prevState.map((item) =>
        item.id === id
          ? {
              ...item,
              value: valueEditItem,
              isEditing: !item.isEditing,
            }
          : item
      )
    );
    setValueEditItem("");
  };

  const toggleAllStatus = () => {
    if (completedAll) {
      setItems((prevState) =>
        prevState.map((item) =>
          item.completed
            ? {
                ...item,
                completed: !item.completed,
              }
            : item
        )
      );

      setCount(items.length);
    } else {
      setItems((prevState) =>
        prevState.map((item) =>
          !item.completed
            ? {
                ...item,
                completed: !item.completed,
              }
            : item
        )
      );

      setCount(0);
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
    setCount(items.filter((item) => !item.completed).length);
  }, [items]);

  return (
    <div>
      <Container>
        <Title>todos</Title>
        <Wrapper>
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
          <div>{count} items left</div>
          <div onClick={filterTasks}>
            <button className={selectFilter === "all" ? "select" : ""}>
              All
            </button>
            <button className={selectFilter === "active" ? "select" : ""}>
              Active
            </button>
            <button className={selectFilter === "completed" ? "select" : ""}>
              Completed
            </button>
          </div>
          <button onClick={deleteCompletedTasks}>Clear completed</button>
        </Wrapper>
      </Container>
    </div>
  );
};

export default App;
