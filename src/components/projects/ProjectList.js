import React from "react";
import ProjectSummary from "./ProjectSummary";
import { Link } from "react-router-dom";

const ProjectList = ({ projects }) => {
  let sortedProjects;
  if (projects.length > 0) {
    sortedProjects = [...projects].sort((a, b) => {
      return b.updatedAt.seconds > a.updatedAt.seconds ? 1 : -1;
    });
  }
  return sortedProjects ? (
    <div className="project-list section">
      {sortedProjects &&
        sortedProjects.map(project => {
          return (
            <Link to={"/project/" + project.id} key={project.id}>
              <ProjectSummary project={project} />
            </Link>
          );
        })}
    </div>
  ) : (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <p className="pink-text">No songs added yet, go ahead and add your first!</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
