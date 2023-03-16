const { Card } = ReactBootstrap;
function Deposit(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [amount, setAmount] = React.useState('');
  return (
    <Card bg="success" border="danger" style={{ width: "30rem" }}>
      <Card.Header>DEPOSIT</Card.Header>
      <Card.Img variant="top" src="resources/deposit.svg" style={{ height: "10rem" }}/>
      <Card.Body>      
       { 
         show ? (
          <>
          <DepositForm user={props.user} setShow={setShow} setStatus={setStatus} setAmount={setAmount}/> :
         </>
         ) : (
          <> <DepositMsg setShow={setShow} setStatus={setStatus}/>
          </> 
         )
      }
      </Card.Body>
    </Card>
  )


function DepositMsg(props){
  return (<>
    <h4 style={{ color: "white" }}>Success!</h4>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 
function checkAmount(amount) {
  if(amount==''){
    alert("Error: Please enter the amount you would like to withdraw!"); //admin
    return false;
  }
  if (amount < 0) {
    alert("Error: Deposit amount can not be a negative value!"); //admin
    return false;
  }
  if (isNaN(amount)) {
    alert("Error: Deposit amount should be a number!"); //admin
    return false;
  }
  return true;
}
function DepositForm(props){
  const [amount, setAmount] = React.useState('');

  function handle(){
    if (!checkAmount(Number(amount))) return; //validate the amount
    fetch(`/account/update/${props.user.email}/${Number(amount)}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.amount));
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });
  }
  return(<>
<br/>
    <h4 style={{ color: "white" }}>User: {props.user.email}</h4>
    Amount
    <br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}
}