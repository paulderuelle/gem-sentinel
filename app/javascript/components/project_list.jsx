import React, { useState, useEffect } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    const getProjectsUrl = '/api/v1/projects';

    fetch(getProjectsUrl)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      });
  };

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}

export default ProjectList;
