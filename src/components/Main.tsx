import { useAppSelector } from '../hooks';
import { Container, Nav, NavItem, NavList, Title, NavLink, TitleSmall, Wrapper, Columns } from "styles/components";
import { Navigate } from "react-router-dom";

const Main: React.FC = () => {
  const token: string | null = useAppSelector((state) => state.auth.token);

  return (
    <Container>
      <Wrapper>
        <Columns>
          <Title>Welcome to todos!</Title>
          <div>
            <TitleSmall>Start to use our app</TitleSmall>
            <Nav>
              <NavList>
                <NavItem>
                  <NavLink to='/login'>Sign in</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to='/registration'>Sign up</NavLink>
                </NavItem>
              </NavList>
            </Nav>
          </div>
        </Columns>
      </Wrapper>
      {token && (<Navigate to="/todos" />)}
    </Container>
  );
};

export default Main;
