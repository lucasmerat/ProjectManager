import React, { Component } from "react";
import Recordings from "../Recordings";
import { ReactMic } from "react-mic";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import {
  saveRecording,
  deleteRecording,
} from "../../../store/actions/songActions";
import "./Recorder.css";

const blobToDataURL = (blob, props, callback) => {
  let a = new FileReader();
  a.onload = function (e) {
    callback(e.target.result, props);
  };
  a.readAsDataURL(blob);
}
class AudioRecorder extends Component {
  state = {
    isRecording: false,
  };

  startRecording = () => {
    this.setState({
      isRecording: true,
    });
  };

  stopRecording = () => {
    this.setState({
      isRecording: false,
    });
  };

  onStop = (recording) => {
    debugger;
    blobToDataURL(recording.blob, this.props, function (dataurl, props) {
      props.saveRecording(props.id, dataurl, props.singleSong.title);
      notify.show("Recording saved!");
    });
  };

  handleDeleteRecording = (recordingId) => {
    this.props.deleteRecording(recordingId, this.props.id);
  };

  render() {
    return (
      <div className="card recorder-card">
        <div className="recorder-card-content card-content">
          <span className="card-title">Recorder</span>
          <ReactMic
            record={this.state.isRecording}
            className="sound-wave"
            onStop={this.onStop}
            onData={this.onData}
            strokeColor="#000000"
            backgroundColor="#FF4081"
          />
          <div className="record-buttons">
            {this.state.isRecording ? (
              <button
                onClick={this.stopRecording}
                type="button"
                className="btn-floating waves-effect waves-light pink lighten-1"
              >
                <i className="fas fa-square" />
              </button>
            ) : (
              <button
                onClick={this.startRecording}
                type="button"
                className="record-button btn-floating btn-medium waves-effect waves-light pink lighten-1"
              >
                <i className="fas fa-microphone" />
              </button>
            )}
          </div>
          <div id="recordings">
            {this.props.recordings.length ? (
              <Recordings
                handleDeleteRecording={(recordingId) => {
                  this.handleDeleteRecording(recordingId);
                }}
                recordings={this.props.recordings}
              />
            ) : (
              <div>No recordings yet...</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.singleSong.recordings) {
    let arr = Object.entries(state.singleSong.recordings);
    return {
      recordings: arr,
      singleSong: state.singleSong,
    };
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveRecording: (id, recording, projectTitle) =>
      dispatch(saveRecording(id, recording, projectTitle)),
    deleteRecording: (recordingId, projectId) =>
      dispatch(deleteRecording(recordingId, projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioRecorder);
