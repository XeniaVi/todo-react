import { ButtonForm, Container, Form, InputForm, Title } from "styles/components";

const Registration: React.FC = () => {
    return (
        <Container>
            <Title>Registration</Title>
                <Form>
                    <InputForm type="text" placeholder="username"/>
                    <InputForm  type="password" placeholder="password"/>
                    <ButtonForm type="submit">Sign up</ButtonForm>
                </Form>
        </Container>
    );
  };
  
  export default Registration;