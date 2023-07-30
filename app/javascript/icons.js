import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const icons = {
  IconCheck: <FontAwesomeIcon icon={['fas', 'check']} />,
  IconTimes: <FontAwesomeIcon icon={['fas', 'times']} />,
};

export default icons;
