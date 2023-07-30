import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const icons = {
  // projects-container icons
  IconFileCode: <FontAwesomeIcon icon={['fas', 'file-code']} color = 'white'/>,
  IconFolderOpen: <FontAwesomeIcon icon={['fas', 'folder-open']} color = '#D34231' />,
  // gemfiles-container icons
  IconChartColumn: <FontAwesomeIcon icon={['fas', 'chart-column']} color = 'white' />,
  IconGem: <FontAwesomeIcon icon={['fas', 'gem']} color = '#D34231' />,
  // changelogs-container icons
  IconCodeCommit: <FontAwesomeIcon icon={['fas', 'code-commit']} color = 'white' />,
  IconCircleInfo: <FontAwesomeIcon icon={['fas', 'circle-info']} color = '#D34231' />,
  IconArrowUpRightFromSquare: <FontAwesomeIcon icon={['fas', 'arrow-up-right-from-square']} color = '#D34231' />,
  // gem-status icons
  IconCircleCheck: <FontAwesomeIcon icon={['fas', 'circle-check']} color = '#377A27' />,
  IconWrench: <FontAwesomeIcon icon={['fas', 'wrench']} color = '#E78651' />,
  IconQuestion: <FontAwesomeIcon icon={['fas', 'question']} color = '#E78651' />,
  // back icon
  IconAnglesLeft: <FontAwesomeIcon icon={['fas', 'angles-left']} color = '#D34231' />,
};

export default icons;
