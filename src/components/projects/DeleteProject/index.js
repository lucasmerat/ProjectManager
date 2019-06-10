import React from "react";
import { connect } from "react-redux"; //connects the component to store
import { deleteProject } from "../../../store/actions/songActions";

const DeleteProject = ({ deleteProject, history, id }) => {
  const handleSubmit = () => {
    deleteProject(id);
    history.push("/");
  };
  return <button onClick={handleSubmit}>Delete Project</button>;
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProject: id => dispatch(deleteProject(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteProject);
