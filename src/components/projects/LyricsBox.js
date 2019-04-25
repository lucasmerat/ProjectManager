import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux"; //connects the component to store
import { editLyrics } from "../../store/actions/projectActions";
import { notify } from "react-notify-toast";

class LyricsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: ""
    };
  }
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
    return this.state.isInEditMode ? (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Lyrics</span>
          <textarea
            type="text"
            id="lyrics"
            defaultValue={this.state.lyrics && this.state.lyrics.replace(/<br\s*\/?>/gi,'\r\n')}
            ref="theTextInput"
          />
          <button className="btn pink lighten-1" onClick={this.handleSave}>
            Save
          </button>
        </div>
      </div>
    ) : (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Lyrics</span>
          <p dangerouslySetInnerHTML={{ __html: this.state.lyrics }}></p>
          <button className="btn pink lighten-1" onClick={this.handleEdit}>
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
