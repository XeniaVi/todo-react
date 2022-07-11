import { useEffect } from "react";
import { Dispatch } from 'redux';
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
import { fetchTodos, deleteTodos } from "../asyncActions";
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
import { ITodosState, IStatusState, IRootState, ITodoGet, HTMLElementEvent } from "types";

const App: React.FC = () => {
  const dispatch   = useDispatch();

  const items: ITodoGet[] = useSelector((state: IRootState) => state.todos.todos);
  const offset: number = useSelector((state: IRootState) => state.status.offset);
  const completed: boolean | null = useSelector((state: IRootState) => state.status.completed);
  const count: number = useSelector((state: IRootState) => state.status.count);
  const errorMessage: string = useSelector((state: IRootState) => state.status.errorMessage);
  const filter: string = useSelector((state: IRootState) => state.status.filter);

  const filterTasks = (e: HTMLElementEvent<HTMLButtonElement>) => {
    const { textContent } = e.target;
    const value: string = textContent ? textContent.toLowerCase() : filter;

    switch (value) {
      case "completed":
        dispatch(setCompletedAction(true));
        dispatch(setFilterAction("completed"));
        dispatch(setCompletedAllAction(true));
        dispatch(fetchTodos(offset, true));
        break;
      case "active":
        dispatch(setFilterAction("active"));
        dispatch(setCompletedAction(false));
        dispatch(setCompletedAllAction(false));
        dispatch(fetchTodos(offset, false));
        break;
      default:
        dispatch(setFilterAction("all"));
        dispatch(setCompletedAction(null));
        dispatch(setCompletedAllAction(false));
        dispatch(fetchTodos(offset, null));
    }

    dispatch(setOffsetAction(0));
    dispatch(setPageAction(1));
  };

  const deleteCompletedTasks = async () => {
    const ids = items.filter((item) => item.completed).map((item) => item.id);
    dispatch(deleteTodos(ids, offset, completed));
  };

  useEffect(() => {
    dispatch(fetchTodos(offset));
  }, []);

  useEffect(() => {
    dispatch(setErrorAction(""));
    dispatch(setCountAction(items.filter((item) => !item.completed).length));
  }, [items]);

  return (
    <Container>
      <Title>todos</Title>
      {errorMessage && (
        <ErrorMessage>
          {errorMessage}{" "}
          <CloseButton
            onClick={() => dispatch(setErrorAction(""))}
          ></CloseButton>
        </ErrorMessage>
      )}
      <Wrapper>
        <InputTask />
        <Pagination />
        {items.length && (
          <div>
            <TasksList />
          </div>
        )}
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
      </Wrapper>
    </Container>
  );
};

export default App;
