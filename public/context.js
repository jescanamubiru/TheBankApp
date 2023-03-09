const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);

// const firebaseConfig = {
//   apiKey: "AIzaSyBOGjpA7GyHJvEuUIfmt2jZL-HRw4t4weA",
//   authDomain: "badbank-57d5c.firebaseapp.com",
//   projectId: "badbank-57d5c",
//   storageBucket: "badbank-57d5c.appspot.com",
//   messagingSenderId: "1071322129067",
//   appId: "1:1071322129067:web:4c8c833c28e3f4bee14dee"
// };

const firebaseConfig = {
  apiKey: "AIzaSyC51SEyTgHp-8YXRQJI2HcT0zFFQ3YcSys",
  authDomain: "mit-firebase-login-1.firebaseapp.com",
  databaseURL: "https://mit-firebase-login-1-default-rtdb.firebaseio.com",
  projectId: "mit-firebase-login-1",
  storageBucket: "mit-firebase-login-1.appspot.com",
  messagingSenderId: "256205517938",
  appId: "1:256205517938:web:8f8b85b2ecd6ae471e7eeb"
};

firebase.initializeApp(firebaseConfig);

function Card(props){
  function classes(){
    const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
    return 'card mb-3 ' + bg + txt;
  }

  return (
    <div className={classes()} style={{maxWidth: "18rem"}}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<p className="card-text">{props.text}</p>)}
        {props.body}
        {props.status && (<div id='createStatus'>{props.status}</div>)}
      </div>
    </div>      
  );    
}
