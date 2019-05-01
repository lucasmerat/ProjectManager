import React from "react";
import Recording from "../Recording"

const Recordings = ({recordings}) => {
  let reversedRecordings = [...recordings].reverse();
  return (
    <div className="section">
      {reversedRecordings && reversedRecordings.map(recording => {
        return (
          <Recording key={recording[0]} recordingData={recording}  />
        );
      })}
    </div>
  );
};

export default Recordings;
