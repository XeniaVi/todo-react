import { useState } from "react";
import { useAppSelector, useAppDispatch } from '../hooks'
import { setCompletedAllAction } from "../actions";
import { addTodo, updateTodos } from "../asyncActions";

import {
  InputWrapper,
  Input,
  Button,
  CheckboxAbsolute,
} from "../styles/components";
import { ITodosState, IStatusState, IRootState, ITodoGet, HTMLElementEvent } from "types";

function InputTask():JSX.Element {
  const [value, setValue] = useState("");

  const dispatch = useAppDispatch();

  const items: ITodoGet[] = useAppSelector((state) => state.todos.todos);
  const completedAll: boolean = useAppSelector((state) => state.status.completedAll);

  const toggleAllStatus = async () => {
    if (completedAll) {
      const ids = items.map((item) => item.id);
      dispatch(updateTodos(ids, false));
    } else {
      const ids = items
        .filter((item) => !item.completed)
        .map((item) => item.id);
      dispatch(updateTodos(ids, true));
    }
  };

  const dispatchAddTodo = () => {
    if (!value) return;
    dispatch(addTodo(value));
    setValue("");
  };

  const handleChange = (e: HTMLElementEvent<HTMLButtonElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { code } = e
    if (code === "Enter") {
      dispatchAddTodo();
    }
  };

  const handleChangeInputCheckbox = () => {
    dispatch(setCompletedAllAction(completedAll));
  };

  return (
    <InputWrapper>
      {items.length && (
        <CheckboxAbsolute>
          <input
            type="checkbox"
            onClick={toggleAllStatus}
            onChange={handleChangeInputCheckbox}
            checked={completedAll}
          />
        </CheckboxAbsolute>
      )}
      <Input
        type="text"
        placeholder="Add task"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
      />
      <Button onClick={dispatchAddTodo}>Add</Button>
    </InputWrapper>
  );
}

export default InputTask;
