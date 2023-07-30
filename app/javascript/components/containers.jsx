import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    console.log(selectedProjectGemfileId);  // Ceci s'affichera chaque fois que selectedProjectGemfileId change
  }, [selectedProjectGemfileId]);

  // Mise à jour de la visibilité des containers quand User clique sur un projet
  const clickProject = (project) => {
    setContainers((prevContainers) => [
      { ...prevContainers[0], visible: true },
      { ...prevContainers[1], visible: true },
      { ...prevContainers[2], visible: false },
    ]);
    console.log(project);
    // Mise à jour des ID du Projet et du Gemfile lorsqu'ils sont sélectionnés
    setSelectedProjectId(project.id);
    console.log(selectedProjectId);
    console.log(project.id);
    fetch(`/api/v1/projects/${project.id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setSelectedProjectGemfileId(data.project_gemfile_id);
    });
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
          {container.id}
          {/* Affiche le composant Projects dans le container correspondant avec la fonction clickProject */}
          {container.id === 'index_projects_container' && <Projects clickProject={clickProject} />}
          {container.id === 'index_gemfiles_container' && selectedProjectId && selectedProjectGemfileId && (
            <ProjectGemfiles projectId={selectedProjectId} projectGemfileId={selectedProjectGemfileId} />
          )}
        </div>
      ))}
      {/* Bouton pour réinitialiser grâce à la fonction resetContainers */}
      <button onClick={resetContainers}>Back</button>
    </div>
  );
}

// Export pour être rendu par app.jsx
export default Containers;
