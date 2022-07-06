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
  const limit = 5;
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [selectFilter, setSelectFilter] = useState("all");
  const [completed, setCompleted] = useState(null);
  const [completedAll, setCompletedAll] = useState(false);
  const [errorMessage, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  const addTask = async () => {
    if (value) {
      try {
        const response = await addTodoToDB({
          value: value,
          completed: false,
          timestamp: Date.now(),
        });

        const todos = items.length >= limit ? items.slice(0, limit - 1) : items;
        setItems([response, ...todos]);
        setValue("");
        setCompletedAll(false);
        setCompleted(null);
        setTotalCount((prevState) => prevState + 1);
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

    fetchTodos(limit, offset, completed);
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

    switch (value) {
      case "completed":
        setSelectFilter("completed");
        setCompleted(true);
        setCompletedAll(true);
        break;
      case "active":
        setSelectFilter("active");
        setCompleted(false);
        setCompletedAll(false);
        break;
      default:
        setSelectFilter("all");
        setCompleted(null);
        setCompletedAll(false);
    }

    setOffset(0);
    setPage(1);
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
    } catch (error) {
      setError("Something troubled with removing... Let's try later");
    }

    fetchTodos(limit, offset, completed);
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
        const ids = items.map((item) => item.id);

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
      const { todos, count } = await getTodos(limit, offset, completed);

      setItems(todos);
      setTotalCount(count);
    } catch (e) {
      setError("Something troubled... Let's update the page!");
    }
  };

  const switchPages = async (value) => {
    setPage(value);
    setOffset((value - 1) * limit);
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
    setCount(items.filter((item) => !item.completed).length);
  }, [items]);

  useEffect(() => {
    fetchTodos(limit, offset, completed);
  }, [page, completed]);

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
            length={items.length}
            toggleAllStatus={toggleAllStatus}
            completedAll={completedAll}
            handleChangeInputCheckbox={handleChangeInputCheckbox}
          />
          <Pagination
            page={page}
            switchPages={switchPages}
            totalCount={totalCount}
            limit={limit}
          />
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
