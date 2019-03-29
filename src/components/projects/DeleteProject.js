import React, { Component } from 'react'
import { connect } from 'react-redux' //connects the component to store
import { deleteProject } from '../../store/actions/projectActions'

class DeleteProject extends Component {
    handleSubmit = (e) =>{
        this.props.deleteProject(this.props.id);
        this.props.history.push('/');
    }
    render(){
        return(
            <button onClick = {this.handleSubmit}>Delete Project</button>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        auth:state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deleteProject: (id) => dispatch(deleteProject(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProject)