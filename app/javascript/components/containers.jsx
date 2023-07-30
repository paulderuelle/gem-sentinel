import React, { useState } from 'react';
import Projects from './projects.jsx';
import ProjectGemfiles from './project_gemfiles.jsx';


function Containers() {
  const initialState = [
    { id: 'repositories_review', top: '50px', left: '10px', visible: true },
    { id: 'gems_scan', top: '50px', left: '300px', visible: false },
    { id: 'release_tracker', top: '50px', left: '600px', visible: false },
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
          className='containers'
          style={{
            position: 'absolute',
            top: container.top,
            left: container.left,
            display: container.visible ? 'block' : 'none',
            opacity: index === 0 && containers[2].visible ? '0.2' : '1',
            }}>
          {container.id === 'repositories_review' && <Projects clickProject={clickProject} />}
          {container.id === 'gems_scan' &&  <ProjectGemfiles projectId={selectedProjectId} projectGemfileId={selectedProjectGemfileId} clickGem={clickGem} />}
        </div>
      ))}
      <button onClick={resetContainers}>Back</button>
    </>
  );
}

export default Containers;
