import React, { useState } from 'react';

function Containers() {
  const initialState = [
    { id: 'index_projects_container', border: '1px solid red', top: '50px', left: '10px', visible: true },
    { id: 'index_gemfiles_container', border: '1px solid blue', top: '50px', left: '300px', visible: false },
    { id: 'show_gem_container', border: '1px solid green', top: '50px', left: '600px', visible: false },
  ];

  const [containers, setContainers] = useState(initialState);

  const clickForward = (index) => {
    setContainers((prevContainers) =>
      prevContainers.map((container, i) => ({
        ...container,
        visible: i === index || i === index - 1,
        left: i === index - 1 ? '10px' : i === index ? '300px' : container.left,
      }))
    );
  };

  const resetContainers = () => {
    setContainers(initialState);
  };

  return (
    <div>
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
          {index < containers.length - 1 && (
            <button onClick={() => clickForward(index + 1)}>Display next</button>
          )}
        </div>
      ))}
      <button onClick={resetContainers}>Back</button>
    </div>
  );
}

export default Containers;
