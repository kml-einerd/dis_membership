# 📋 Estrutura Otimizada para Figma Vibe Code

Este projeto foi completamente reorganizado e otimizado para o modo de desenvolvimento do Figma com IA vibe code.

## 📂 Estrutura de Diretórios

```
/src/
├── app/
│   ├── App.tsx                 # Componente principal (entry point)
│   ├── HomeV7.tsx             # Tela principal (showcase)
│   ├── LibraryV4.tsx          # Biblioteca de cursos
│   ├── CourseDetailV2.tsx     # Detalhes do curso
│   ├── ProfileV3.tsx          # Perfil do usuário
│   ├── ExtensionsV7.tsx       # Loja de extensões
│   ├── VideoLesson.tsx        # Player de vídeo
│   ├── ArticleReader.tsx      # Leitor de artigos
│   ├── ForumScreen.tsx        # Fórum da comunidade
│   ├── OnboardingV2.tsx       # Onboarding
│   ├── Settings.tsx           # Configurações
│   ├── EditProfile.tsx        # Editar perfil
│   ├── MinimalArticleReader.tsx
│   ├── LockedContentPreview.tsx
│   ├── SalesVideoScreen.tsx
│   ├── SalesArticleScreen.tsx
│   ├── LandingPage.tsx
│   │
│   ├── components/            # Componentes reutilizáveis
│   │   ├── design-system/    # Sistema de design (14 componentes)
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── ChipTabs.tsx
│   │   │   ├── Progress.tsx
│   │   │   ├── GlassSurface.tsx
│   │   │   ├── ContentCard.tsx
│   │   │   ├── ConversionCards.tsx
│   │   │   ├── ExtensionCardV2.tsx
│   │   │   ├── HeroCarousel.tsx
│   │   │   ├── NetflixCarousel.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── SidebarWidget.tsx
│   │   │   ├── IconButton.tsx
│   │   │   ├── ResumeBar.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── community/        # Componentes de comunidade (12 componentes)
│   │   │   ├── AnswerCard.tsx
│   │   │   ├── CommentCard.tsx
│   │   │   ├── CommentForm.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── QuestionForm.tsx
│   │   │   ├── QuestionGroupCard.tsx
│   │   │   ├── ReactionBar.tsx
│   │   │   ├── StarRating.tsx
│   │   │   ├── LessonInteractionBlock.tsx
│   │   │   ├── LessonInteractionBlockV2.tsx
│   │   │   ├── MediaAttachment.tsx
│   │   │   ├── ContentOriginBadge.tsx
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── banners/          # Banners promocionais
│   │   │   └── WhatsAppBannerV2.tsx
│   │   │
│   │   ├── layout/           # Componentes de layout
│   │   │   └── VeloxLayout.tsx
│   │   │
│   │   ├── figma/            # Componentes específicos do Figma
│   │   │   └── ImageWithFallback.tsx
│   │   │
│   │   └── [28 componentes específicos de features]
│   │       ├── ArticleHero.tsx
│   │       ├── VideoPlayer.tsx
│   │       ├── TableOfContents.tsx
│   │       ├── MarkdownContent.tsx
│   │       └── ... (e muitos outros)
│   │
│   └── utils/                # Utilitários
│       ├── cn.ts            # Função de merge de classes (Tailwind)
│       └── mockCommunityData.ts  # Dados mockados
│
└── styles/                   # Estilos globais
    ├── index.css            # Entry point de estilos
    ├── fonts.css            # Importação de fontes
    ├── tailwind.css         # Configuração Tailwind
    └── theme.css            # Tema customizado
```

## ✅ Padrões Implementados

### 1. Formato dos Arquivos .tsx

Todos os componentes seguem o padrão:

```tsx
// Imports externos primeiro
import React, { useState } from 'react';
import { Icon } from 'lucide-react';

// Imports de componentes locais
import { MyComponent } from './components/MyComponent';

// Imports de utils
import { cn } from '../utils/cn';

// Interfaces/Types
interface ComponentProps {
  id: string;
  title: string;
}

// Componente principal com export default
export default function ComponentName({ id, title }: ComponentProps) {
  const [state, setState] = useState([]);

  return (
    <div className="p-4">
      {/* Tailwind CSS inline */}
    </div>
  );
}
```

### 2. Características Principais

✅ **TypeScript**: Todos os componentes usam TypeScript com interfaces bem definidas
✅ **Tailwind CSS**: Classes inline sem CSS customizado desnecessário
✅ **Export Default**: Componentes principais têm export default
✅ **Standalone**: Sem dependências de navegação/contexto externo
✅ **Componentização**: Componentes pequenos e reutilizáveis
✅ **Imports Organizados**: Ordem consistente (externos → locais → utils → types)

### 3. Remoções Feitas

❌ NavigationContext (movido para /excluir)
❌ Hooks personalizados (movido para /excluir)
❌ Arquivos de configuração (movido para /excluir)
❌ main.tsx (não necessário para Figma)
❌ Dependências de roteamento

### 4. Navegação Simulada

Todos os botões de navegação usam `console.log` para simular ações:

```tsx
onClick={() => console.log('Navigate to: home')}
```

## 🎯 Como Usar no Figma

1. O componente principal é `/src/app/App.tsx`
2. Por padrão, renderiza `HomeV7` como showcase
3. Todos os componentes são standalone e podem ser renderizados individualmente
4. Sem necessidade de setup de contextos ou provedores

## 📦 Componentes Disponíveis

- **14 componentes** no design-system
- **12 componentes** de comunidade
- **17 telas/páginas** completas
- **28 componentes** específicos de features
- **4 componentes** de layout/banners

**Total: 79 arquivos TypeScript/TSX**

## 🎨 Design System

Todos os componentes do design system estão em:
`/src/app/components/design-system/`

E podem ser importados via:
```tsx
import { Button, Badge, ChipTabs } from '../components/design-system';
```

## 🚀 Pronto para Figma Vibe Code!

Esta estrutura está 100% otimizada para o modo de desenvolvimento do Figma com IA vibe code, seguindo todas as recomendações de organização, formato de código e boas práticas.
