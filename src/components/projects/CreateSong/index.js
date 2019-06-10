import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../../store/actions/projectActions'

class CreateSong extends Component {
    state = {
        title: ""
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value,
        });
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.createProject(this.state);
        this.props.history.push('/');
    }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Start Writing a Song</h5>
            <div className="input-field">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" value={this.state.title} onChange={this.handleChange}/>
            </div>
            <div className="input-field">
                <button className="btn pink lighten-1 z-depth-0">Create</button>
            </div>
        </form>
      </div>
    )
}
}

const mapStateToProps = (state) =>{
    return{
        auth:state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSong)