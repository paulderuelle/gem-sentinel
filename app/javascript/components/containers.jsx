// import React from 'react'

// function MainContainer({ content }) {
//     return <div id="main-container">
//             {content}
//         </div>
// }

// export default MainContainer;

import React, { useState } from 'react';

function Containers() {
  const [containers, setContainers] = useState([
    { id: 'index_projects_container', border: '1px solid red', top: '10px', left: '10px' },
    { id: 'index_gemfiles_container', border: '1px solid blue', top: '50px', left: '50px' },
    { id: 'show_gem_container', border: '1px solid green', top: '100px', left: '100px' },
  ]);

  return (
    <div>
      {containers.map((container) => (
        <div
          key={container.id}
          id={container.id}
          style={{
            border: container.border,
            position: 'absolute',
            top: container.top,
            left: container.left,
          }}
        >
          {container.id}
        </div>
      ))}
    </div>
  );
}

export default Containers;
