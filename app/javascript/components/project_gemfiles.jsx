import React, { useState, useEffect } from 'react';

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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectGemfiles;
