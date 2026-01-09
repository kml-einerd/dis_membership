// Imports externos primeiro
import React, { useState } from 'react';

// Imports de componentes locais
import HomeV7 from './HomeV7';

// Interface para demonstração
interface AppProps {
  initialScreen?: 'home' | 'library' | 'course' | 'profile' | 'forum' | 'store';
}

// Componente principal com export default
export default function App({ initialScreen = 'home' }: AppProps) {
  const [currentScreen] = useState(initialScreen);

  return (
    <div className="min-h-screen bg-black">
      {/* Renderiza a tela principal - HomeV7 como showcase */}
      <HomeV7 />
    </div>
  );
}
