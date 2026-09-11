import React from 'react';
import css from './styles/global.css';
import App from './App.jsx';

/* Aperçu autonome (un seul fichier) : polices chargées depuis Google Fonts. */
const FONTS = "@import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Yellowtail&display=swap');";

if (typeof document !== 'undefined') document.documentElement.classList.add('js');

export default function RoyalePreview() {
  return (
    <>
      <style>{FONTS + css}</style>
      <App />
    </>
  );
}
