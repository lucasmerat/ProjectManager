import React, { Component } from "react";
import { connect } from "react-redux"; //connects the component to store
import moment from "moment";
import LyricsBox from "./LyricsBox";
import AudioRecorder from "./AudioRecorder"
import Chords from "./Chords"
import Todos from "./Todos"
import DeleteProject from "./DeleteProject";
import { loadProject } from "../../store/actions/projectActions";

class ProjectDetails extends Component {
  componentDidMount() {
    this.props.loadProject(this.props.match.params.id);
  }
  render() {
    const { singleProject, match, history } = this.props;
    if (match.params.id === singleProject.id) { // Waits until correct project has been loaded to display page
        return (
            <div className="container section project-details">
              <div className="card z-depth-0">
                <div className="card-content">
                  <span className="card-title">{singleProject.title}</span>
                  <div className="row">
                    <div className="lyrics col s6">
                      <LyricsBox
                        id={match.params.id}
                      />
                    </div>
                    <div className="todo col s6">
                        <AudioRecorder id={match.params.id}/>
                        </div>
                  </div>
                <div className="row">
                    <div className="col s6">
                        <Chords />
                    </div>
                    <div className="col s6">
                        <Todos id={match.params.id}/>
                    </div>
                </div>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                  <div className="author">
                    Written by {singleProject.authorFirstName} {singleProject.authorLastName}
                  </div>
                  <div className="date">
                    Last updated {moment(singleProject.updatedAt.toDate()).calendar()}
                  </div>
                  <DeleteProject
                    history={history}
                    id={match.params.id}
                  />
                </div>
              </div>
            </div>
          );
    } else {
        return (
            <div className="container center">
              <p>Loading project...</p>
            </div>
          );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    singleProject: state.singleProject,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadProject: id => dispatch(loadProject(id))
  };
};

export default
  connect(
    mapStateToProps,
    mapDispatchToProps

)(ProjectDetails);
