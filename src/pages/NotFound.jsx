import React from 'react';
import RoadSign from '../components/RoadSign.jsx';
import { Button } from '../components/UI.jsx';

export default function NotFound() {
  return (
    <div className="page theme-nuit notfound">
      <div className="notfound-inner">
        <RoadSign id="sens-interdit" className="nf-sign" label="Panneau sens interdit" />
        <h1 className="display h-page">Cette route ne mène nulle part</h1>
        <p className="lead" style={{ color: 'var(--alu-2)' }}>La page demandée n’existe pas ou a changé d’adresse. Faisons demi-tour ensemble.</p>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <Button to="/">Retour à l’accueil</Button>
          <Button to="/contact" variant="ghost" signal={false}>Nous contacter</Button>
        </div>
      </div>
    </div>
  );
}
