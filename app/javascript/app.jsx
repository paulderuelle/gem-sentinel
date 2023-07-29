import React from 'react';
import { createRoot } from 'react-dom/client';
import Containers from './components/containers.jsx';

// Insertion sur le DOM et création de la racine pour un rendu avec createRoot
const productContainer = document.getElementById('main-container');
const productRoot = createRoot(productContainer);

// Rendu du composant Containers (précédemment importé)
productRoot.render(<Containers />);
