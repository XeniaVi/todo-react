import { useState } from "react";
import { useAppSelector, useAppDispatch } from '../hooks';
import { setRegistrationError } from "slices/authSlice";
import { ButtonForm, Container, Form, InputForm, Message, Title, LabelMessage } from "styles/components";
import { minLengthPassword, maxLengthPassword } from "../constants";

const Login: React.FC = () => {
    const dispatch = useAppDispatch();

    const message: string = useAppSelector((state) => state.auth.message);
    const registrationError: string = useAppSelector((state) => state.auth.registrationError);
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

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        if (!username) {
            dispatch(setRegistrationError('Username must not be empty'));
        } else if (
            password.length < minLengthPassword ||
            password.length > maxLengthPassword
        ) {
            dispatch(setRegistrationError(`Password's length must be more than ${minLengthPassword} and less than ${maxLengthPassword}`));
        } else {
            console.log('login')
        }
    }

    return (
        <Container>
            <Title>Login</Title>
            {message && <Message>{message}</Message>}
            <Form onSubmit={handleSubmit}>
                <div>
                    {registrationError && (<LabelMessage>Incorrect value!</LabelMessage>)}
                    <InputForm type="text" name="username" placeholder="username" onChange={handleChangeUsername} value={username} $mode={registrationError ? "error" : ""} />
                </div>
                <div>
                    {registrationError && (<LabelMessage>Incorrect value!</LabelMessage>)}
                    <InputForm type="password" name="password" placeholder="password" onChange={handleChangePassword} value={password} $mode={registrationError ? "error" : ""} />
                </div>
                <ButtonForm type="submit">Sign in</ButtonForm>
            </Form>
        </Container>
    );
};

export default Login;
