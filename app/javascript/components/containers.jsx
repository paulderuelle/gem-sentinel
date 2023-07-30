import React, { useState } from 'react';
import Projects from './projects.jsx';
import ProjectGemfiles from './project_gemfiles.jsx';
import GemChangelogs from './gem_changelogs.jsx';
import icons from '../icons';

function Containers() {
  const initialState = [
    { id: 'repositories_review', visible: true },
    { id: 'gems_scan', visible: false },
    { id: 'release_tracker', visible: false },
  ];

  const [containers, setContainers] = useState(initialState);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedGemId, setSelectedGemId] = useState(null);
  const [clickDisabled, setClickDisabled] = useState(false);

  const clickProject = (projectId) => {
    if (!clickDisabled) {
      setContainers((prevContainers) => [
        { ...prevContainers[0], visible: true },
        { ...prevContainers[1], visible: true, left: '42rem' },
        { ...prevContainers[2], visible: false },
      ]);
      setSelectedProjectId(projectId)
    }
  };

  const clickGem = (gemId) => {
    setClickDisabled(true);
    setContainers((prevContainers) => [
      { ...prevContainers[0], visible: true, opacity: '0.2'},
      { ...prevContainers[1], visible: true, left: '3rem' },
      { ...prevContainers[2], visible: true, left: '45rem'},
    ]);
    setSelectedGemId(gemId);
  }

  const resetContainers = () => {
    setSelectedProjectId(null);
    setSelectedGemId(null);
    setClickDisabled(false);
    setContainers(initialState);
    document.querySelector('.containers').scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {containers.map((container, index) => (
        <div
        key={container.id}
        id={container.id}
        className='containers'
          style={{
            position: 'absolute',
            left: container.left,
            display: container.visible ? 'block' : 'none',
            opacity: index === 0 && containers[2].visible ? '0.2' : '1',
            }}>
          {container.id === 'repositories_review' && <Projects clickProject={clickProject} />}
          {container.id === 'gems_scan' &&  <ProjectGemfiles selectedProjectId={selectedProjectId} clickGem={clickGem} />}
          {container.id === 'release_tracker' && <GemChangelogs selectedGemId={selectedGemId} />}
        </div>
      ))}
      {containers[0].opacity === '0.2' && (<a className='button btn-back'style={{ position: 'absolute', top: '-0.4rem',}}
        onClick={resetContainers}>{icons.IconAnglesLeft}</a>
      )}
    </>
  );
}

export default Containers;
