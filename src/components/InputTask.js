import {
  InputWrapper,
  Input,
  Button,
  CheckboxAbsolute,
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
}) {
  return (
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
  );
}

export default InputTask;
