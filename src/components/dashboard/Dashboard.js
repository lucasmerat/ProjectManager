import React, { Component } from "react";
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { loadProjects } from "../../store/actions/projectActions";

class Dashboard extends Component {
  componentDidMount() {
    console.log("loading projects");
    this.props.loadProjects();
  }
  render() {
    const { projects, auth, notifications } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else {
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m6">
              <ProjectList projects={projects} />
            </div>
            <div className="col s12 m5 offset-m1">
              <Notifications notifications={notifications} />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    projects: state.project,
    auth: state.firebase.auth,
    notifications:state.firestore.ordered.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadProjects: () => dispatch(loadProjects())
  };
};

export default compose(
  firestoreConnect([
    { collection: "projects" },
    { collection: "notifications", limit:10, orderBy: ['time', 'desc'] }
  ]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Dashboard);

//The way we are going to work with external data being asynchronous, is once there is a dispatched action, we pull data, and then poush the data to the recucer once we have that data
//To do this we need redux middleware between the two - it will allow us to run async tasks inside action creators
//REdux thunk allows us to return a function rather than the action, this function will halt the dispatch, then get data, then resume the dispatched
