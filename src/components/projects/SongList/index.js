import React from "react";
import SongSummary from "../SongSummary";
import { Link } from "react-router-dom";

const SongList = ({ songs }) => {
  let sortedSongs;
  if (songs.length > 0) {
    sortedSongs = [...songs].sort((a, b) => {
      return b.updatedAt.seconds > a.updatedAt.seconds ? 1 : -1;
    });
  }
  return sortedSongs ? (
    <div className="project-list section">
      {sortedSongs &&
        sortedSongs.map(song => {
          return (
            <Link to={"/project/" + song.id} key={song.id}>
              <SongSummary song={song} />
            </Link>
          );
        })}
    </div>
  ) : (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <p className="pink-text">
            No songs added yet, go ahead and add your first!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SongList;
