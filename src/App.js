import React from 'react';  
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login.js'
import Session from './components/Session/Session.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/"  component={Login}/>      
        <Route path="/Session" component={Session}/>      
        </Switch>
      </Router>

    </div>
  );
}

export default App;
