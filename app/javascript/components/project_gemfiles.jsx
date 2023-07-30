import React, { useState, useEffect } from 'react';

function ProjectGemfiles({ projectId, projectGemfileId, clickGem }) {
  const [gems, setGems] = useState([]);
  const [totalGems, setTotalGems] = useState(0);
  const [updatableGems, setUpdatableGems] = useState(0)

  useEffect(() => {
    getGems();
  }, [projectId, projectGemfileId]);

  const getGems = () => {
    const getGemsUrl = `/api/v1/projects/${projectId}/project_gemfiles/${projectGemfileId}/project_gems`;

    if (projectGemfileId != null) {
      fetch(getGemsUrl)
        .then((response) => response.json())
        .then((data) => {
          setGems(data);
          setTotalGems(data.length);
          const updatableGemsCount = data.filter((gem) => gem.status === 'Updatable').length;
          setUpdatableGems(updatableGemsCount);
        });
    }
  };

  return (
    <>
      <p className='header-container'>Gems scan</p>
      <p>Used Gems: {totalGems}</p>
      <p>Updatable: {updatableGems}</p>
      <ul>
        {gems.map((gem) => (
          <li key={gem.id} onClick={() => clickGem()}>
            {gem.name} - {gem.status}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProjectGemfiles;
