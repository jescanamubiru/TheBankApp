const { Card, Button } = ReactBootstrap;
const box = {
  fontSize: "30px",
  textAlign: "center",
};
const shadow = {
  background: "#4fcc77",
  boxShadow: "1px 1px 1px 1px #cccd",
};
function Home() {
  return (
    <Card bg="info" border="info" style={{ width: "30rem", margin: "auto" }}>
      <Card.Header></Card.Header>
      <Card.Title style={{ ...box, ...shadow }}>Welcome to JBanking</Card.Title>
      <Card.Img variant="top" src="resources/bank2.png" />
      <Card.Body>
        <div class="d-flex">
          {/* <Button variant="primary" className="mr-auto">Login</Button>
          <Button variant="success">Create Account</Button> */}
        </div>
      </Card.Body>
    </Card>
  );
}
