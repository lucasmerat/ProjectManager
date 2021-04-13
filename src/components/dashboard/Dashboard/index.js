import React, { Component } from "react";
import Notifications from "../Notifications/";
import SongList from "../../songs/SongList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { loadSongs } from "../../../store/actions/songActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.loadSongs();
  }
  render() {
    const { songs, notifications } = this.props;
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m6">
              <SongList songs={songs} />
            </div>
            <div className="col s12 m5 offset-m1">
              <Notifications notifications={notifications} />
            </div>
          </div>
        </div>
      );
    }
  }

const mapStateToProps = (state, ownProps) => {
  return {
    songs: state.songs,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSongs: () => dispatch(loadSongs())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    if (props.auth.uid) {
      return [
        {
          collection: "notifications",
          where: ["createdBy", "==", props.auth.uid],
          limit: 10,
          orderBy: ["time", "desc"]
        }
      ];
    } else {
      return <Redirect to="/signin" />;
    }
  })
)(Dashboard);

//The way we are going to work with external data being asynchronous, is once there is a dispatched action, we pull data, and then poush the data to the recucer once we have that data
//To do this we need redux middleware between the two - it will allow us to run async tasks inside action creators
//REdux thunk allows us to return a function rather than the action, this function will halt the dispatch, then get data, then resume the dispatched
