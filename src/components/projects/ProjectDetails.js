import React from 'react'
import { connect } from 'react-redux' //connects the component to store
import { firestoreConnect } from 'react-redux-firebase' //Brings in firebase database
import { compose } from 'redux' //Combines higher order components

const ProjectDetails = (props) => {
    const {project} = props;   
    if(project){
    return(
    <div className="container section project-details">
        <div className="card z-depth-0">
            <div className="card-content">
                <span className="card-title">
                    {project.title}
                </span>
                <p>{project.content}</p>

            </div>
            <div className="card-action grey lighten-4 grey-text">
                <div className="author">Posted by {project.authorFirstName} {project.authorLastName}</div>
                <div className="date">18th of March, 3pm</div>
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

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects
    const project = projects ? projects[id] : null;
    return {
        project: project
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: "projects"}
    ])
)(ProjectDetails)
