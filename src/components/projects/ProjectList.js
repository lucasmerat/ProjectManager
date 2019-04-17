import React from "react";
import ProjectSummary from "./ProjectSummary";
import { Link } from "react-router-dom";

const ProjectList = ({ projects }) => {
    let sortedProjects;
  if (projects.length > 0) {
    sortedProjects = [...projects].sort((a, b) => {
      return b.updatedAt.seconds > a.updatedAt.seconds ? 1 : -1;
    });
    console.log(sortedProjects)
  }
  return (
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
  );
};

export default ProjectList;
