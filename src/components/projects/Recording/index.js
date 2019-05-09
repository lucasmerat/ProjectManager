import React from 'react';
import moment from "moment";
import "./Recording.css";

export default function Recording({id, recordingData, handleDeleteRecording}) {
  return (
    <div>
          <div key={recordingData[0]}>
          <div className="recording-data">
            <audio className="audio-controls" src={recordingData[1]} controls="controls" />
            <button onClick={()=>{handleDeleteRecording(id)}} className="btn-floating pink lighten-1"><i className="fas fa-trash"></i></button>
            </div>
                <p className="recording-time">{moment(recordingData[0]).calendar()}</p>
          </div>
    </div>
  )
}
