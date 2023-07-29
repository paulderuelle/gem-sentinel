import React, { useState } from 'react';
// Imports des components à charger
import Projects from './projects.jsx';
import ProjectGemfiles from './project_gemfiles.jsx';

function Containers() {
  // Etat initial des containers
  const initialState = [
    { id: 'index_projects_container', border: '1px solid red', top: '50px', left: '10px', visible: true },
    { id: 'index_gemfiles_container', border: '1px solid blue', top: '50px', left: '300px', visible: false },
    { id: 'show_gem_container', border: '1px solid green', top: '50px', left: '600px', visible: false },
  ];

  const [containers, setContainers] = useState(initialState); // Etat qui gère l'état des containers
  const [selectedProjectId, setSelectedProjectId] = useState(null); // Etat qui stocke l'ID du Projet
  const [selectedProjectGemfileId, setSelectedProjectGemfileId] = useState(null); // Etat qui stocke l'ID du Gemfile

  // Mise à jour de la visibilité des containers quand User clique sur un projet
  const clickProject = (project) => {
    console.log('project id : ', project.id)
    setContainers((prevContainers) => [
      { ...prevContainers[0], visible: true },
      { ...prevContainers[1], visible: true },
      { ...prevContainers[2], visible: false },
    ]);

    // Mise à jour des ID du Projet et du Gemfile lorsqu'ils sont sélectionnés
    setSelectedProjectId(project.id);

    getGemfile(project.id)
      .then((gemfileId) => {
        console.log('gemfile id : ', gemfileId)
        setSelectedProjectGemfileId(gemfileId);
      })
      .catch((error) => {
        console.error('Erreur :', error);
      })
  };

  const testtest = () => {
    console.log('TEST OK');
  }
  
  const getGemfile = (projectId) => {
    const getGemfileUrl = `/api/v1/projects/${projectId}`;
    
    return fetch(getGemfileUrl)
    .then((response) => response.json())
    .then((data) => data)
      .catch((error) => {
        console.error('Erreur :', error);
        throw error;
      })
  };

  // Permet de réinitialiser les containers et les ID sélectionnés
  const resetContainers = () => {
    setSelectedProjectId(null);
    setSelectedProjectGemfileId(null);
    setContainers(initialState);
  };

  return (
    <div>
      {/* Permet d'afficher les containers en fonction de leur visibilité */}
      {containers.map((container, index) => (
        <div
          key={container.id}
          id={container.id}
          style={{
            border: container.border,
            position: 'absolute',
            top: container.top,
            left: container.left,
            display: container.visible ? 'block' : 'none',
          }}
        >
          {/* Affiche le composant Projects dans le container correspondant avec la fonction clickProject */}
          {container.id === 'index_projects_container' && <Projects clickProject={clickProject} />}
          {/* Affiche le composant ProjectGemfiles dans le container correspondant lorsqu'un projet est sélectionné */}
          {container.id === 'index_gemfiles_container' &&  <ProjectGemfiles projectId={selectedProjectId} projectGemfileId={selectedProjectGemfileId} testtest={testtest} />}
        </div>
      ))}
      {/* Bouton pour réinitialiser grâce à la fonction resetContainers */}
      <button onClick={resetContainers}>Back</button>
    </div>
  );
}

// Export pour être rendu par app.jsx
export default Containers;
