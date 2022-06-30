import { useState, useEffect } from "react";
import TasksList from "./TasksList";
import InputTask from "./InputTask";
import {
  Container,
  Wrapper,
  Title,
  Footer,
  ButtonFooter,
  FilterWrapper,
} from "../styles/components";
import { getTodos } from "../api/todoApi.js";

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
    }
  };

  const deleteTask = (id) => {
    setItems(items.filter((item) => item.id !== id));
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
            isEditing: !item.isEditing,
          };
        }

        return {
          ...item,
          isEditing: false,
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
    }
  };

  const fetchTodos = async () => {
    const res = await getTodos();
    setItems(res);
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
    fetchTodos();
  }, []);

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
          {items.length ? (
            <div>
              <TasksList
                items={filterItems}
                deleteTask={deleteTask}
                switchEditing={switchEditing}
                handleChange={handleChangeEditItem}
                editTask={editTask}
                value={valueEditItem}
                handleChangeItem={handleChangeItem}
              />
              <Footer>
                <div>{count} items left</div>
                <FilterWrapper onClick={filterTasks}>
                  <ButtonFooter $mode={selectFilter === "all" ? "select" : ""}>
                    All
                  </ButtonFooter>
                  <ButtonFooter
                    $mode={selectFilter === "active" ? "select" : ""}
                  >
                    Active
                  </ButtonFooter>
                  <ButtonFooter
                    $mode={selectFilter === "completed" ? "select" : ""}
                  >
                    Completed
                  </ButtonFooter>
                </FilterWrapper>
                <ButtonFooter onClick={deleteCompletedTasks}>
                  Clear completed
                </ButtonFooter>
              </Footer>
            </div>
          ) : (
            ""
          )}
        </Wrapper>
      </Container>
    </div>
  );
};

export default App;
