import React, { Component } from "react";
import { connect } from "react-redux"; //connects the component to store
import moment from "moment";
import LyricsBox from "../LyricsBox";
import Recorder from "../Recorder";
import ChordList from "../ChordList";
import ChordForm from "../ChordForm";
import Todos from "../Todos";
import DeleteProject from "../DeleteProject";
import { loadSong } from "../../../store/actions/songActions";
import "./SongDetails.css";
import LoadingMask from "../../layout/LoadingMask";

class SongDetails extends Component {
  componentDidMount() {
    this.props.loadSong(this.props.match.params.id);
  }
  render() {
    const { singleSong, match, history } = this.props;
    if (match.params.id === singleSong.id) {
      // Waits until correct project has been loaded to display page
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="project-title card-title">
                {singleSong.title}
              </span>
              <div className="row">
                <div className="lyrics-section col s6">
                  <LyricsBox id={match.params.id} />
                </div>
                <div className="recorder-section col s6">
                  <Recorder id={match.params.id} />
                </div>
              </div>
              <div className="row">
                <div className="col s6 chords-section">
                  <ChordForm id={match.params.id} />
                  <ChordList />
                </div>
                <div className="col s6 todo-section">
                  <Todos id={match.params.id} />
                </div>
              </div>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div className="author">
                Written by {singleSong.authorFirstName}{" "}
                {singleSong.authorLastName}
              </div>
              <div className="date">
                Last updated{" "}
                {moment(singleSong.updatedAt.toDate()).calendar()}
              </div>
              <DeleteProject history={history} id={match.params.id} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-6 h-screen m-auto w-4/5 pt-12 bg-white">
          <div className="flex mb-12 mx-4">
            <LoadingMask className="mr-4" />
            <LoadingMask />
          </div>
          <div className="flex mb-12 mx-4">
            <LoadingMask className="mr-4" />
            <LoadingMask />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    singleSong: state.singleSong,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSong: id => dispatch(loadSong(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongDetails);
