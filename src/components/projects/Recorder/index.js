import React, { Component } from "react";
import Recordings from "../Recordings";
import { ReactMic } from "react-mic";
import { connect } from "react-redux";
import { saveRecording, deleteRecording } from "../../../store/actions/projectActions";
import "./Recorder.css"

class AudioRecorder extends Component {
  state = {
    record: false
  };

  startRecording = () => {
    this.setState({
      record: true
    });
  };

  stopRecording = () => {
    this.setState({
      record: false
    });
  };

  onStop = recordedBlob => {
    console.log("recordedBlob is: ", recordedBlob);

    function blobToDataURL(blob, props, callback) {
      var a = new FileReader();
      a.onload = function(e) {
        callback(e.target.result, props);
      };
      a.readAsDataURL(blob);
    }

    blobToDataURL(recordedBlob.blob, this.props, function(dataurl, props) {
      props.saveRecording(props.id, dataurl, props.singleProject.title);
    });
  };
  handleDeleteRecording = (recordingId) =>{
    console.log(this.props.id, recordingId)
  }

  render() {
    if (this.props.recordings.length > 0) {
      return (
        <div className="card">
          <div className="card-content">
            <span className="card-title">Recorder</span>
            <ReactMic
              record={this.state.record}
              className="sound-wave"
              onStop={this.onStop}
              onData={this.onData}
              strokeColor="#000000"
              backgroundColor="#FF4081"
            />
            <button onClick={this.startRecording} type="button">
              Start
            </button>
            <button onClick={this.stopRecording} type="button">
              Stop
            </button>
            <div id="recordings">
              <Recordings handleDeleteRecording={recordingId=>{this.handleDeleteRecording(recordingId)}} recordings={this.props.recordings} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            onData={this.onData}
            strokeColor="#000000"
            backgroundColor="#FF4081"
          />
          <button onClick={this.startRecording} type="button">
            Start
          </button>
          <button onClick={this.stopRecording} type="button">
            Stop
          </button>
          <div id="recordings">No recordings yet...</div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  if (state.singleProject.recordings) {
    let arr = Object.entries(state.singleProject.recordings);
    return {
      recordings: arr,
      singleProject: state.singleProject
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    saveRecording: (id, recording, projectTitle) =>
      dispatch(saveRecording(id, recording, projectTitle)), 
    deleteRecording: (recordingId, projectId) => dispatch(deleteRecording(recordingId, projectId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioRecorder);
