import { Container, Nav, NavItem, NavList, Title, NavLink, TitleSmall, Wrapper, Columns } from "styles/components";

const Main: React.FC = () => {
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
    </Container>
  );
};

export default Main;
