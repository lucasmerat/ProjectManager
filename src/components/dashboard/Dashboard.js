import React, { Component } from 'react'
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
 
class Dashboard extends Component{
    render(){
        const { projects, auth } = this.props;
        if(!auth.uid){
            return(
            <Redirect to="/signin" />
            )
        } else {
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects={projects} />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications />
                    </div>
                </div>
            </div>
        )
    }
}
}

const mapStateToProps = (state, ownProps) =>{
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: "projects"}
    ])
)(Dashboard)

//The way we are going to work with external data being asynchronous, is once there is a dispatched action, we pull data, and then poush the data to the recucer once we have that data
//To do this we need redux middleware between the two - it will allow us to run async tasks inside action creators
//REdux thunk allows us to return a function rather than the action, this function will halt the dispatch, then get data, then resume the dispatched