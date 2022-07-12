import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../hooks'
import {
  setCompleted,
  setPage,
  setOffset,
  setCompletedAll,
  setCount,
  setError,
  setFilter,
} from "slices/setStatusSlice";
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
import { ITodoGet } from "types";

const App: React.FC = () => {
  const dispatch   = useAppDispatch();

  const items: ITodoGet[] = useAppSelector((state) => state.todos.todos);
  const offset: number = useAppSelector((state) => state.status.offset);
  const completed: boolean | null = useAppSelector((state) => state.status.completed);
  const count: number = useAppSelector((state) => state.status.count);
  const errorMessage: string = useAppSelector((state) => state.status.errorMessage);
  const filter: string = useAppSelector((state) => state.status.filter);

  const filterTasks = (e: React.MouseEvent<HTMLElement>) => {
    const { textContent } = e.target as HTMLElement;
    const value: string = textContent ? textContent.toLowerCase() : filter;

    switch (value) {
      case "completed":
        dispatch(setCompleted(true));
        dispatch(setFilter("completed"));
        dispatch(setCompletedAll(true));
        dispatch(fetchTodos({offset, completed: true}));
        break;
      case "active":
        dispatch(setFilter("active"));
        dispatch(setCompleted(false));
        dispatch(setCompletedAll(false));
        dispatch(fetchTodos({offset, completed: false}));
        break;
      default:
        dispatch(setFilter("all"));
        dispatch(setCompleted(null));
        dispatch(setCompletedAll(false));
        dispatch(fetchTodos({offset, completed: null}));
    }

    dispatch(setOffset(0));
    dispatch(setPage(1));
  };

  const deleteCompletedTasks = async () => {
    const ids = items.filter((item) => item.completed).map((item) => item.id);
    dispatch(deleteTodos({ids, offset, completed}));
  };

  useEffect(() => {
    dispatch(fetchTodos({offset}));
  }, []);

  useEffect(() => {
    dispatch(setError(""));
    dispatch(setCount(items.filter((item) => !item.completed).length));
  }, [items]);

  return (
    <Container>
      <Title>todos</Title>
      {errorMessage && (
        <ErrorMessage>
          {errorMessage}{" "}
          <CloseButton
            onClick={() => dispatch(setError(""))}
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
