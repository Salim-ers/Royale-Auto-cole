import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/yellowtail/400.css';
import './styles/global.css';
import App from './App.jsx';

const container = document.getElementById('root');
container.innerHTML = '';
createRoot(container).render(<App />);
requestAnimationFrame(() => document.documentElement.classList.add('app-ready'));
