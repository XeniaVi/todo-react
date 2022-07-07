import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompletedAction,
  setPageAction,
  setOffsetAction,
  setCountAction,
  setErrorAction,
  setFilterAction,
  setCompletedAllAction,
} from "../actions";
import { fetchTodos } from "../asyncActions/fetchTodos";
import { deleteTodos } from "../asyncActions/deleteTodos";
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
  const offset = useSelector((state) => state.status.offset);
  const items = useSelector((state) => state.todos.todos);
  const count = useSelector((state) => state.status.count);
  const errorMessage = useSelector((state) => state.status.errorMessage);
  const filter = useSelector((state) => state.status.filter);

  const filterTasks = (e) => {
    const value = e ? e.target.textContent.toLowerCase() : filter;

    switch (value) {
      case "completed":
        dispatch(setCompletedAction(true));
        dispatch(setFilterAction("completed"));
        dispatch(setCompletedAllAction(true));
        break;
      case "active":
        dispatch(setFilterAction("active"));
        dispatch(setCompletedAction(false));
        dispatch(setCompletedAllAction(false));
        break;
      default:
        dispatch(setFilterAction("all"));
        dispatch(setCompletedAction(null));
        dispatch(setCompletedAllAction(false));
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

  useEffect(() => {
    dispatch(fetchTodos(offset));
  }, []);

  useEffect(() => {
    dispatch(setErrorAction(""));
    dispatch(setCountAction(items.filter((item) => !item.completed).length));
  }, [items]);

  return (
    <div>
      <Container>
        <Title>todos</Title>
        {errorMessage ? (
          <ErrorMessage>
            {errorMessage}{" "}
            <CloseButton
              onClick={() => dispatch(setErrorAction(""))}
            ></CloseButton>
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
                  <ButtonFooter $mode={filter === "all" ? "select" : ""}>
                    All
                  </ButtonFooter>
                  <ButtonFooter $mode={filter === "active" ? "select" : ""}>
                    Active
                  </ButtonFooter>
                  <ButtonFooter $mode={filter === "completed" ? "select" : ""}>
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
