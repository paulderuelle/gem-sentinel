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
            <div className='project-card folder'>{icons.IconFolderOpen}</div>
            <div className='project-card infos'>{project.name}{project.status === 'Updatable' ? icons.IconWrench : icons.IconCircleCheck}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Projects;
