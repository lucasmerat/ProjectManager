import React from 'react'
import GuitarChord from 'react-guitar-chord'
import { connect } from 'react-redux';

function ChordList({chords}) {
  console.log(chords)
  return (
    <div>
     {chords && chords.map((chord, index)=>{
      return (<GuitarChord key={index}chord={chord.chord} quality={chord.quality} variation={chord.variation}/>)
     })}
    </div>
  )
}

const mapStateToProps = state =>{
  console.log(state)
  return{
    chords: state.singleProject.chords
  }
}

export default connect(mapStateToProps, null)(ChordList)