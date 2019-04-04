import React, { Component } from "react";
import { connect } from "react-redux"; //connects the component to store
import { firestoreConnect } from "react-redux-firebase"; //Brings in firebase database
import { compose } from "redux"; //Combines higher order components
import { Redirect } from "react-router-dom";
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
    this.setState({
        state:"A change"
    })
  }
  render() {
    const { singleProject, auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    console.log(this.props.singleProject)
    if (this.props.match.params.id === this.props.singleProject.id) { // Waits until correct project has been loaded to display page
        return (
            <div className="container section project-details">
              <div className="card z-depth-0">
                <div className="card-content">
                  <span className="card-title">{singleProject.title}</span>
                  <p>{singleProject.content}</p>
                  <div className="row">
                    <div className="lyrics col s6">
                      <LyricsBox
                        id={this.props.match.params.id}
                      />
                    </div>
                    <div className="todo col s6">
                        <AudioRecorder id={this.props.match.params.id}/>
                        </div>
                  </div>
                <div className="row">
                    <div className="col s6">
                        <Chords />
                    </div>
                    <div className="col s6">
                        <Todos id={this.props.match.params.id}/>
                    </div>
                </div>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                  <div className="author">
                    Posted by {singleProject.firstName} {singleProject.lastName}
                  </div>
                  <div className="date">
                    {moment(singleProject.createdAt.toDate()).calendar()}
                  </div>
                  <DeleteProject
                    history={this.props.history}
                    id={this.props.match.params.id}
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

export default compose(
  firestoreConnect([{ collection: "projects" }]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProjectDetails);
