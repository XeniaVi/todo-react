import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 100vh;
  background: #e3e2df;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  padding: 1rem;
  background: field;
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem 0.1rem #999;
`;

export const Title = styled.h1`
  color: #5d001e;
  font-weight: 700;
  text-align: center;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const Checkbox = styled.div`
  width: 1rem;
  height: 1rem;
  margin: 0;
  border: 1px solid #5d001e;
  border-radius: 50%;
  transition: all 1s ease-in-out;
  overflow: hidden;

  &:hover {
    border-color: #ee4c7c;
    transition: all 1s ease-in;
  }

  > input {
    margin: 0;
    position: relative;
    display: block;
    cursor: pointer;
    z-index: 0;

    &:before {
      content: "";
      position: absolute;
      width: 1rem;
      height: 1rem;
      top: 0;
      left: 0;
      font-size: 16px;
      background: field;
      border-radius: 50%;
      z-index: 50;
    }

    &:after {
      content: "✔";
      position: absolute;
      border-radius: 50%;
      width: 1rem;
      height: 1rem;
      top: -2px;
      left: 2px;
      font-size: 1rem;
      color: #5d001e;
      transition: all 0.5s ease-in;
      z-index: 100;

      &:hover {
        color: #ee4c7c;
        transition: all 0.5s ease-in;
      }
    }
  }

  > input:not(:checked) {
    &:after {
      opacity: 0;
      transform: scale(0);
    }
  }

  > input:checked {
    &:after {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: none;
  background: #e3e2df;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;

  &:focus-visible {
    outline: 1px solid #5d001e;
  }

  ${Checkbox}:checked + && {
    color: blue;
  }
`;

export const Button = styled.button`
  padding: 0.5rem;
  color: #e3e2df;
  text-transform: uppercase;
  font-weight: 700;
  background: #5d001e;
  cursor: pointer;
  border: none;
  transition: all 1s ease-in;

  &:hover {
    background: #ee4c7c;
    transition: all 1s ease-in;
  }

  &:focus-visible {
    outline: 1px solid #ee4c7c;
  }
`;

export const CheckboxList = styled(Checkbox)`
  border-radius: 0;
  min-width: 1rem;

  > input {
    &:before {
      border-radius: 0;
    }

    &:after {
      color: #ee4c7c;
      border-radius: 0;
      background: field;
    }
  }
`;

export const Tasks = styled.ul`
  padding: 1rem 0;
  list-style: none;
  background-color: field;
`;

export const TaskItem = styled.li`
  display: flex;
  width: 100%;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  border-bottom: 0.1px solid rgba(93, 0, 30, 0.1);
  box-sizing: border-box;
`;
export const TaskInner = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const ButtonDelete = styled(Button)`
  color: #5d001e;
  background: transparent;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  text-align: center;

  &:hover {
    color: field;
    background: #5d001e;
  }
`;
