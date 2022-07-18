import { useAppSelector, useAppDispatch } from '../hooks';
import { Container, Nav, NavItem, NavList, Title, NavLink, TitleSmall, Wrapper, Columns } from "styles/components";
import { Navigate } from "react-router-dom";
import { setError } from 'slices/setStatusSlice';
import { setMessage } from 'slices/authSlice';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();

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
                  <NavLink to='/login' onClick={() => dispatch(setMessage(''))}>Sign in</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to='/registration' onClick={() => dispatch(setError(''))}>Sign up</NavLink>
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
