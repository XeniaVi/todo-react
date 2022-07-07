import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompletedAction,
  setPageAction,
  setOffsetAction,
  setCountAction,
} from "../actions";
import { fetchTodos } from "../asyncActions/fetchTodos";
import { deleteTodos } from "../asyncActions/deleteTodos";
import { updateTodos } from "../asyncActions/updateTodos";
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

const App = () => {
  const dispatch = useDispatch();
  const completed = useSelector((state) => state.status.completed);
  const offset = useSelector((state) => state.status.offset);
  const items = useSelector((state) => state.todos.todos);
  const completedAll = useSelector((state) => state.status.completedAll);
  const count = useSelector((state) => state.status.count);

  const [selectFilter, setSelectFilter] = useState("all");
  const [errorMessage, setError] = useState(""); //перенести в status

  const filterTasks = (e) => {
    const value = e ? e.target.textContent.toLowerCase() : selectFilter;

    switch (value) {
      case "completed":
        setSelectFilter("completed");
        dispatch(setCompletedAction(true));
        //setCompletedAll(true);
        break;
      case "active":
        setSelectFilter("active");
        dispatch(setCompletedAction(false));
        //setCompletedAll(false);
        break;
      default:
        setSelectFilter("all");
        dispatch(setCompletedAction(null));
      //setCompletedAll(false);
    }

    dispatch(setOffsetAction(0));
    dispatch(setPageAction(1));
  };

  const deleteCompletedTasks = async () => {
    const ids = items
      .filter((item) => item.completed)
      .map((item) => {
        return item.id;
      });
    dispatch(deleteTodos(ids, offset));
  };

  const toggleAllStatus = async () => {
    //переписать с использованием redux
    try {
      if (completedAll) {
        const ids = items.map((item) => item.id);
        dispatch(updateTodos(ids, false));
      } else {
        const ids = items
          .filter((item) => !item.completed)
          .map((item) => item.id);
        dispatch(updateTodos(ids, true));
      }

      //   setItems((prevState) =>
      //     prevState.map((item) =>
      //       item.completed
      //         ? {
      //             ...item,
      //             completed: !item.completed,
      //           }
      //         : item
      //     )
      //   );
      // } else {
      //   const ids = items
      //     .filter((item) => !item.completed)
      //     .map((item) => item.id);

      // setItems((prevState) =>
      //   prevState.map((item) =>
      //     !item.completed
      //       ? {
      //           ...item,
      //           completed: !item.completed,
      //         }
      //       : item
      //   )
      // );
    } catch (error) {
      setError("Something troubled with updating... Let's try later");
    }
  };

  const handleChangeInputCheckbox = () => {
    //переписать с использованием redux
    //setCompletedAll(!completedAll);
  };

  // const handleChangeItem = (id, completed) => {
  //   changeStatus(id, completed);
  // };

  useEffect(() => {
    dispatch(fetchTodos(offset));
  }, []);

  useEffect(() => {
    dispatch(setCountAction(items.filter((item) => !item.completed).length));
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
          <InputTask />
          <Pagination />
          {items.length ? (
            <div>
              <TasksList />
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
