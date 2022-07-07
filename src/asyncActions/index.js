import {
  getTodosAction,
  addTodoAction,
  setErrorAction,
  setCompletedAction,
  setCompletedAllAction,
  setFilterAction,
  setCountAction,
  updateTodoAction,
  updateTodosAction,
} from "../actions";
import {
  addTodo as appendTodo,
  updateCompleted,
  deleteTodo as removeTodo,
  deleteCompleted,
  getTodos,
  updateTodo as changeTodo,
} from "../api/todoApi";
import constants from "../constants";

const { TODOS_AT_PAGE } = constants;

export const fetchTodos = (offset, completed) => {
  return async (dispatch) => {
    try {
      const response = await getTodos(TODOS_AT_PAGE, offset, completed);
      dispatch(getTodosAction(response));

      const length = response.todos.filter((item) => item.completed).length;

      dispatch(setCompletedAllAction(response.todos.length === length));
      dispatch(
        setCountAction(response.todos.filter((item) => !item.completed).length)
      );
    } catch (e) {
      dispatch(setErrorAction("Something troubled... Let's update the page!"));
    }
  };
};

export const addTodo = (value) => {
  return async (dispatch) => {
    try {
      const response = await appendTodo({
        value: value,
        completed: false,
        createdAt: Date.now(),
      });

      dispatch(addTodoAction(response));
      dispatch(setCompletedAction(null));
      dispatch(setCompletedAllAction(false));
      dispatch(setFilterAction("all"));
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with adding... Let's try later!")
      );
    }
  };
};

export const deleteTodo = (id, offset, completed) => {
  return async (dispatch) => {
    try {
      await removeTodo(id);
      dispatch(fetchTodos(offset, completed));
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with removing... Let's try later!")
      );
    }
  };
};

export const deleteTodos = (ids, offset, completed) => {
  return async (dispatch) => {
    try {
      await deleteCompleted(ids);
      dispatch(fetchTodos(offset, completed));
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with removing... Let's try later!")
      );
    }
  };
};

export const updateTodo = (id, updatedTodo) => {
  return async (dispatch) => {
    try {
      await changeTodo(id, updatedTodo);

      dispatch(updateTodoAction({ id, updatedTodo }));
      dispatch(setCompletedAllAction(false));
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with updating... Let's try later!")
      );
    }
  };
};

export const updateTodos = (ids, completed) => {
  return async (dispatch) => {
    try {
      await updateCompleted(ids, completed);

      dispatch(updateTodosAction(completed));
      dispatch(setCompletedAllAction(completed));
    } catch (e) {
      dispatch(
        setErrorAction("Something troubled with updating... Let's try later!")
      );
    }
  };
};
