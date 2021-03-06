import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute/";
import NavBar from "./components/layout/Navbar/";
import Dashboard from "./components/dashboard/Dashboard/";
import SongDetails from "./components/projects/SongDetails";
import SignIn from "./components/auth/SignIn/";
import SignUp from "./components/auth/SignUp/";
import CreateSong from "./components/projects/CreateSong";
import Notifications from "react-notify-toast";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Notifications />
          <NavBar />
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
            <PrivateRoute
              path="/song/:id"
              component={SongDetails}
            ></PrivateRoute>
            <Route path="/signin" component={SignIn}></Route>
            <Route path="/signup" component={SignUp}></Route>
            <PrivateRoute
              path="/createsong"
              component={CreateSong}
            ></PrivateRoute>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
