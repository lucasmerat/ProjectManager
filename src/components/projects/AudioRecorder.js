// TO MAKE THIS CLEANER, ADD COMPONENT TO STORE RECORDINGS AND RENDER THAT CONDITIONALLY

import React, { Component } from "react";
import Recordings from "./Recordings"
import { ReactMic } from "react-mic";
import { connect } from "react-redux"; //connects the component to store
import { saveRecording } from "../../store/actions/projectActions";

class AudioRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false
    };
    this.onStop = this.onStop.bind(this);
  }

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

  onData(recordedBlob) {
    console.log("chunk of real-time data is: ", recordedBlob);
  }

  onStop(recordedBlob) {
    console.log("recordedBlob is: ", recordedBlob);

    function blobToDataURL(blob, props, callback) {
      var a = new FileReader();
      a.onload = function(e) {
        callback(e.target.result, props);
      };
      a.readAsDataURL(blob);
    }

    blobToDataURL(recordedBlob.blob, this.props, function(dataurl, props) {
      console.log(props)
      console.log(dataurl);
      props.saveRecording(props.id, dataurl);
    });
  }

  render() {
    if (this.props.recordings.length > 0) {
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
          <div id="recordings">
            <Recordings recordings={this.props.recordings}/>
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
  console.log(state)
  if (state.singleProject.recordings) {
    let arr = Object.entries(state.singleProject.recordings);
    return {
      recordings: arr
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    saveRecording: (id, recording) => dispatch(saveRecording(id, recording))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioRecorder);
