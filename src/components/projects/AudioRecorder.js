import React, { Component } from 'react'
import { ReactMic } from 'react-mic';
import { connect } from 'react-redux' //connects the component to store
import { saveRecording } from '../../store/actions/projectActions'


class AudioRecorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
          record: false
        }
        this.onStop = this.onStop.bind(this);
      }

      startRecording = () => {
        this.setState({
          record: true
        });
      }
     
      stopRecording = () => {
        this.setState({
          record: false
        });
      }
     
      onData (recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
      }
     
      onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
        this.props.saveRecording(this.props.id, recordedBlob.blobURL)
    }

  render() {
    return (
      <div>
      <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#FF4081" />
        <button onClick={this.startRecording} type="button">Start</button>
        <button onClick={this.stopRecording} type="button">Stop</button>
        <div id="recordings">
            <ul>
                <a href={this.props.recordings[0][1]}><li>Recording 1</li></a>
                <li>Recording 2</li>
                <li>Recording 3</li>
            </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
    let arr = Object.entries(state.singleProject.recordings)
    return{
        recordings: arr
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        saveRecording: (id, recording) => dispatch(saveRecording(id, recording))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioRecorder)
