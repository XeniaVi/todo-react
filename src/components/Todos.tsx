import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { resetStatus, setError, setFilter } from "slices/setStatusSlice";
import { setSignOut } from "slices/authSlice";
import { actionGetTodos, actionDeleteTodos } from "../asyncActions";
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
  ButtonSignOut,
} from "../styles/components";
import { ITodoGet } from "types/interfaces";
import { Navigate } from "react-router-dom";
import { resetTodos } from "slices/todosSlice";

const Todos: React.FC = () => {
  const dispatch = useAppDispatch();

  const items: ITodoGet[] = useAppSelector((state) => state.todos.todos);
  const offset: number = useAppSelector((state) => state.status.offset);
  const completed: boolean | undefined = useAppSelector(
    (state) => state.status.completed
  );
  const count: number = useAppSelector(
    (state) => state.todos.notCompletedCount
  );
  const errorMessage: string = useAppSelector(
    (state) => state.status.errorMessage
  );
  const filter: string = useAppSelector((state) => state.status.filter);
  const ids: Array<string> = useAppSelector(
    (state) => state.todos.idsCompleted
  );
  const token: string | null = useAppSelector((state) => state.auth.token);
  const isLogin: boolean = useAppSelector((state) => state.auth.isLogin);

  const filterTasks = (e: React.MouseEvent<HTMLElement>) => {
    const { textContent } = e.target as HTMLElement;
    const value: string = textContent ? textContent.toLowerCase() : filter;

    switch (value) {
      case "completed":
        dispatch(
          setFilter({ filter: value, completedAll: true, completed: true })
        );
        dispatch(actionGetTodos({ offset, completed: true, token }));
        break;
      case "active":
        dispatch(
          setFilter({ filter: value, completedAll: false, completed: false })
        );
        dispatch(actionGetTodos({ offset, completed: false, token }));
        break;
      default:
        dispatch(setFilter({ filter: value, completedAll: false }));
        dispatch(actionGetTodos({ offset, token }));
    }
  };

  const deleteCompletedTasks = () => {
    dispatch(actionDeleteTodos({ ids, offset, token, completed }));
  };

  const signOut = () => {
    dispatch(setSignOut());
    dispatch(resetStatus());
    dispatch(resetTodos());
  };

  useEffect(() => {
    dispatch(actionGetTodos({ offset, token }));
  }, [token]);

  useEffect(() => {
    dispatch(setError(""));
  }, [items]);

  return (
    <Container>
      <Title>todos</Title>
      {errorMessage && (
        <ErrorMessage>
          {errorMessage} <CloseButton onClick={() => dispatch(setError(""))} />
        </ErrorMessage>
      )}
      <Wrapper>
        <InputTask />
        <Pagination />
        {items.length > 0 && (
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
          <ButtonSignOut onClick={signOut}>Sign out</ButtonSignOut>
        </Footer>
      </Wrapper>
      {!isLogin && <Navigate to="/" />}
    </Container>
  );
};

export default Todos;
