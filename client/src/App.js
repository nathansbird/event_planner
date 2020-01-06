import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/'><Home/></Route>
        <Route path='/login'><Login/></Route>
        <Route path='/register'><Register/></Route>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
      </Switch>
    </div>
  );
}

export default App;
