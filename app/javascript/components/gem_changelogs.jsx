import React, { useState, useEffect } from 'react';

function GemChangelogs({selectedGemId}) {
  const [gem, setGem] = useState([])

  useEffect(() => {
    getGem();
  }, [selectedGemId]);

  const getGem = () => {
    const getInfosToDisplayUrl = `/api/v1/project_gems/${selectedGemId}`

    if (selectedGemId) {
      fetch(getInfosToDisplayUrl)
      .then((response) => response.json())
      .then((data) => {
        setGem(data);
      });
    }
  }


  return (
    <>
      <p>{gem.name} - {gem.id}</p>
    </>
  );
}

export default GemChangelogs;
