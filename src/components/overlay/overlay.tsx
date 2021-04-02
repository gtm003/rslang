import React from 'react';

interface OverlayProps {
  isMenuOpen: boolean
}

const Overlay: React.FC<OverlayProps> = ({ isMenuOpen }) => {
  const clazz =  isMenuOpen ? 'overlay--show' : '';

  return <div className={`overlay ${clazz}`}></div>
}

export { Overlay };