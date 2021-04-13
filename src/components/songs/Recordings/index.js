import React from "react";
import Recording from "../Recording"
import "./Recordings.css"

const Recordings = ({recordings, handleDeleteRecording}) => {
  let reversedRecordings = [...recordings].reverse();
  return (
    <div className="recording-box section">
      {reversedRecordings && reversedRecordings.map(recording => {
        return (
          <Recording key={recording[0]} id={recording[0]} recordingData={recording} handleDeleteRecording={recordingId=>{handleDeleteRecording(recordingId)}} />
        );
      })}
    </div>
  );
};

export default Recordings;
