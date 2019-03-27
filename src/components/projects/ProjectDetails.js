import React, { Component } from 'react'
import { connect } from 'react-redux' //connects the component to store
import { firestoreConnect } from 'react-redux-firebase' //Brings in firebase database
import { compose } from 'redux' //Combines higher order components
import { Redirect } from 'react-router-dom'
import moment from 'moment';
import LyricsBox from './LyricsBox'
import DeleteProject from './DeleteProject'

class ProjectDetails extends Component {
    render(){
        const {project, auth} = this.props;   

      if(!auth.uid) {
        return(
            <Redirect to="/signin" />
            )
      }
    if(project){
    return(
    <div className="container section project-details">
        <div className="card z-depth-0">
            <div className="card-content">
                <span className="card-title">
                    {project.title}
                </span>
                <p>{project.content}</p>

                <LyricsBox id={this.props.match.params.id} lyrics={this.props.project.lyrics}/>

            </div>
            <div className="card-action grey lighten-4 grey-text">
                <div className="author">Posted by {project.firstName} {project.lastName}</div>
                <div className="date">{moment(project.createdAt.toDate()).calendar()}</div>
                <DeleteProject history= {this.props.history} id={this.props.match.params.id}/>
            </div>
        </div>
    </div>
    )
    } else {
        return(
        <div className="container center">
            <p>Loading project...</p>
        </div>
        )
    }
}
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects
    const project = projects ? projects[id] : null;
    console.log(project)
    return {
        project: project,
        auth: state.firebase.auth
    }
}



export default compose(
    firestoreConnect([
        {collection: "projects"}
    ]),
    connect(mapStateToProps)
)(ProjectDetails)
