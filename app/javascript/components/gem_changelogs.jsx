import React, { useState, useEffect } from 'react';

function GemChangelogs({selectedGemId}) {
  const [gem, setGem] = useState([])

  useEffect(() => {
    getGem();
  }, [selectedGemId]);

  const getGem = () => {
    const getInfosToDisplayUrl = `/project_gems/${selectedGemId}`

    fetch(getInfosToDisplayUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
  }


  return (
    <>
      <p>{selectedGemId}</p>
    </>
  );
}

export default GemChangelogs;
