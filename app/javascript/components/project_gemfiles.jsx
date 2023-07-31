import React, { useState, useEffect } from 'react';
import icons from '../icons';
function ProjectGemfiles({ selectedProjectId, clickGem }) {
  const [gems, setGems] = useState([]);
  const [totalGems, setTotalGems] = useState(0);
  const [updatableGems, setUpdatableGems] = useState(0)
  useEffect(() => {
    getGems();
  }, [selectedProjectId]);
  const getGems = () => {
    const getGemsUrl = `/api/v1/projects/${selectedProjectId}`;
    if (selectedProjectId) {
      fetch(getGemsUrl)
      .then((response) => response.json())
      .then((data) => {
        setGems(data);
        setTotalGems(data.length);
        const updatableGemsCount = data.filter((gem) => gem.status === 'Updatable').length;
        setUpdatableGems(updatableGemsCount);
      });
    }
  };
  return (
    <>
      <p className='header-container'>{icons.IconChartColumn} Gems scan</p>
      <div className='gemfile-card'><i id='changelog-icon'>{icons.IconGem}</i>
        <div className='gemfile-text'>
          <h3>Used Gems:</h3>
          <p>{totalGems}</p>
          <h3>Updatable:</h3>
          <p>{updatableGems}</p>
        </div>
      </div>
      <ul>
        {gems.map((gem) => (
          <li key={gem.id} onClick={() => clickGem(gem.id)}>
            <div className='project-card project-infos gemlist'>{gem.name}{gem.status === 'Updatable' ? icons.IconWrench : icons.IconCircleCheck}</div>
          </li>
        ))}
      </ul>
      <div id="update-project-form-container">
        <form action={`/api/v1/projects/${selectedProjectId}`} method="post">
          <input type="hidden" name="_method" value="put" />
          <div className="field">
            <label htmlFor="project_gemfile[content]">Bundle list content:
              <textarea name="project_gemfile[content]" id="project_gemfile_content"></textarea>
            </label>
          </div>
          <div className="field">
            <input type="submit" value="Update"></input>
          </div>
        </form>
      </div>
    </>
  );
}
export default ProjectGemfiles;