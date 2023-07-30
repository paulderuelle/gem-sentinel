import React, { useState, useEffect } from 'react';

function Projects({ clickProject }) {
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
    <>
      <p className='header-container'>Repositories review</p>
      <ul>
        {projects.map((project) => (
          <li key={project.id} onClick={() => clickProject(project)}>
            {project.name} - {project.status}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Projects;
