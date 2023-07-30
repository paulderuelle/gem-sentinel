import React from 'react';
import { createRoot } from 'react-dom/client';
import Containers from './components/containers.jsx';

const productContainer = document.getElementById('global-container');
const productRoot = createRoot(productContainer);
console.log('ok');
productRoot.render(<Containers />);
