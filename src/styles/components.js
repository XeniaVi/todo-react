import styled, { css } from "styled-components";
import { check, down, cross } from "../assets/icons";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-height: calc(100vh - 2rem);
  padding: 2rem;
  background: #e3e2df;

  @media (max-width: 425px) {
    min-height: calc(100vh - 1rem);
    padding: 0.5rem;
  }
`;

export const Wrapper = styled.div`
  width: calc(100% - 2rem);
  max-width: 40rem;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  background: field;
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem 0.1rem #999;
`;

export const Title = styled.h1`
  color: #5d001e;
  font-weight: 700;
  text-align: center;
`;

export const Checkbox = styled.div`
  width: 1rem;
  height: 1rem;
  margin: 0;
  transition: all 1s ease-in-out;
  overflow: hidden;

  &:hover {
    border-color: #ee4c7c;
    transition: all 1s ease-in;
  }

  > input {
    position: relative;
    display: block;
    margin: 0;
    cursor: pointer;
    z-index: 0;

    &:before {
      position: absolute;
      content: "";
      width: 1rem;
      height: 1rem;
      top: 0;
      left: 0;
      font-size: 1rem;
      text-align: center;
      color: field;
      background-color: #e3e2df;
      background-image: url(${down});
      background-repeat: no-repeat;
      background-size: 0.7rem 0.7rem;
      background-position: center;
      z-index: 50;
    }

    &:after {
      position: absolute;
      content: "";
      width: 1rem;
      height: 1rem;
      top: 0;
      left: 0;
      font-size: 1rem;
      text-align: center;
      color: #5d001e;
      background-image: url(${check});
      background-repeat: no-repeat;
      background-size: 0.7rem 0.7rem;
      background-position: center;
      transition: all 0.5s ease-in;
      z-index: 100;

      &:hover {
        background-color: #ee4c7c;
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
    &:before {
      background-image: none;
    }

    &:after {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const CheckboxAbsolute = styled(Checkbox)`
  position: absolute;
  left: 2px;
  top: calc(50% - 0.5rem);

  @media (max-width: 425px) {
    transform: translate(2px, 50%);
  }
`;

export const CheckboxList = styled(CheckboxAbsolute)`
  min-width: 1rem;
  position: relative;

  > input {
    &:before {
      background-image: none;
    }

    &:after {
      background: field;
      background-image: url(${check});
      background-repeat: no-repeat;
      background-size: 0.7rem 0.7rem;
      background-position: center;
    }
  }

  @media (max-width: 425px) {
    transform: translate(0);
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.5rem 2rem;
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

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 425px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Tasks = styled.ul`
  padding-left: 0;
  list-style: none;
  background-color: field;
`;

export const TaskItem = styled.li`
  display: flex;
  width: 100%;
  padding: 1rem 0;
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

export const TaskText = styled.div`
  ${(props) => {
    switch (props.$mode) {
      case "done":
        return css`
          flex: 1;
          color: #5d001e;
          text-decoration: line-through;
        `;
      default:
        return css`
          flex: 1;
        `;
    }
  }}
`;

export const EditInput = styled(TaskInner)``;

export const Button = styled.button`
  padding: 0.5rem;
  color: #e3e2df;
  text-transform: uppercase;
  font-weight: 700;
  background-color: #5d001e;
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

export const ButtonDelete = styled(Button)`
  width: 2rem;
  height: 2rem;
  text-align: center;
  background-color: transparent;
  background-image: url(${cross});
  background-repeat: no-repeat;
  background-size: 0.7rem 0.7rem;
  background-position: center;
  border-radius: 50%;

  &:hover {
    background-color: #ee4c7c;
    background-image: url(${cross});
    background-repeat: no-repeat;
    background-size: 0.7rem 0.7rem;
    background-position: center;
  }
`;

export const ButtonSave = styled(Button)`
  color: #5d001e;
  background: transparent;
  text-align: center;

  &:hover {
    color: #5d001e;
    background: #e3e2df;
  }
`;

export const ButtonCancel = styled(ButtonSave)``;

export const ButtonFooter = styled(Button)`
  ${(props) => {
    switch (props.$mode) {
      case "select":
        return css`
          color: white;
          background-color: #5d001e;
        `;
      default:
        return css`
          color: black;
          background-color: white;
          border: 1px solid #5d001e;
        `;
    }
  }}
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 425px) {
    flex-direction: column;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const ErrorMessage = styled.div`
  position: relative;
  padding: 0.5rem 2rem;
  font-size: 0.7rem;
  color: #5d001e;
  background-color: rgba(93, 0, 30, 0.1);
`;

export const CloseButton = styled(ButtonDelete)`
  position: absolute;
  width: 1.5rem;
  height: 100%;
  top: 0;
  right: 0;
  background-size: 0.5rem 0.5rem;
  border-radius: 0;

  &:hover {
    background-color: rgba(93, 0, 30, 0.5);
    background-size: 0.5rem 0.5rem;
  }
`;

export const Pagination = styled.div`
  padding: 1rem 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const ButtonPagination = styled(Button)`
  color: black;
  background-color: white;
  border: 1px solid #5d001e;
`;
