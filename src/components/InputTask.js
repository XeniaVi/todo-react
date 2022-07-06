import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../asyncActions/addTodo";

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

  return (
    <InputWrapper>
      {items.length ? (
        <CheckboxAbsolute>
          <input
            type="checkbox"
            // onClick={toggleAllStatus}
            // onChange={handleChangeInputCheckbox}
            // checked={completedAll}
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
