import React, { useState, useEffect } from 'react';

function Changelogs() {
  const [version, setVersion] = useState([])

  useEffect(() => {
    getChangelogs();
  }, []);

  const getVersion = () => {
    const getVersionUrl = '/api/v1/projects/${projectId}/project_gemfiles/${projectGemfileId}/project_gems';

  }


  return (
    <>
      <p className='header-container'>Release tracker</p>
      <ul>
        {gems.map((gem) => (
          <li key={gem.id} onClick={() => clickGem()}>
            {gem.name} - {gem.status}
            {/* Afficher la version de la gem en utilisant GemRelease */}
            {gem.status === 'Updatable' && <GemRelease version={gem.gem_release.version} />}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Changelogs;
