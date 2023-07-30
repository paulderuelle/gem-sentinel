import React, { useState, useEffect } from 'react';
import icons from '../icons';

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
      <p className='header-container'>{icons.IconFileCode} Repositories review</p>
      <ul>
        {projects.map((project) => (
          <li key={project.id} onClick={() => clickProject(project.id)}>
            {project.name} - {project.status}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Projects;
