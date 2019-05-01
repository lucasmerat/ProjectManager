import React from "react";
import moment from "moment";

const Recordings = ({recordings}) => {
  let reversedRecordings = [...recordings].reverse();
  return (
    <div className="section">
      {reversedRecordings && reversedRecordings.map(recording => {
        return (
          <div key={Math.random()}>
            <audio src={recording[1]} controls="controls" />
            <p>{moment(recording[0]).calendar()}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Recordings;
