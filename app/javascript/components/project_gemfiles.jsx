import React, { useState, useEffect } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';

function ProjectGemfiles({ projectId, projectGemfileId, clickGem }) {
  const [gems, setGems] = useState([]);

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
        });
    }
  };

  return (
    <div>
      <ul>
        {gems.map((gem) => (
          <li key={gem.id} onClick={() => clickGem()}>
            {gem.name} - {gem.status}
            <FontAwesomeIcon icon={faCheck} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectGemfiles;
