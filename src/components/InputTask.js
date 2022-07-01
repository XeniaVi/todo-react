import {
  InputWrapper,
  Input,
  Button,
  CheckboxAbsolute,
  Label,
  ErrorMessage,
} from "../styles/components";

function InputTask({
  addTask,
  handleChange,
  handleKeyDown,
  value,
  isShowCheckbox,
  toggleAllStatus,
  completedAll,
  handleChangeInputCheckbox,
  message,
}) {
  return (
    <div>
      <InputWrapper>
        {isShowCheckbox ? (
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
        <Button onClick={addTask}>Add</Button>
      </InputWrapper>
      {message ? <ErrorMessage>{message}</ErrorMessage> : ""}
    </div>
  );
}

export default InputTask;
