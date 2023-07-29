import React, { useState, useEffect } from 'react';

function ProjectGemfiles({ projectId, projectGemfileId }) {
  // État pour conserver la liste des gems récupérées depuis l'API
  const [gems, setGems] = useState([]);

  // Utilisation de dépendance pour useEffect : le code ne sera executé que si un des ID changent.
  useEffect(() => {
    getGems();
  }, [projectId, projectGemfileId]);

  // Effectue la requête API pour récupérer les gems en utilisant les ID Project et Gemfile
  const getGems = (projectId, projectGemfileId) => {
    const getGemsUrl = `/api/v1/projects/${projectId}/project_gemfiles/${projectGemfileId}/project_gems`;
    console.log(projectId, projectGemfileId)
    // const getGemsUrl = `/api/v1/projects/1/project_gemfiles/1/project_gems`;

    fetch(getGemsUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setGems(data);
      });
  };

  return (
    <div>
      <ul>
        {/* Afficher le name et le status des gems récupérées */}
        {gems.map((gem) => (
          <li key={gem.id}>
            {gem.name} - {gem.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Export pour être rendu par containers.jsx
export default ProjectGemfiles;
