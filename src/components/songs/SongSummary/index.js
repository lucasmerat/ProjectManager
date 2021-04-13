import React from "react";
import moment from "moment";

const SongSummary = ({ song }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{song.title}</span>
        <p>
          Posted by {song.authorFirstName} {song.authorLastName}
        </p>
        <p className="grey-text">
          {moment(song.updatedAt.toDate()).calendar()}
        </p>
      </div>
    </div>
  );
};

export default SongSummary;
