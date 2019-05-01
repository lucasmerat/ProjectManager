import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/auth/PrivateRoute/'
import NavBar from './components/layout/Navbar/'
import Dashboard from './components/dashboard/Dashboard/'
import ProjectDetails from './components/projects/ProjectDetails/';
import SignIn from './components/auth/SignIn/';
import SignUp from './components/auth/SignUp/';
import CreateProject from './components/projects/CreateProject/';
import Notifications from 'react-notify-toast';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Notifications />
          <NavBar />
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard}></PrivateRoute>
            <PrivateRoute path='/project/:id' component={ProjectDetails}></PrivateRoute>
            <Route path='/signin' component={SignIn}></Route>
            <Route path='/signup' component={SignUp}></Route>
            <PrivateRoute path='/createproject' component={CreateProject}></PrivateRoute>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;