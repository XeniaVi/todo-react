import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompletedAllAction } from "../actions";
import { addTodo } from "../asyncActions/addTodo";
import { updateTodos } from "../asyncActions/updateTodos";

import {
  InputWrapper,
  Input,
  Button,
  CheckboxAbsolute,
} from "../styles/components";

function InputTask() {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();
  const items = useSelector((state) => state.todos.todos);
  const completedAll = useSelector((state) => state.status.completedAll);

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

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      dispatchAddTodo();
    }
  };

  const handleChangeInputCheckbox = () => {
    dispatch(setCompletedAllAction(completedAll));
  };

  return (
    <InputWrapper>
      {items.length ? (
        <CheckboxAbsolute>
          <input
            type="checkbox"
            onClick={toggleAllStatus}
            onChange={handleChangeInputCheckbox}
            checked={completedAll}
          />
        </CheckboxAbsolute>
      ) : (
        ""
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
