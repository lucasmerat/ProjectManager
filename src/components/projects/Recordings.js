import React from 'react'


// eslint-disable-next-line react/require-render-return
const Recordings = (props) =>{
      return(
          <div className="section">
              {props.recordings.map(recording=>{
                return (
                    <audio key={Math.random()} src={recording[1]} controls="controls"></audio>
                )
                })
              }
          </div>
      )
      
}

export default Recordings
