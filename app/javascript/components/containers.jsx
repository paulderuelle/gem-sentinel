import React, { useState } from 'react';
import Projects from './projects.jsx';
import ProjectGemfiles from './project_gemfiles.jsx';

function Containers() {
  const initialState = [
    { id: 'index_projects_container', backgroundColor: '#FFF2F2', border: '1px solid red', top: '50px', left: '10px', visible: true },
    { id: 'index_gemfiles_container', backgroundColor: '#FFF2F2', border: '1px solid blue', top: '50px', left: '300px', visible: false },
    { id: 'show_gem_container', backgroundColor: '#FFF2F2', border: '1px solid green', top: '50px', left: '600px', visible: false },
  ];

  const [containers, setContainers] = useState(initialState);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectGemfileId, setSelectedProjectGemfileId] = useState(null);


  const clickProject = (project) => {
    setContainers((prevContainers) => [
      { ...prevContainers[0], visible: true },
      { ...prevContainers[1], visible: true },
      { ...prevContainers[2], visible: false },
    ]);


    setSelectedProjectId(project.id);

    getGemfile(project.id)
      .then((gemfileId) => {
        setSelectedProjectGemfileId(gemfileId);
      })
      .catch((error) => {
        console.error('Erreur :', error);
      })
  };

  const clickGem = () => {
    setContainers((prevContainers) => [
      { ...prevContainers[0], visible: true, opacity: '0.2'},
      { ...prevContainers[1], visible: true, left: '50px' },
      { ...prevContainers[2], visible: true, left: '300px'},
    ]);
  }

  const getGemfile = (projectId) => {
    const getGemfileUrl = `/api/v1/projects/${projectId}`;

    return fetch(getGemfileUrl)
    .then((response) => response.json())
    .then((data) => data)
      .catch((error) => {
        console.error('Erreur :', error);
        throw error;
      })
  };

  const resetContainers = () => {
    setSelectedProjectId(null);
    setSelectedProjectGemfileId(null);

    setContainers(initialState);
  };

  return (
    <>
      {containers.map((container, index) => (
        <div
          key={container.id}
          id={container.id}
          style={{
            border: container.border,
            position: 'absolute',
            top: container.top,
            left: container.left,
            display: container.visible ? 'block' : 'none',
            backgroundColor: container.backgroundColor,
            opacity: index === 0 && containers[2].visible ? '0.2' : '1',
          }}
        >
          {container.id}
          {container.id === 'index_projects_container' && <Projects clickProject={clickProject} />}
          {container.id === 'index_gemfiles_container' &&  <ProjectGemfiles projectId={selectedProjectId} projectGemfileId={selectedProjectGemfileId} clickGem={clickGem} />}
        </div>
      ))}
      <button onClick={resetContainers}>Back</button>
    </>
  );
}

export default Containers;
