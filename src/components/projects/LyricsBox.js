import React, { Component } from 'react'
import { connect } from 'react-redux' //connects the component to store
import { editLyrics } from '../../store/actions/projectActions'
import { notify } from 'react-notify-toast'


class LyricsBox extends Component {
    // static getDerivedStateFromProps(nextProps, prevState){
    //     console.log(nextProps, prevState)
    //     if(prevState.lyrics !== nextProps.lyrics){
    //         return {
    //             lyrics: nextProps.theLyrics
    //         }
    //     }
    //     return null
    //  }
    state = {
        lyrics: this.props.propLyrics,
        isInEditMode: false
    }
    shouldComponentUpdate(nextProps){
        console.log(nextProps, this.state)
        if(nextProps.propLyrics !== this.state.lyrics){
            this.setState({
                lyrics: nextProps.propLyrics,
                isInEditMode: false
            })
           return false
        } else{
           return true
        }
    }
    handleEdit = (e) =>{
        this.setState({
            lyrics: this.state.lyrics,
            isInEditMode: !this.state.isInEditMode
        })
    }
    handleSave = (e) =>{
        console.log(this.refs.theTextInput.value)
        this.setState({
            lyrics: this.refs.theTextInput.value
        }, ()=>{
            console.log(this.state)
            this.props.editLyrics(this.props.id, this.state.lyrics);
            this.setState({
                ...this.state,
                isInEditMode: false
            })
            notify.show('Lyrics saved!');
        });
        
    }
  render() {
      console.log(this.state)
      return this.state.isInEditMode ? 
        <div>
      <input type= "text" id="lyrics" defaultValue={this.state.lyrics} ref="theTextInput"/>
      <button className ="btn pink lighten-1" onClick={this.handleSave}>Save</button>
      </div> : <div>
          <h1>{this.state.lyrics}</h1>
          <button className ="btn pink lighten-1" onClick={this.handleEdit}>Edit</button>
      </div>  
  }
}

// const mapStateToProps = (state) =>{
//     console.log(state)
//     return {
//         lyrics: state.singleProject.lyrics
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return{
        editLyrics: (id, lyrics) => dispatch(editLyrics(id, lyrics))
    }
}

export default connect(null, mapDispatchToProps)(LyricsBox)
