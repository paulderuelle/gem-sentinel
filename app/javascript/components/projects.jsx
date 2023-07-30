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
              <div className='project-card project-icon'>{icons.IconFolderOpen}</div>
              <div className='project-card project-infos'>{project.name}{project.status === 'Updatable' ? icons.IconWrench : icons.IconCircleCheck}</div>
          </li>
        ))}
      </ul>
      <div id='create-project-form-container'>
        <form action="/api/v1/projects" method="post">
          <div className='field'>
            <label htmlFor="project[name]">Name:
              <input
              placeholder="Type project name"
              type="text"
              name="project[name]"
              id="project_name"/>
            </label>
          </div>
          <div className='field'>
            <label htmlFor="project_gemfile[content]">Bundle list: <br/>
              <textarea
              placeholder="Open project's directory with your terminal and type `bundle list` then copy the output and paste it here"
              cols='55'
              rows='7'
              name="project_gemfile[content]"
              id="project_gemfile_content"/>
            </label>
          </div>
          <div className='field'>
            <input type="submit" value="Add a new project"></input>
          </div>
        </form>
      </div>
    </>
  );
}

export default Projects;
