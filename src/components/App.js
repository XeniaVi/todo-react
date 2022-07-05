import { useState, useEffect } from "react";
import TasksList from "./TasksList";
import InputTask from "./InputTask";
import Pagination from "./Pagination";
import {
  Container,
  Wrapper,
  Title,
  Footer,
  ButtonFooter,
  FilterWrapper,
  ErrorMessage,
  CloseButton,
} from "../styles/components";
import {
  getTodos,
  addTodoToDB,
  deleteTodoFromDB,
  updateTodoInDB,
  deleteCompleted,
  updateCompleted,
} from "../api/todoApi.js";

const App = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [selectFilter, setSelectFilter] = useState("all");
  const [isShowCheckbox, setShowCheckbox] = useState(false);
  const [completedAll, setCompletedAll] = useState(false);
  const [errorMessage, setError] = useState("");
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const [countAll, setCountAll] = useState(0);
  const [pages, setPages] = useState([]);

  const addTask = async () => {
    if (value) {
      try {
        const response = await addTodoToDB({
          value: value,
          completed: false,
        });

        setItems([...items, response]);
        setValue("");
        setCompletedAll(false);
      } catch (e) {
        setError("Something troubled with adding... Let's try later");
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTodoFromDB(id);
      setItems(items.filter((item) => item.id !== id));
    } catch (e) {
      setError("Something troubled with removing... Let's try later");
    }
  };

  const changeStatus = async (id, completed) => {
    try {
      const post = { completed };

      await updateTodoInDB(id, post);

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
    } catch (e) {
      setError("Something troubled with updating... Let's try later");
    }
  };

  const filterTasks = (e) => {
    const value = e ? e.target.textContent.toLowerCase() : selectFilter;
    let completed;

    switch (value) {
      case "completed":
        completed = true;
        setSelectFilter("completed");
        break;
      case "active":
        completed = false;
        setSelectFilter("active");
        break;
      default:
        setSelectFilter("all");
    }

    fetchTodos(limit, offset, completed);
  };

  const deleteCompletedTasks = async () => {
    try {
      const ids = items
        .filter((item) => item.completed)
        .map((item) => {
          return item.id;
        });

      await deleteCompleted(ids);

      setItems((prevState) => prevState.filter((item) => !item.completed));
      setSelectFilter("all");
    } catch (error) {
      setError("Something troubled with removing... Let's try later");
    }
  };

  const editTask = async (id, value) => {
    try {
      const post = { value };
      await updateTodoInDB(id, post);

      setItems((prevState) =>
        prevState.map((item) =>
          item.id === id
            ? {
                ...item,
                value: value,
              }
            : item
        )
      );
    } catch (e) {
      setError("Something troubled with updating... Let's try later");
    }
  };

  const toggleAllStatus = async () => {
    try {
      if (completedAll) {
        const ids = items
          .filter((item) => item.completed)
          .map((item) => item.id);

        await updateCompleted(ids, false);

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
        const ids = items
          .filter((item) => !item.completed)
          .map((item) => item.id);

        await updateCompleted(ids, true);

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
    } catch (error) {
      setError("Something troubled with updating... Let's try later");
    }
  };

  const fetchTodos = async (limit, offset, completed) => {
    try {
      const res = await getTodos(limit, offset, completed);
      setItems(res.todos);
      setCountAll(res.count);
      const list = [];
      const length =
        Math.ceil(res.count / limit) >= 3 ? 3 : Math.ceil(res.count / limit);
      for (let i = 1; i <= length; i++) list.push(i);
      setPages(list);
    } catch (e) {
      setError("Something troubled... Let's update the page!");
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

  const handleChangeInputCheckbox = () => {
    setCompletedAll(!completedAll);
  };

  const handleChangeItem = (id, completed) => {
    changeStatus(id, completed);
  };

  useEffect(() => {
    fetchTodos(limit, offset);
  }, []);

  useEffect(() => {
    setError("");
    setShowCheckbox(Boolean(items.length));
    setCount(items.filter((item) => !item.completed).length);
  }, [items]);

  return (
    <div>
      <Container>
        <Title>todos</Title>
        {errorMessage ? (
          <ErrorMessage>
            {errorMessage}{" "}
            <CloseButton onClick={() => setError("")}></CloseButton>
          </ErrorMessage>
        ) : (
          ""
        )}
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
          <Pagination pages={pages} />
          {items.length ? (
            <div>
              <TasksList
                items={items}
                deleteTask={deleteTask}
                editTask={editTask}
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
