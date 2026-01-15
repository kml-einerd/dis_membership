// Imports externos primeiro
import React, { useState } from 'react';

// Imports de componentes locais
import Home from './Home';

// Interface para demonstração
interface AppProps {
  initialScreen?: 'home' | 'library' | 'course' | 'profile' | 'forum' | 'store';
}

// Componente principal com export default
export default function App({ initialScreen = 'home' }: AppProps) {
  const [currentScreen] = useState(initialScreen);

  return (
    <div className="min-h-screen bg-black">
      {/* Renderiza a tela principal - Home como showcase */}
      <Home />
    </div>
  );
}
