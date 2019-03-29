import React, { Component } from 'react'
import { connect } from 'react-redux' //connects the component to store
import { editLyrics } from '../../store/actions/projectActions'
import { notify } from 'react-notify-toast'


class LyricsBox extends Component {
    state = {
        lyrics: this.props.lyrics
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleClick = (e) =>{
        this.props.editLyrics(this.props.id, this.state);
        notify.show('Lyrics saved!');
    }
  render() {
    return (
        <div className="">
            <h4>Song Lyrics</h4>
            <textarea id="lyrics" onChange={this.handleChange} value={this.state.lyrics}></textarea>
            <button className ="btn pink lighten-1" onClick={this.handleClick}>Save</button>
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return{
        editLyrics: (id, lyrics) => dispatch(editLyrics(id, lyrics))
    }
}

export default connect(null, mapDispatchToProps)(LyricsBox)
