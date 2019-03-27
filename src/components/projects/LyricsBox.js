import React, { Component } from 'react'
import { connect } from 'react-redux' //connects the component to store
import { editLyrics } from '../../store/actions/projectActions'


class LyricsBox extends Component {
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleClick = (e) =>{
        console.log(this.state)
        this.props.editLyrics(this.props.id, this.state);
    }
  render() {
    return (
        <div className="">
            <h4>Song Lyrics</h4>
            <textarea id="lyrics" onChange={this.handleChange}></textarea>
            <button onClick={this.handleClick}>Save</button>
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
