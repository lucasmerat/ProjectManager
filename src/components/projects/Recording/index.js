import React from 'react';
import moment from "moment";
import "./Recording.css";

export default function Recording({id, recordingData, handleDeleteRecording}) {
  return (
    <div>
          <div key={recordingData[0]}>
            <audio className="audio-controls" src={recordingData[1]} controls="controls" />
            <div className="recording-data">
                <p>{moment(recordingData[0]).calendar()}</p>
                <button onClick={()=>{handleDeleteRecording(id)}}>Delete</button>
            </div>
          </div>
    </div>
  )
}
