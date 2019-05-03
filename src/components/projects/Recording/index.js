import React from 'react'
import moment from "moment";

export default function Recording({id, recordingData, handleDeleteRecording}) {
  return (
    <div>
          <div key={recordingData[0]}>
            <audio src={recordingData[1]} controls="controls" />
            <p>{moment(recordingData[0]).calendar()}</p>
          </div>
          <button onClick={()=>{handleDeleteRecording(id)}}>Delete</button>
    </div>
  )
}
