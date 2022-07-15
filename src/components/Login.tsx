import { ButtonForm, Container, Form, InputForm, Title } from "styles/components";

const Login: React.FC = () => {
    return (
        <Container>
            <Title>Login</Title>
                <Form>
                    <InputForm type="text" placeholder="username"/>
                    <InputForm  type="password" placeholder="password"/>
                    <ButtonForm type="submit">Sign in</ButtonForm>
                </Form>
        </Container>
    );
};

export default Login;
