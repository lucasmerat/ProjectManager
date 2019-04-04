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
    console.log(nextProps, prevState);
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
    this.setState(
      {
        lyrics: this.refs.theTextInput.value,
        isInEditMode: false,
        wasJustEdited: true //Prevents gerDerivedStateFromProps from updating with previous value to ensure that change is saved to database and displayed on screen
      },
      () => {
        this.props.editLyrics(this.props.id, this.state.lyrics); //Sends lyrics off to firebase to be saved
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
            defaultValue={this.state.lyrics}
            ref="theTextInput"
          />
          {/* Need to add conditional rendering of this field */}
          {/* <p>{this.props.singleProject.updatedAt.seconds}</p> */}
          <button className="btn pink lighten-1" onClick={this.handleSave}>
            Save
          </button>
        </div>
      </div>
    ) : (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Lyrics</span>
          <p>"{this.state.lyrics}"</p>
          <button className="btn pink lighten-1" onClick={this.handleEdit}>
            Edit
          </button>
          <p>
            Last updated{" "}
            {/* {moment.unix(this.props.singleProject.updatedAt.seconds).calendar()} */}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    singleProject: state.singleProject
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editLyrics: (id, lyrics) => dispatch(editLyrics(id, lyrics))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LyricsBox);
