const { OverlayTrigger, Tooltip, Navbar, Container, Nav } = ReactBootstrap;

function NavBar(props) {
  const navigate = ReactRouterDOM.useHistory();
  const logOut = () => {
    props.setUser({});
    navigate.push(`/`);
  };

  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }

  function isAdmin() {
    return props.user.email == "jesca@mit.edu";
  }
  props.user;
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">JBanking</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <OverlayTrigger
                placement={"bottom"}
                key="home"
                overlay={<Tooltip>Go to home screen</Tooltip>}
              >
                <Nav.Link href="#/">Home</Nav.Link>
              </OverlayTrigger>
              {isEmptyObject(props.user) ? (
                <OverlayTrigger
                  placement={"bottom"}
                  key="Login"
                  overlay={<Tooltip>Login to your account</Tooltip>}
                >
                  <Nav.Link href="#/login/">Login</Nav.Link>
                </OverlayTrigger>
              ) : null}
              {isAdmin() ? (
                <OverlayTrigger
                  placement={"bottom"}
                  key="Create"
                  overlay={<Tooltip>Create a new account</Tooltip>}
                >
                  <Nav.Link href="#/CreateAccount/">Create Account</Nav.Link>
                </OverlayTrigger>
              ) : null}
              {!isAdmin() && !isEmptyObject(props.user) ? (
                <OverlayTrigger
                  placement={"bottom"}
                  key="deposit"
                  overlay={<Tooltip>deposit money</Tooltip>}
                >
                  <Nav.Link href="#/deposit/">Deposit</Nav.Link>
                </OverlayTrigger>
              ) : null}
              {!isAdmin() && !isEmptyObject(props.user) ? (
                <OverlayTrigger
                  placement={"bottom"}
                  key="Withdraw"
                  overlay={<Tooltip>Withdraw money</Tooltip>}
                >
                  <Nav.Link href="#/withdraw/">Withdraw</Nav.Link>
                </OverlayTrigger>
              ) : null}
              {!isEmptyObject(props.user) ? (
                <OverlayTrigger
                  placement={"bottom"}
                  key="alldata"
                  overlay={<Tooltip>view transactions</Tooltip>}
                >
                  <Nav.Link href="#/alldata/">All Data</Nav.Link>
                </OverlayTrigger>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
        {!isEmptyObject(props.user) ? (
          <Nav>
            <button
              type="submit"
              id="logout"
              className="btn btn-light float-right"
              onClick={logOut}
            >
              Logout 
              <b>({props.user && props.user.email}) </b>
            </button>
          </Nav>
        ) : null}
      </Navbar>
    </>
  );
}
