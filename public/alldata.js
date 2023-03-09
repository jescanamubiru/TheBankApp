const { Card } = ReactBootstrap;
function AllData(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [transdata, setTransdata] = React.useState(null);
  let currlist = [];
  React.useEffect(() => {
    console.log("inside React.useEffect");
    // fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTransdata(JSON.stringify(data));
      });
  }, []);
  var allUsers = JSON.parse(transdata);
  var res = [];
  for (var i in obj) {
    console.log("obj[i]*****" + JSON.stringify(obj[i]));
    res.push(allUsers[i]);
  }
  console.log("res-->" + res);
  console.log("user-->" + JSON.stringify(props.user));

  if (props.user != null) {
    var obj = JSON.parse(transdata);
    let loggedinUser = {};
    var res = [];
    for (var i in obj) {
      console.log("obj[i]*****" + JSON.stringify(obj[i]));
      console.log("props.user.email*" + props.user.email);
      console.log("obj[i].email*" + obj[i].email);
      if (props.user.email == obj[i].email) {
        loggedinUser = obj[i];
      }

      res.push(obj[i]);
    }
    console.log("obj[i]: " + JSON.stringify(props.user));
    console.log("loggedinUser: " + JSON.stringify(loggedinUser));
    currlist = (
      <tr key={props.user._id}>
        <td>{props.user.name}</td>
        <td>{props.user.email}</td>
        <td>{loggedinUser.balance}</td>
      </tr>
    );

    if (loggedinUser.email == "admin@mit.edu") {
      currlist = allUsers.map((item, index) => {
        return (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.balance}</td>
          </tr>
        );
      });
    }
  }
  function TransList(props) {
    return (
      <>
        <table className="accounts">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
            </tr>
            {currlist}
          </tbody>
        </table>
      </>
    );
  }
  return (
    <Card bg="Info" border="info">
      <Card.Header>Account Balance</Card.Header>
      <Card.Img variant="top" src="resources/transact.svg" style={{ height: "10rem" }} />
      <Card.Body>
        {<TransList setShow={setShow} setStatus={setStatus} />}
        {<div id="createStatus">{status}</div>}
      </Card.Body>
    </Card>
  );
}
