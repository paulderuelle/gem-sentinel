import React, { useState, useEffect } from 'react';

function Projects({ clickProject }) {
  // État pour conserver la liste des projets
  const [projects, setProjects] = useState([]);

  // Ici UseEffect n'a aucune dépendance et permet simplement d'appeler getProjects lors du premier rendu du container
  useEffect(() => {
    getProjects();
  }, []);

  // Effectue la requête API pour mettre à jour l'état de la liste des projets
  const getProjects = () => {
    const getProjectsUrl = '/api/v1/projects';

    fetch(getProjectsUrl)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      });
  };

  return (
    <ul>
      {/* Affiche les projets sous forme de liste avec un listener onClick pour passer les ID Projet et Gemfile*/}
      {projects.map((project) => (
        <li key={project.id} onClick={() => clickProject(project)}>
          {project.name}
        </li>
      ))}
    </ul>
  );
}

// Export pour être rendu par containers.jsx
export default Projects;
