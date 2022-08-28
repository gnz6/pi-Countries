import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Landing from './components/Landing';
import Home from './components/Home';

function App() {
  return (

    <Router>
    <div className="App">
      <Switch>
      <Route exact path={"/"} component={Landing}/> 
      {/* <Route exact path={"/home/:id"} component= {Detail}/> */}
      <Route path={"/home"} component={Home}/> 
      {/* <Route path={"/createGame"} component={Form}/>
      <Route path={"*"} component={Return}/>
 */}
      </Switch>

    </div>
    </Router>

  );
}

export default App;
