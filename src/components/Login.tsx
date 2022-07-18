import { ButtonForm, Container, Form, InputForm, Message, Title } from "styles/components";
import { useAppSelector, useAppDispatch } from '../hooks'

const Login: React.FC = () => {
    const dispatch = useAppDispatch();

    const message: string = useAppSelector((state) => state.auth.message);

    return (
        <Container>
            <Title>Login</Title>
            {message && <Message>{message}</Message>}
            <Form>
                <InputForm type="text" placeholder="username" />
                <InputForm type="password" placeholder="password" />
                <ButtonForm type="submit">Sign in</ButtonForm>
            </Form>
        </Container>
    );
};

export default Login;
