const { Card } = ReactBootstrap;
function Login(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card bg="info" border="info" style={{ width: "20rem", margin: "auto" }}>
      <Card.Img variant="top" src="resources/bicon.svg" />
      <Card.Header>Account Login </Card.Header>
      <Card.Body>
        {show ? (
          <LoginForm
            setUser={props.setUser}
            setShow={setShow}
            setStatus={setStatus}
          />
        ) : (
          <LoginMsg
            setUser={props.setUser}
            setShow={setShow}
            setStatus={setStatus}
          />
        )}
      </Card.Body>
    </Card>
  );

  function LoginMsg(props) {
    return (
      <>
        <h4 style={{ color: "white" }}>You are logged in!</h4>
      </>
    );
  }
  function validate(email, password) {
    console.log("validate " + email + " " + password);
    if (email == "" || password == "") {
      alert("Error: Please enter the login credentials!"); //admin
      return false;
    }
    if (!email.includes("@")) {
      alert("Error: Please enter a valid email address!"); //admin
      return false;
    }
    return true;
  }
  function LoginForm(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleEmailSignIn() {
      if (!validate(email, password)) return; //validate the email and password
      const auth = firebase.auth();
      const promise = auth.signInWithEmailAndPassword(email, password);
      firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          console.log(firebaseUser);
          fetch(`/account/login/${email}/${password}`)
            .then((response) => response.text())
            .then((text) => {
              try {
                const data = JSON.parse(text);
                props.setStatus("");
                props.setShow(false);
                props.setUser(data);
                console.log("JSON:", data);
              } catch (err) {
                props.setStatus(text);
                console.log("err:", text);
                alert(text);
              }
            });
          //success
        } else {
          //error codes
        }
      });
      promise.catch((e) => console.log(e.message));
    }

    function handleGoogleSignIn() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          console.log(result);
          const gmail = encodeURI(result.additionalUserInfo.profile.name);
          console.log(gmail);
          fetch(`/account/login/${gmail}/${gmail}`)
            .then((response) => response.text())
            .then(async (text) => {
              try {
                const data = JSON.parse(text);
                props.setStatus("");
                props.setShow(false);
                props.setUser(data);
                console.log("JSON:", data);
              } catch (err) {
                console.log(err);
                props.setStatus(text);
                console.log("err:", text);

                const url = `/account/create/${gmail}/${gmail}/${gmail}`;
                await fetch(url);
                const res = await fetch(`/account/login/${gmail}/${gmail}`);
                const text = await res.text();
                const data = JSON.parse(text);
                props.setStatus("");
                props.setShow(false);
                props.setUser(data);
              }
            });
        })
        .catch(function (error) {
          console.log(error.code);
          console.log(error.message);
        });
    }
    return (
      <>
        Email
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
        <div>
          <button
            type="submit"
            className="btn btn-light float-right"
            onClick={handleEmailSignIn}
          >
            Login
          </button>
          {/* <button
            type="submit"
            className="btn btn-light float-right"
            onClick={handleGoogleSignIn}
          >
            Google Login
          </button> */}
        </div>
      </>
    );
  }
}
