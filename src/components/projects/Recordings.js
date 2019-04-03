import React from "react";
import moment from "moment";

const Recordings = props => {
  return (
    <div className="section">
      {props.recordings.map(recording => {
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
