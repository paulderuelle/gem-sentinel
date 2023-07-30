import React, { useState, useEffect } from 'react';
import icons from '../icons';

function ProjectGemfiles({ selectedProjectId, clickGem }) {
  const [gems, setGems] = useState([]);
  const [totalGems, setTotalGems] = useState(0);
  const [updatableGems, setUpdatableGems] = useState(0)

  useEffect(() => {
    getGems();
  }, [selectedProjectId]);

  const getGems = () => {
    const getGemsUrl = `/api/v1/projects/${selectedProjectId}`;

    if (selectedProjectId) {
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
          <li key={gem.id} onClick={() => clickGem(gem.id)}>
            {gem.name} - {gem.status}
            {icons.IconCheck}
            {icons.IconTimes}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProjectGemfiles;
