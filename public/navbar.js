const { OverlayTrigger, Tooltip, Navbar, Container, Nav } = ReactBootstrap;

const NavBar = (props) => {
  const navigate = ReactRouterDOM.useHistory();
  const logOut = () => {
    props.setUser(null);
    navigate.push(`/`);
  };

  const isAdmin = props.user &&  props.user.email == "jesca@mit.edu"

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
              {!props.user ? (
                <OverlayTrigger
                  placement={"bottom"}
                  key="Login"
                  overlay={<Tooltip>Login to your account</Tooltip>}
                >
                  <Nav.Link href="#/login/">Login</Nav.Link>
                </OverlayTrigger>
              ) : null}
              {isAdmin ? (
                <OverlayTrigger
                  placement={"bottom"}
                  key="Create"
                  overlay={<Tooltip>Create a new customer account</Tooltip>}
                >
                  <Nav.Link href="#/CreateAccount/">Create Customer Accounts</Nav.Link>
                </OverlayTrigger>
              ) : null}
              {!isAdmin && props.user ? (
                <OverlayTrigger
                  placement={"bottom"}
                  key="deposit"
                  overlay={<Tooltip>deposit money</Tooltip>}
                >
                  <Nav.Link href="#/deposit/">Deposit</Nav.Link>
                </OverlayTrigger>
              ) : null}
              {!isAdmin && props.user ? (
                <OverlayTrigger
                  placement={"bottom"}
                  key="Withdraw"
                  overlay={<Tooltip>Withdraw money</Tooltip>}
                >
                  <Nav.Link href="#/withdraw/">Withdraw</Nav.Link>
                </OverlayTrigger>
              ) : null}
              {props.user ? (
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
        {props.user ? (
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
