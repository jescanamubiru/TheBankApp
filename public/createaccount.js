const { Card } = ReactBootstrap;
function CreateAccount() {
  const [show, setShow] = React.useState(true);

  function CreateMsg(props) {
    return (
      <>
        <h5>Success</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => props.setShow(true)}
        >
          Add another account
        </button>
      </>
    );
  }
  function validate(email, password, name) {
    console.log("validate " + email + " " + password);
    if (email == "" || password == "" || name == "") {
      alert("Error: Please enter all required account information!"); //admin
      return false;
    }
    if (!email.includes("@")) {
      alert("Error: Please enter a valid email address!"); //admin
      return false;
    }
    if (password.length < 6 || password.length > 12) {
      alert("Error: Password should not between 6 to 12 characters!"); //admin
      return false;
    }
  }
  function CreateForm(props) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handle() {
      console.log(name, email, password);

      const auth = firebase.auth();
      const promise = auth.createUserWithEmailAndPassword(email, password);
      promise.then(() => {
        const url = `/account/create/${name}/${email}/${password}`;
        (async () => {
          var res = await fetch(url);
          var data = await res.json();
          console.log(data);
        })();
      });
      promise.catch((e) => console.log(e.message));
      props.setShow(false);
    }
    return (
      <>
        Name
        <br />
        <input
          type="input"
          className="form-control"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <br />
        Email address
        <br />
        <input
          type="input"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <br />
        Password
        <br />
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <br />
        <button type="submit" className="btn btn-light" onClick={handle}>
          Create Account
        </button>
      </>
    );
  }
  return (
    <Card bg="info" border="info" style={{ width: "30rem", margin: "auto" }}>
      <Card.Header>CREATE ACCOUNT</Card.Header>
      <Card.Img
        variant="top"
        src="resources/createicon.svg"
        style={{ height: "10rem" }}
      />
      <Card.Body>
        {show ? (
          <CreateForm setShow={setShow} />
        ) : (
          <CreateMsg setShow={setShow} />
        )}
      </Card.Body>
    </Card>
  );
}
