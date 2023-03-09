const { Card } = ReactBootstrap;
function AllData(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [transdata, setTransdata] = React.useState([]);
  React.useEffect(() => {
    // fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        console.log('props>>>', props)
        if(props.user.email != 'jesca@mit.edu'){
          data = data.filter(tx => tx.email == props.user.email);
        }
        setTransdata(data);
      });
  }, []);
  const TransList = (props) => {
    return (
      <>
        <table className="accounts">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
            </tr>
            {transdata.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.name}</td>
                <td>{transaction.email}</td>
                <td>{transaction.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };
  return (
    <Card bg="Info" border="info">
      <Card.Header>Account Balance</Card.Header>
      <Card.Img
        variant="top"
        src="resources/transact.svg"
        style={{ height: "10rem" }}
      />
      <Card.Body>
        {<TransList setShow={setShow} setStatus={setStatus} />}
        {<div id="createStatus">{status}</div>}
      </Card.Body>
    </Card>
  );
}
