import React from "react";
import Recording from "../Recording"

const Recordings = ({recordings, handleDeleteRecording}) => {
  let reversedRecordings = [...recordings].reverse();
  console.log(handleDeleteRecording)
  return (
    <div className="section">
      {reversedRecordings && reversedRecordings.map(recording => {
        return (
          <Recording key={recording[0]} id={recording[0]} recordingData={recording} handleDeleteRecording={recordingId=>{handleDeleteRecording(recordingId)}} />
        );
      })}
    </div>
  );
};

export default Recordings;
