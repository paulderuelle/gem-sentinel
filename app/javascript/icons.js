import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const icons = {
  IconFileCode: <FontAwesomeIcon icon={['fas', 'file-code']} className='container-ico'/>,
  IconFolderOpen: <FontAwesomeIcon icon={['fas', 'folder-open']} className='card-ico folder-open' />,
  IconChartColumn: <FontAwesomeIcon icon={['fas', 'chart-column']} className='container-ico' />,
  IconGem: <FontAwesomeIcon icon={['fas', 'gem']} className= 'card-ico gem' />,
  IconCodeCommit: <FontAwesomeIcon icon={['fas', 'code-commit']} className='container-ico' />,
  IconCircleInfo: <FontAwesomeIcon icon={['fas', 'circle-info']} className= 'card-ico circle-info' />,
  IconArrowUpRightFromSquare: <FontAwesomeIcon icon={['fas', 'arrow-up-right-from-square']} className= '' />,
  IconCircleCheck: <FontAwesomeIcon icon={['fas', 'circle-check']} className='status-ico updated' />,
  IconWrench: <FontAwesomeIcon icon={['fas', 'wrench']} className='status-ico to-update' />,
  IconQuestion: <FontAwesomeIcon icon={['fas', 'question']} className= '' />,
  IconAnglesLeft: <FontAwesomeIcon icon={['fas', 'angles-left']} className= '' />,
};

export default icons;
