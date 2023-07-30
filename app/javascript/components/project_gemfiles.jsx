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
    <div>
      <h3>Used Gems: {totalGems}</h3>
      <h3>Updatable: {updatableGems}</h3>
      <ul>
        {gems.map((gem) => (
          <li key={gem.id} onClick={() => clickGem()}>
            {gem.name} - {gem.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectGemfiles;
