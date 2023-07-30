import React, { useState } from 'react';
import Projects from './projects.jsx';
import ProjectGemfiles from './project_gemfiles.jsx';
import GemChangelogs from './gem_changelogs.jsx';


function Containers() {
  const initialState = [
    { id: 'repositories_review', top: '50px', left: '10px', visible: true },
    { id: 'gems_scan', top: '50px', left: '300px', visible: false },
    { id: 'release_tracker', top: '50px', left: '600px', visible: false },
  ];

  const [containers, setContainers] = useState(initialState);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedGemId, setSelectedGemId] = useState(null);


  const clickProject = (projectId) => {
    setContainers((prevContainers) => [
      { ...prevContainers[0], visible: true },
      { ...prevContainers[1], visible: true },
      { ...prevContainers[2], visible: false },
    ]);
    setSelectedProjectId(projectId)
  };

  const clickGem = (gemId) => {
    setContainers((prevContainers) => [
      { ...prevContainers[0], visible: true, opacity: '0.2'},
      { ...prevContainers[1], visible: true, left: '50px' },
      { ...prevContainers[2], visible: true, left: '300px'},
    ]);
    setSelectedGemId(gemId);
  }

  const resetContainers = () => {
    setSelectedProjectId(null);
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
          {container.id === 'gems_scan' &&  <ProjectGemfiles selectedProjectId={selectedProjectId} clickGem={clickGem} />}
          {container.id === 'release_tracker' && <GemChangelogs selectedGemId={selectedGemId} />}
        </div>
      ))}
      <button onClick={resetContainers}>Back</button>
    </>
  );
}

export default Containers;
