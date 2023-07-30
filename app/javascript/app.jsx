import React from 'react';
import { createRoot } from 'react-dom/client';
import Containers from './components/containers.jsx';
// import '@fortawesome/fontawesome-free/css/all.min.css';


const productContainer = document.getElementById('global-container');
const productRoot = createRoot(productContainer);

productRoot.render(<Containers />);
