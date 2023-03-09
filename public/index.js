function Spa() {
  const [user, setUser] = React.useState({});
 
  return (
    <HashRouter>
      <div>
        <NavBar setUser={setUser} user={user}/>  
        
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />

            <Route path="/login/" >
              <Login setUser={setUser}/>
            </Route>

            <Route path="/deposit/" >
              <Deposit user={user}/>
            </Route>
            <Route path="/withdraw/" >
              <Withdraw user={user}/>
            </Route>
  
            <Route path="/balance/" component={Balance} />
  
            <Route path="/alldata/" >
              <AllData user={user}/>
            </Route>
          </div>
     
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
