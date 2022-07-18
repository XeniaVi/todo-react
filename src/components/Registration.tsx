import { useState } from "react";
import { useAppSelector, useAppDispatch } from '../hooks'
import { ButtonForm, Container, Form, InputForm, Title, ErrorMessage, CloseButton } from "styles/components";
import { setError } from "slices/setStatusSlice";
import { signUp } from "asyncActions";
import { PostRegistration } from "types";
import { Navigate } from "react-router-dom";

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const isRegistration: boolean = useAppSelector((state) => state.auth.isRegistration);
  const errorMessage: string = useAppSelector((state) => state.status.errorMessage);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    const user: PostRegistration = { username, password };
    dispatch(signUp(user))
    setUsername('')
    setPassword('')
  }

  return (
    <Container>
      <Title>Registration</Title>
      {errorMessage && (
        <ErrorMessage>
          {errorMessage}{" "}
          <CloseButton
            onClick={() => dispatch(setError(""))}
          ></CloseButton>
        </ErrorMessage>
      )}
      <Form onSubmit={handleSubmit}>
        <InputForm type="text" name="username" placeholder="username" onChange={handleChangeUsername} value={username} />
        <InputForm type="password" name="password" placeholder="password" onChange={handleChangePassword} value={password} />
        <ButtonForm type="submit">Sign up</ButtonForm>
      </Form>
      {!isRegistration && (<Navigate to="/login" />)}
    </Container>
  );
};

export default Registration;