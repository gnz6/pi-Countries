import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Landing from './components/Landing';
import Home from './components/Home';
import Detail from './components/Detail';
import Form from './components/Form';
import Return from './components/Return';

function App() {
  return (

    <Router>
    <div className="App">
      <Switch>
      <Route exact path={"/"} component={Landing}/> 
       <Route exact path={"/home/:id"} component= {Detail}/> 
      <Route path={"/home"} component={Home}/> 
      <Route path={"/createActivity"} component={Form}/>
       <Route path={"*"} component={Return}/>
 
      </Switch>

    </div>
    </Router>

  );
}

export default App;
