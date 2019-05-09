import React, { Component } from "react";
import { connect } from "react-redux";
import { editLyrics } from '../../../store/actions/projectActions';
import { notify } from "react-notify-toast";
import "./LyricsBox.css";

class LyricsBox extends Component {

    state = {
      lyrics: "What do you want to say?"
    };

  // Makes it so when I switch between projects, the new props passed display the correct lyrics on the page
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.singleProject.lyrics !== prevState.lyrics &&
      !prevState.wasJustEdited
    ) {
      console.log("Lyrics of state and props are different, updating lyrics");
      return {
        lyrics: nextProps.singleProject.lyrics,
        isInEditMode: false
      };
    }
    // No state update necessary, no change in lyrics
    return null;
  }
  handleEdit = e => {
    this.setState({
      ...this.state,
      isInEditMode: true
    }, ()=>{
      this.refs.theTextInput.focus();
    });
  };
  handleSave = e => {
    const { editLyrics, singleProject, id } = this.props; 

    let lyricsWithLineBreaks = this.refs.theTextInput.value.replace(/\n\r?/g, '<br />');
    this.setState(
      {
        lyrics: lyricsWithLineBreaks,
        isInEditMode: false,
        wasJustEdited: true //Prevents gerDerivedStateFromProps from updating with previous value to ensure that change is saved to database and displayed on screen
      },
      () => {
        editLyrics(id, this.state.lyrics, singleProject.title); //Sends lyrics off to firebase to be saved
        notify.show("Lyrics saved!");
      }
    );
  };
  render() {
    //If we are editing the content, user sees the inpuit field. Otherwise, they see the lyrics
    const { isInEditMode, lyrics } = this.state;
    return isInEditMode ? (
      <div className="card lyrics-card">
        <div className="lyrics-card-content card-content">
          <span className="card-title">Lyrics</span>
          <textarea
            type="text"
            id="lyrics"
            defaultValue={lyrics && lyrics.replace(/<br\s*\/?>/gi,'\r\n')}
            ref="theTextInput"
          />
          <button className="save-lyrics card-button btn pink lighten-1" onClick={this.handleSave}>
            Save
          </button>
        </div>
      </div>
    ) : (
      <div className="card lyrics-card">
        <div className="lyrics-card-content card-content">
          <span className="card-title">Lyrics</span>
          <p dangerouslySetInnerHTML={{ __html: lyrics }}></p>
          <button className="card-button btn pink lighten-1" onClick={this.handleEdit}>
            Edit
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    singleProject: state.singleProject
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editLyrics: (id, lyrics, title) => dispatch(editLyrics(id, lyrics, title))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LyricsBox);
