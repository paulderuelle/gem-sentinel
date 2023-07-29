import React from 'react';
import { createRoot } from 'react-dom/client';
import Containers from './components/containers.jsx';

// Render un component
const productContainer = document.getElementById('main-container');
const productRoot = createRoot(productContainer);

productRoot.render(<Containers />);
