import { useState } from "react";
import { useAppSelector, useAppDispatch } from '../hooks'
import { ButtonForm, Container, Form, InputForm, Title, ErrorMessage, CloseButton, LabelMessage } from "styles/components";
import { setError } from "slices/setStatusSlice";
import { setRegistrationError } from "slices/authSlice";
import { signUp } from "asyncActions";
import { PostRegistration } from "types";
import { Navigate } from "react-router-dom";
import { minLengthPassword, maxLengthPassword } from "../constants";

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const isRegistration: boolean = useAppSelector((state) => state.auth.isRegistration);
  const registrationError: string = useAppSelector((state) => state.auth.registrationError);
  const errorMessage: string = useAppSelector((state) => state.status.errorMessage);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const resetErrors = () => {
    dispatch(setRegistrationError(""));
    dispatch(setError(""));
  }

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    resetErrors();
    e.preventDefault()
    if (!username) {
      dispatch(setRegistrationError('Username must not be empty'));
    } else if (
      password.length < minLengthPassword ||
      password.length > maxLengthPassword
    ) {
      dispatch(setRegistrationError(`Password's length must be more than ${minLengthPassword} and less than ${maxLengthPassword}`));
    } else {
      const user: PostRegistration = { username, password };
      dispatch(signUp(user))
      setUsername('')
      setPassword('')
    }
  }

  return (
    <Container>
      <Title>Registration</Title>
      {(errorMessage || registrationError) && (
        <ErrorMessage>
          {errorMessage}
          {registrationError}
          <CloseButton
            onClick={resetErrors}
          ></CloseButton>
        </ErrorMessage>
      )}
      <Form onSubmit={handleSubmit}>
        <div>
          {registrationError && (<LabelMessage>Incorrect value!</LabelMessage>)}
          <InputForm type="text" name="username" placeholder="username" onChange={handleChangeUsername} value={username} $mode={registrationError ? "error" : ""} />
        </div>
        <div>
          {registrationError && (<LabelMessage>Incorrect value!</LabelMessage>)}
          <InputForm type="password" name="password" placeholder="password" onChange={handleChangePassword} value={password} $mode={registrationError ? "error" : ""} />
        </div>
        <ButtonForm type="submit">Sign up</ButtonForm>
      </Form>
      {!isRegistration && (<Navigate to="/login" />)}
    </Container>
  );
};

export default Registration;