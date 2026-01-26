# 🗺️ Mapa Completo de Navegação - Premium Membership App

**Data:** 2026-01-15
**Versão:** 1.0
**Status:** Análise Completa de 14 Telas + 100+ Elementos Navegáveis

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura de Navegação](#arquitetura-de-navegação)
3. [Mapeamento por Tela](#mapeamento-por-tela)
4. [Problemas Críticos](#problemas-críticos)
5. [Caminhos Duplicados (Demo)](#caminhos-duplicados-demo)
6. [Recomendações](#recomendações)

---

## 🎯 Visão Geral

### Status Atual vs Desejado

| Categoria | Status Atual | Desejado |
|-----------|--------------|----------|
| **Navegação Principal** | ✅ Funcional (Home, Library, Forum, Extensions, Profile) | ✅ OK |
| **Navegação Secundária** | ⚠️ Parcialmente implementada (50%) | 🔧 Implementar 100% |
| **Back Buttons** | ❌ Console.log apenas (8 telas) | 🔧 Navegação funcional |
| **CTAs de Venda** | ❌ Não implementados | 🔧 Checkout/modal |
| **Modais e Forms** | ✅ Funcionais (Forum) | ✅ OK |
| **Settings/Config** | ❌ Console.log apenas | 🔧 Funcionalidade real |

### Estatísticas

- **Total de telas:** 14+
- **Elementos navegáveis mapeados:** 100+
- **Navegações funcionais:** ~40%
- **Navegações com console.log:** ~45%
- **Navegações não implementadas:** ~15%

---

## 🏗️ Arquitetura de Navegação

### Hierarquia de Telas

```
┌─────────────────────────────────────────────────────────┐
│                      APP ROOT                            │
│              (Context: useNavigation)                    │
└──────────────────────────────┬──────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
    ┌───▼────┐          ┌─────▼─────┐         ┌─────▼─────┐
    │  HOME  │          │  LIBRARY  │         │  PROFILE  │
    └───┬────┘          └─────┬─────┘         └─────┬─────┘
        │                     │                      │
  ┌─────┼─────┐         ┌─────┼─────┐         ┌─────┼─────┐
  │     │     │         │     │     │         │     │     │
FORUM EXTEN. LANDING  COURSE VIDEO ART.  SETTINGS EDIT-
                       DETAIL LESSON READER         PROFILE
                         │      │     │
                         └──────┴─────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
              LOCKED CONTENT    ONBOARDING
               PREVIEW
```

### Fluxos Principais

#### 🎯 Fluxo 1: Descoberta de Conteúdo
```
HOME → Visualizar Cards → Clicar Card
  ↓
Se LOCKED → Extensions (Upsell)
Se UNLOCKED → Course Detail
  ↓
Course Detail → Selecionar Aula
  ↓
Video Lesson OU Article Reader
  ↓
Forum (via botão comentários)
```

#### 📚 Fluxo 2: Biblioteca Estruturada
```
LIBRARY → Buscar/Filtrar Cursos
  ↓
Expandir Módulo → Lista de Aulas
  ↓
Clicar Aula → Video/Article/Locked
```

#### 🛍️ Fluxo 3: Conversão/Vendas
```
HOME/Library → Ver Premium Badge
  ↓
Extensions → Ver Combos/Upsells
  ↓
Sales Video OU Sales Article
  ↓
Checkout (NÃO IMPLEMENTADO)
```

#### 👤 Fluxo 4: Perfil e Configurações
```
PROFILE → Ver Estatísticas/Conquistas
  ↓
Editar Perfil OU Configurações
  ↓
Settings → Ajustes Diversos
  ↓
Logout (Console.log apenas)
```

---

## 📱 Mapeamento por Tela

### 1. HOME.TSX

**Rota:** `/` ou `'home'`
**Status:** ✅ Funcional (90%)

#### Elementos Navegáveis

| Elemento | Ação | Destino Atual | Destino Ideal | Status |
|----------|------|---------------|---------------|--------|
| **Logo Velox** (Desktop/Mobile) | Click | `'home'` | `'home'` | ✅ |
| **Nav Tab: Home** | Click | `'home'` | `'home'` | ✅ |
| **Nav Tab: Biblioteca** | Click | `'library'` | `'library'` | ✅ |
| **Nav Tab: Fórum** | Click | `'forum'` | `'forum'` | ✅ |
| **Nav Tab: Extensões** | Click | `'store'` | `'extensions'` | ⚠️ |
| **Ícone Perfil** | Click | `'profile'` | `'profile'` | ✅ |
| **Ícone Bell** | Click | - | Modal de notificações | ❌ |
| **Search Input** | Type | - | Search results | ❌ |
| **Bottom Nav: Home** | Click | `'home'` | `'home'` | ✅ |
| **Bottom Nav: Cursos** | Click | `'library'` | `'library'` | ✅ |
| **Bottom Nav: Comunidade** | Click | `'forum'` | `'forum'` | ✅ |
| **Bottom Nav: Upgrade** | Click | `'store'` | `'extensions'` | ⚠️ |
| **Bottom Nav: Perfil** | Click | `'profile'` | `'profile'` | ✅ |
| **Hero: Continue Watching** | Click | `'video'` | `'video'` (c/ lesson data) | ⚠️ |
| **Content Card (Normal)** | Click | `'course'` | `'course'` (c/ course ID) | ⚠️ |
| **Content Card (Locked)** | Click | `'extensions'` | `'extensions'` (c/ item ID) | ⚠️ |
| **Content Card (Extension)** | Click | `'store'` | `'extensions'` (c/ extension ID) | ⚠️ |
| **WhatsApp Banner CTA** | Click | `window.open(whatsapp)` | WhatsApp externo | ✅ |
| **Floating WhatsApp Button** | Click | `window.open(whatsapp)` | WhatsApp externo | ✅ |
| **Carousel: Scroll Left** | Click | Scroll behavior | Scroll behavior | ✅ |
| **Carousel: Scroll Right** | Click | Scroll behavior | Scroll behavior | ✅ |

#### Problemas Identificados

🔴 **CRÍTICO:**
- Cards não passam dados específicos (course ID, lesson ID, etc.) na navegação
- Destino `'store'` inconsistente (deveria ser `'extensions'`)

⚠️ **IMPORTANTE:**
- Search não implementado
- Notificações não implementadas

✅ **FUNCIONAL:**
- Navegação principal
- Carrosséis de conteúdo
- WhatsApp integration

---

### 2. LIBRARY.TSX

**Rota:** `'library'`
**Status:** ⚠️ Funcional (70%)

#### Elementos Navegáveis

| Elemento | Ação | Destino Atual | Destino Ideal | Status |
|----------|------|---------------|---------------|--------|
| **Search Input (Cmd+K)** | Type | Filter local | Filter local + sugestões | ⚠️ |
| **Clear Search (X)** | Click | Clear input | Clear input | ✅ |
| **View Mode: List** | Click | `setViewMode('list')` | `setViewMode('list')` | ✅ |
| **View Mode: Grid** | Click | `setViewMode('grid')` | `setViewMode('grid')` | ✅ |
| **View Mode: Compact** | Click | `setViewMode('compact')` | `setViewMode('compact')` | ✅ |
| **Filter: Todos** | Click | Filter state | Filter state | ✅ |
| **Filter: Em Progresso** | Click | Filter state | Filter state | ✅ |
| **Filter: Concluídos** | Click | Filter state | Filter state | ✅ |
| **Filter: Premium** | Click | Filter state | Filter state | ✅ |
| **Course Header (Expand)** | Click | Toggle expand | Toggle expand | ✅ |
| **Module Accordion** | Click | Toggle expand | Toggle expand | ✅ |
| **Lesson Row (Video)** | Click | `console.log` | `'video'` (c/ lesson data) | ❌ |
| **Lesson Row (Article)** | Click | `console.log` | `'article'` (c/ article data) | ❌ |
| **Lesson Row (Locked)** | Click | `console.log` | `'extensions'` (c/ pricing) | ❌ |
| **Module Card (Grid - Locked)** | Click | `console.log` | `'extensions'` | ❌ |
| **Module Card (Grid - Unlocked)** | Click | Toggle expand | Expand module accordion | ⚠️ |
| **Extension Promo Card** | Click | `console.log` | `'extensions'` (c/ extension ID) | ❌ |
| **Premium Upsell CTA** | Click | `console.log` | `'extensions'` | ❌ |

#### Problemas Identificados

🔴 **CRÍTICO:**
- **TODAS as lesson rows fazem apenas `console.log`** - navegação não funciona!
- Extension promo cards não navegam
- Premium upsell CTA não navega

⚠️ **IMPORTANTE:**
- Search é apenas filtro local (sem persistência)
- Module cards em grid não navegam adequadamente

✅ **FUNCIONAL:**
- View modes (list/grid/compact)
- Filters e accordion toggles
- Search local

#### Como Deveria Funcionar

```typescript
const handleLessonClick = (lesson: Lesson) => {
  if (lesson.locked) {
    navigate('extensions', { preselect: lesson.unlockBundle });
  } else if (lesson.type === 'video') {
    navigate('video', { lessonId: lesson.id, courseId: lesson.courseId });
  } else if (lesson.type === 'article') {
    navigate('article', { articleId: lesson.id, courseId: lesson.courseId });
  }
};
```

---

### 3. PROFILE.TSX

**Rota:** `'profile'`
**Status:** ⚠️ Funcional (60%)

#### Elementos Navegáveis

| Elemento | Ação | Destino Atual | Destino Ideal | Status |
|----------|------|---------------|---------------|--------|
| **Edit Button (Avatar)** | Click | `console.log` | `'edit-profile'` | ❌ |
| **Menu: Editar Perfil** | Click | `console.log` | `'edit-profile'` | ❌ |
| **Menu: Assinatura** | Click | `console.log` | `'extensions'` (subscription tab) | ❌ |
| **Menu: Configurações** | Click | `console.log` | `'settings'` | ❌ |
| **Logout Button** | Click | `console.log` | Logout + `'home'` | ❌ |
| **Stats Cards** | Click | - | - (não clicável) | ✅ |
| **Achievement Badges** | Click | - | Modal c/ achievement details | ❌ |

#### Problemas Identificados

🔴 **CRÍTICO:**
- **TODA navegação está como `console.log`** - nada funciona!
- Logout não funciona

⚠️ **IMPORTANTE:**
- Achievement badges não têm interação

#### Como Deveria Funcionar

```typescript
const menuItems = [
  {
    route: 'edit-profile',
    icon: Edit3,
    label: 'Editar Perfil',
    onClick: () => navigate('edit-profile')
  },
  {
    route: 'extensions',
    icon: CreditCard,
    label: 'Assinatura',
    onClick: () => navigate('extensions', { tab: 'subscription' })
  },
  {
    route: 'settings',
    icon: Settings,
    label: 'Configurações',
    onClick: () => navigate('settings')
  },
];

const handleLogout = () => {
  // Limpar sessão, storage, etc.
  localStorage.clear();
  sessionStorage.clear();
  navigate('home');
};
```

---

### 4. EXTENSIONS.TSX

**Rota:** `'extensions'` ou `'store'`
**Status:** ✅ Funcional (85%)

#### Elementos Navegáveis

| Elemento | Ação | Destino Atual | Destino Ideal | Status |
|----------|------|---------------|---------------|--------|
| **Hero Banner CTA** | Click | `'sales-video'` | `'sales-video'` (c/ bundle data) | ⚠️ |
| **Combo Item Card** | Click | Toggle selection | Toggle selection | ✅ |
| **Extension Card (Unlocked)** | Click | - | Modal c/ extension details | ❌ |
| **Extension Card (Locked)** | Click | `'sales-video'` | `'sales-video'` (c/ extension ID) | ⚠️ |
| **Add to Combo Button** | Click | `'sales-video'` | `'sales-video'` (c/ combo data) | ⚠️ |
| **Testimonial Cards** | - | - (não clicável) | - | ✅ |
| **Social Proof Counter** | - | - (não clicável) | - | ✅ |

#### Problemas Identificados

⚠️ **IMPORTANTE:**
- Navegações não passam dados completos (bundle ID, extension ID, combo data)
- Extension cards unlocked não têm interação

✅ **FUNCIONAL:**
- Navegação para sales video
- Combo item toggles
- Social proof display

---

### 5. FORUMSCREEN.TSX

**Rota:** `'forum'`
**Status:** ✅ Funcional (80%)

#### Elementos Navegáveis

| Elemento | Ação | Destino Atual | Destino Ideal | Status |
|----------|------|---------------|---------------|--------|
| **Add Button (+)** | Click | Toggle menu | Toggle menu | ✅ |
| **Popover: Fazer Pergunta** | Click | Open modal | Open modal | ✅ |
| **Popover: Adicionar Comentário** | Click | Open modal | Open modal | ✅ |
| **Tab: Perguntas** | Click | Switch tab | Switch tab | ✅ |
| **Tab: Comentários** | Click | Switch tab | Switch tab | ✅ |
| **Sort: Recentes** | Click | Sort state | Sort state | ✅ |
| **Sort: Populares** | Click | Sort state | Sort state | ✅ |
| **Sort: Úteis** | Click | Sort state | Sort state | ✅ |
| **Question Group Header** | Click | Toggle expand | Toggle expand | ✅ |
| **Question Card: Ver Mais** | Click | - | Expand full text | ❌ |
| **Similar Questions Link** | Click | - | Navigate to question | ❌ |
| **Ir para a Aula** | Click | - | `'video'` (c/ lesson ID) | ❌ |
| **Reaction Buttons** | Click | `console.log` | Update reaction state | ❌ |
| **Comment Form: Submit** | Submit | Handle submit | Post comment + update UI | ⚠️ |
| **Question Form: Submit** | Submit | Handle submit | Post question + update UI | ⚠️ |
| **Modal Close (X)** | Click | Close modal | Close modal | ✅ |

#### Problemas Identificados

⚠️ **IMPORTANTE:**
- Similar questions links não implementados
- "Ir para a aula" não implementado
- Reactions apenas fazem `console.log`
- Forms não têm API real (mock data)

✅ **FUNCIONAL:**
- Tab switching e sorting
- Modal management
- Question/Comment forms (UI)
- Accordion toggles

---

### 6. COURSEDETAIL.TSX

**Rota:** `'course'`
**Status:** ⚠️ Funcional (50%)

#### Elementos Navegáveis

| Elemento | Ação | Destino Atual | Destino Ideal | Status |
|----------|------|---------------|---------------|--------|
| **Back Button** | Click | `console.log` | `'library'` (preservar state) | ❌ |
| **Module Tabs** | Click | Switch module | Switch module | ✅ |
| **Search Input** | Type | Filter lessons | Filter lessons | ✅ |
| **Lesson Row (Video)** | Click | `'video-lesson'` | `'video'` (c/ lesson data) | ⚠️ |
| **Lesson Row (Article)** | Click | `'article-reader'` | `'article'` (c/ article data) | ⚠️ |
| **Lesson Row (Locked)** | Click | `'locked-preview'` | `'extensions'` (c/ pricing) | ⚠️ |
| **Continue Card (Sidebar)** | Click | `'video-lesson'` | `'video'` (c/ next lesson) | ⚠️ |
| **Premium Unlock Banner** | Click | `console.log` | `'extensions'` (c/ course ID) | ❌ |

#### Problemas Identificados

🔴 **CRÍTICO:**
- Back button não funciona
- Premium unlock CTA não funciona

⚠️ **IMPORTANTE:**
- Rotas inconsistentes (`'video-lesson'` vs `'video'`)
- Lesson data não está sendo passada corretamente

✅ **FUNCIONAL:**
- Module tabs
- Search/filter local
- Lesson list display

#### Rotas Ideais

```typescript
// Padronizar rotas
'video-lesson' → 'video'
'article-reader' → 'article'
'locked-preview' → 'extensions'
```

---

### 7. VIDEOLESSON.TSX

**Rota:** `'video'` (atualmente `'video-lesson'`)
**Status:** ⚠️ Funcional (60%)

#### Elementos Navegáveis

| Elemento | Ação | Destino Atual | Destino Ideal | Status |
|----------|------|---------------|---------------|--------|
| **Back Button** | Click | `console.log` | `'course'` (c/ course ID) | ❌ |
| **Lesson Item (Sidebar)** | Click | ? | `'video'` (c/ lesson ID) | ❌ |
| **Module Chip Tabs** | Click | Switch module | Switch module | ✅ |
| **Player Controls** | Interact | Video player | Video player | ✅ |
| **Comment Form: Submit** | Submit | `console.log` | Post comment | ❌ |
| **Question Form: Submit** | Submit | `console.log` | Post question | ❌ |
| **Navigate to Forum** | Click | `console.log` | `'forum'` (c/ lesson context) | ❌ |

#### Problemas Identificados

🔴 **CRÍTICO:**
- Back button não funciona
- Lesson navigation não clara
- Forum navigation não implementada

⚠️ **IMPORTANTE:**
- Forms não têm backend real

✅ **FUNCIONAL:**
- Video player
- Module tabs
- UI de comentários/questões

---

### 8. ARTICLEREADER.TSX

**Rota:** `'article'` (atualmente `'article-reader'`)
**Status:** ⚠️ Funcional (65%)

#### Elementos Navegáveis

| Elemento | Ação | Destino Atual | Destino Ideal | Status |
|----------|------|---------------|---------------|--------|
| **Back Button** | Click | `console.log` | `'course'` (c/ course ID) | ❌ |
| **Table of Contents Links** | Click | Smooth scroll | Smooth scroll | ✅ |
| **Related Content Items** | Click | - | Navigate to content | ❌ |
| **Comment Form: Submit** | Submit | `console.log` | Post comment | ❌ |
| **Question Form: Submit** | Submit | `console.log` | Post question | ❌ |
| **Navigate to Forum** | Click | `console.log` | `'forum'` (c/ article context) | ❌ |

#### Problemas Identificados

🔴 **CRÍTICO:**
- Back button não funciona
- Forum navigation não implementada

⚠️ **IMPORTANTE:**
- Related content não clicável
- Forms sem backend

✅ **FUNCIONAL:**
- Table of contents navigation
- Reading progress bar
- Markdown rendering

---

### 9. SETTINGS.TSX

**Rota:** `'settings'`
**Status:** ❌ Funcional (30%)

#### Elementos Navegáveis

| Elemento | Ação | Destino Atual | Destino Ideal | Status |
|----------|------|---------------|---------------|--------|
| **Back Button** | Click | `console.log` | `'profile'` | ❌ |
| **Assinatura e Compras** | Click | `'store'` | `'extensions'` (subscription tab) | ⚠️ |
| **Dados da Conta** | Click | `'edit-profile'` | `'edit-profile'` | ✅ |
| **Sair da Conta** | Click | Open dialog | Open dialog → Logout | ⚠️ |
| **Qualidade Padrão** | Click | `console.log` | Open selector modal | ❌ |
| **Velocidade Padrão** | Click | `console.log` | Open selector modal | ❌ |
| **Tema do Sistema** | Click | `console.log` | Open theme picker | ❌ |
| **Tamanho da Fonte** | Click | `console.log` | Open font size picker | ❌ |
| **Central de Ajuda** | Click | `console.log` | Open help/FAQ | ❌ |
| **Termos e Privacidade** | Click | `console.log` | Open legal docs | ❌ |
| **Toggle: Autoplay** | Toggle | State change | State change | ✅ |
| **Toggle: Downloads (WiFi)** | Toggle | State change | State change | ✅ |
| **Toggle: Notificações Push** | Toggle | State change | State change | ✅ |
| **Toggle: Notificações Email** | Toggle | State change | State change | ✅ |
| **Dialog: Encerrar Sessão** | Click | `console.log` | Logout + `'home'` | ❌ |
| **Dialog: Voltar** | Click | Close dialog | Close dialog | ✅ |

#### Problemas Identificados

🔴 **CRÍTICO:**
- **6 seletores de configuração não implementados** (apenas console.log)
- Back button não funciona
- Logout não funciona

⚠️ **IMPORTANTE:**
- Rota inconsistente (`'store'` deveria ser `'extensions'`)

✅ **FUNCIONAL:**
- Toggles de preferências
- Dialog de confirmação
- Navegação para edit-profile

---

### 10. EDITPROFILE.TSX

**Rota:** `'edit-profile'`
**Status:** ⚠️ Funcional (55%)

#### Elementos Navegáveis

| Elemento | Ação | Destino Atual | Destino Ideal | Status |
|----------|------|---------------|---------------|--------|
| **Back Button** | Click | `console.log` (c/ unsaved check) | `'profile'` (c/ unsaved dialog) | ❌ |
| **Avatar Upload Button** | Click | - | Open file picker | ❌ |
| **Change Photo Link** | Click | - | Open file picker | ❌ |
| **Name Input** | Type | State change | State change | ✅ |
| **Username Input** | Type | State change | State change | ✅ |
| **Phone Input** | Type | State change | State change | ✅ |
| **Bio Textarea** | Type | State change | State change | ✅ |
| **Preference Chips** | Click | Toggle state | Toggle state | ✅ |
| **Save Button** | Click | `console.log` + reset | Save data + `'profile'` | ❌ |
| **Dialog: Descartar** | Click | `console.log` | `'profile'` (sem salvar) | ❌ |
| **Dialog: Cancelar** | Click | Close dialog | Close dialog | ✅ |

#### Problemas Identificados

🔴 **CRÍTICO:**
- Back navigation não funciona
- Save não persiste dados
- Discard não navega

⚠️ **IMPORTANTE:**
- Avatar upload não implementado

✅ **FUNCIONAL:**
- Form inputs
- Unsaved changes detection
- Preference toggles

---

### 11. ONBOARDING.TSX

**Rota:** `'onboarding'`
**Status:** ⚠️ Funcional (70%)

#### Elementos Navegáveis

| Elemento | Ação | Destino Atual | Destino Ideal | Status |
|----------|------|---------------|---------------|--------|
| **Skip Button** | Click | `console.log` | `'home'` | ❌ |
| **Answer Options** | Click | Select answer | Select answer | ✅ |
| **Next Button (1-2)** | Click | Next question | Next question | ✅ |
| **Next Button (Final)** | Click | `console.log` | `'home'` (c/ preferences saved) | ❌ |

#### Problemas Identificados

⚠️ **IMPORTANTE:**
- Skip e Final navigation via console.log
- Preferences não são salvas

✅ **FUNCIONAL:**
- Question progression
- Answer selection
- Progress tracking

---

### 12. LANDINGPAGE.TSX

**Rota:** `'landing'` (não conectado ao nav principal)
**Status:** ⚠️ Funcional (40%)

#### Elementos Navegáveis

| Elemento | Ação | Destino Atual | Destino Ideal | Status |
|----------|------|---------------|---------------|--------|
| **Header: Começar Agora** | Click | - | `'sales-video'` ou signup | ❌ |
| **Hero: Começar Agora** | Click | - | `'sales-video'` ou signup | ❌ |
| **Assistir Demo** | Click | Open modal (não implementado) | Video modal | ❌ |
| **FAQ Items** | Click | Toggle expand | Toggle expand | ✅ |
| **Footer Links** | Click | - | Navigate to pages | ❌ |

#### Problemas Identificados

🔴 **CRÍTICO:**
- **CTAs principais não implementados**
- Video modal não implementado

⚠️ **IMPORTANTE:**
- Tela isolada (não conectada ao fluxo principal)

✅ **FUNCIONAL:**
- FAQ accordion
- Responsive design

---

### 13. SALESARTICLESCREEN.TSX

**Rota:** `'sales-article'` (não conectado ao nav principal)
**Status:** ❌ Funcional (20%)

#### Elementos Navegáveis

| Elemento | Ação | Destino Atual | Destino Ideal | Status |
|----------|------|---------------|---------------|--------|
| **Back Button** | Click | - | Previous screen | ❌ |
| **Sticky Purchase CTA** | Click | - | Checkout modal/page | ❌ |
| **FAQ Items** | - | - | - | ❌ |

#### Problemas Identificados

🔴 **CRÍTICO:**
- **Componente não tem navegação implementada**
- CTA de compra não funcional

---

### 14. SALESVIDEOSCREEN.TSX

**Rota:** `'sales-video'`
**Status:** ❌ Funcional (25%)

#### Elementos Navegáveis

| Elemento | Ação | Destino Atual | Destino Ideal | Status |
|----------|------|---------------|---------------|--------|
| **Back Button** | Click | - | Previous screen | ❌ |
| **Video Player** | Play | Video playback | Video playback | ⚠️ |
| **FAQ Items** | Click | Toggle expand | Toggle expand | ✅ |
| **Sticky Purchase CTA** | Click | - | Checkout modal/page | ❌ |

#### Problemas Identificados

🔴 **CRÍTICO:**
- Back button não implementado
- CTA de compra não funcional

⚠️ **IMPORTANTE:**
- Video player status incerto

✅ **FUNCIONAL:**
- FAQ accordion

---

## 🚨 Problemas Críticos

### 🔴 Navegações Quebradas (Console.log)

**Total:** 35+ navegações não funcionais

#### Por Tela:

| Tela | Navegações Quebradas | Prioridade |
|------|---------------------|------------|
| **Library** | 5 (lesson rows, promo cards, upsell) | 🔴 ALTA |
| **Profile** | 5 (todas as navegações) | 🔴 ALTA |
| **CourseDetail** | 2 (back, premium CTA) | 🔴 ALTA |
| **VideoLesson** | 4 (back, lesson nav, forum, forms) | 🔴 ALTA |
| **ArticleReader** | 4 (back, related, forum, forms) | 🔴 ALTA |
| **Settings** | 8 (back + 6 selectors + logout) | 🟡 MÉDIA |
| **EditProfile** | 4 (back, save, discard, upload) | 🟡 MÉDIA |
| **Onboarding** | 2 (skip, final) | 🟡 MÉDIA |
| **SalesArticle** | 2 (back, CTA) | 🟡 MÉDIA |
| **SalesVideo** | 2 (back, CTA) | 🟡 MÉDIA |

### ❌ Funcionalidades Não Implementadas

1. **Checkout Flow** - Sales screens não têm processo de compra
2. **Avatar Upload** - EditProfile sem upload de foto
3. **Search Global** - Home search não funciona
4. **Notifications** - Bell icon sem funcionalidade
5. **Video Modal** - Landing page sem demo modal
6. **Help/FAQ** - Settings links não funcionam
7. **Theme Picker** - Settings sem picker de tema
8. **Font Size** - Settings sem ajuste de fonte

### ⚠️ Inconsistências de Rotas

| Uso Atual | Deveria Ser | Ocorrências |
|-----------|-------------|-------------|
| `'store'` | `'extensions'` | 8+ |
| `'video-lesson'` | `'video'` | 5+ |
| `'article-reader'` | `'article'` | 3+ |
| `'locked-preview'` | `'extensions'` (c/ context) | 2+ |

---

## 🔄 Caminhos Duplicados (Demo)

> Múltiplos pontos levam ao mesmo destino - necessário para demonstração de fluxos

### Para `'extensions'` (Upsell/Store)

**8 caminhos diferentes:**

1. Home → Bottom Nav "Upgrade" → `'extensions'`
2. Home → Top Nav "Extensões" → `'extensions'`
3. Home → Locked Content Card → `'extensions'`
4. Library → Extension Promo Card → `'extensions'`
5. Library → Premium Upsell CTA → `'extensions'`
6. Library → Locked Lesson → `'extensions'`
7. Profile → Menu "Assinatura" → `'extensions'`
8. Settings → "Assinatura e Compras" → `'extensions'`

**Como diferenciar (recomendado):**

```typescript
// Passar contexto na navegação
navigate('extensions', {
  source: 'locked-content',
  itemId: 'course-123',
  preselect: 'bundle-premium'
});

navigate('extensions', {
  source: 'subscription',
  tab: 'manage-subscription'
});
```

### Para `'video'` (Video Player)

**4 caminhos diferentes:**

1. Home → Continue Watching → `'video'`
2. Home → Content Card → Course Detail → Lesson → `'video'`
3. Library → Lesson Row → `'video'`
4. Course Detail → Lesson Row → `'video'`

**Como diferenciar:**

```typescript
navigate('video', {
  lessonId: 'lesson-456',
  courseId: 'course-123',
  continueFrom: 325, // segundos
  autoplay: true
});
```

### Para `'course'` (Course Detail)

**2 caminhos principais:**

1. Home → Content Card → `'course'`
2. Library → Course Header/Module → `'course'`

**Como diferenciar:**

```typescript
navigate('course', {
  courseId: 'course-123',
  source: 'home-featured' | 'library-search',
  expandModule: 'module-2' // auto-expand
});
```

### Para `'profile'`

**3 caminhos:**

1. Home → Top Nav Profile Icon → `'profile'`
2. Home → Bottom Nav Profile → `'profile'`
3. Settings → Back → `'profile'`

### Para `'home'`

**4 caminhos:**

1. App Mount (inicial) → `'home'`
2. Logo Click → `'home'`
3. Bottom Nav Home → `'home'`
4. Onboarding Complete → `'home'`

---

## 🛠️ Recomendações

### 1. Prioridade CRÍTICA (Sprint 1)

#### Implementar Navegações Básicas

```typescript
// Library.tsx - Corrigir lesson navigation
const handleLessonClick = (lesson: Lesson) => {
  const { navigate } = useNavigation();

  if (lesson.locked) {
    navigate('extensions', {
      source: 'library-lesson',
      itemId: lesson.id,
      preselect: lesson.requiredBundle
    });
  } else if (lesson.type === 'video') {
    navigate('video', {
      lessonId: lesson.id,
      courseId: lesson.courseId
    });
  } else {
    navigate('article', {
      articleId: lesson.id,
      courseId: lesson.courseId
    });
  }
};
```

```typescript
// Profile.tsx - Implementar menu navigation
const menuItems = [
  {
    label: 'Editar Perfil',
    onClick: () => navigate('edit-profile')
  },
  {
    label: 'Assinatura',
    onClick: () => navigate('extensions', { tab: 'subscription' })
  },
  {
    label: 'Configurações',
    onClick: () => navigate('settings')
  },
];
```

```typescript
// Todos os arquivos - Implementar back buttons
const handleBack = () => {
  const { navigate, navigationData } = useNavigation();

  // Opção 1: Back específico
  navigate('previous-screen');

  // Opção 2: History-aware back (melhor)
  if (window.history.length > 1) {
    window.history.back();
  } else {
    navigate('home');
  }
};
```

#### Padronizar Rotas

```typescript
// Renomear em App.tsx
const routeAliases = {
  'store': 'extensions',
  'video-lesson': 'video',
  'article-reader': 'article',
  'locked-preview': 'extensions',
};

const navigate = (screen: string, data?: any) => {
  const normalizedScreen = routeAliases[screen] || screen;
  setCurrentScreen(normalizedScreen);
  setNavigationData(data);
};
```

### 2. Prioridade ALTA (Sprint 2)

#### Implementar Data Passing

```typescript
// Passar dados na navegação
interface NavigationData {
  // Course/Lesson context
  courseId?: string;
  lessonId?: string;
  articleId?: string;

  // Extension/Purchase context
  source?: string;
  itemId?: string;
  preselect?: string;
  tab?: string;

  // Video player context
  continueFrom?: number;
  autoplay?: boolean;

  // Generic
  [key: string]: any;
}

const { navigationData } = useNavigation();

// Usar em componentes
if (navigationData?.autoplay) {
  videoRef.current?.play();
}
```

#### Implementar Forms Backend

```typescript
// ForumScreen.tsx
const handleSubmitComment = async (data: CommentFormData) => {
  try {
    const response = await api.post('/comments', {
      ...data,
      lessonId: navigationData?.lessonId,
      userId: currentUser.id,
    });

    // Atualizar UI
    setComments(prev => [response.data, ...prev]);
    setModalType(null);
  } catch (error) {
    showToast('Erro ao enviar comentário');
  }
};
```

### 3. Prioridade MÉDIA (Sprint 3)

#### Implementar Settings Pickers

```typescript
// Settings.tsx
const [showQualityPicker, setShowQualityPicker] = useState(false);

const qualityOptions = [
  { value: 'auto', label: 'Automática' },
  { value: 'high', label: 'Alta (1080p)' },
  { value: 'medium', label: 'Média (720p)' },
  { value: 'low', label: 'Baixa (480p)' },
];

<SettingsRow
  icon={Monitor}
  label="Qualidade Padrão"
  value={quality}
  onClick={() => setShowQualityPicker(true)}
/>

{showQualityPicker && (
  <PickerModal
    options={qualityOptions}
    selected={quality}
    onSelect={(value) => {
      setQuality(value);
      setShowQualityPicker(false);
    }}
    onClose={() => setShowQualityPicker(false)}
  />
)}
```

#### Implementar Avatar Upload

```typescript
// EditProfile.tsx
const handleAvatarUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);

  try {
    const response = await api.post('/users/avatar', formData);
    setAvatarUrl(response.data.avatarUrl);
    showToast('Foto atualizada com sucesso!');
  } catch (error) {
    showToast('Erro ao fazer upload');
  }
};
```

### 4. Prioridade BAIXA (Backlog)

- Implementar search global funcional
- Implementar notifications system
- Implementar checkout flow completo
- Implementar help/FAQ modals
- Implementar theme picker
- Implementar font size picker

---

## 📊 Resumo Executivo

### Estatísticas Finais

| Métrica | Valor |
|---------|-------|
| **Telas analisadas** | 14 |
| **Elementos navegáveis** | 100+ |
| **Navegações funcionais** | ~40% |
| **Navegações quebradas (console.log)** | ~45% |
| **Funcionalidades não implementadas** | ~15% |
| **Rotas inconsistentes** | 4 tipos |
| **Caminhos duplicados** | 5 destinos principais |

### Status por Categoria

| Categoria | Status | % Funcional |
|-----------|--------|-------------|
| **Navegação Principal** | ✅ Bom | 95% |
| **Navegação Secundária** | ⚠️ Parcial | 50% |
| **Back Buttons** | ❌ Ruim | 10% |
| **Forms/Submissions** | ⚠️ Mock | 40% |
| **CTAs de Venda** | ❌ Não Implementado | 0% |
| **Settings/Config** | ❌ Não Implementado | 20% |
| **Data Passing** | ⚠️ Incompleto | 30% |

### Priorização de Correções

**Sprint 1 (Crítico - 2 semanas):**
- ✅ Corrigir Library lesson navigation (5 navegações)
- ✅ Corrigir Profile menu navigation (5 navegações)
- ✅ Implementar back buttons (8 telas)
- ✅ Padronizar rotas inconsistentes

**Sprint 2 (Alta - 2 semanas):**
- 🔧 Implementar data passing completo
- 🔧 Implementar forms backend (Forum, Video, Article)
- 🔧 Corrigir CourseDetail navigation

**Sprint 3 (Média - 2 semanas):**
- 🔧 Implementar Settings pickers (6 configurações)
- 🔧 Implementar avatar upload
- 🔧 Implementar logout funcional

**Backlog (Baixa):**
- 📋 Search global
- 📋 Notifications
- 📋 Checkout flow
- 📋 Theme/font pickers

---

## 🎯 Conclusão

A aplicação possui uma **estrutura de navegação sólida na camada principal** (Home, Library, Forum, Extensions, Profile), mas **50% das navegações secundárias não estão implementadas** ou apenas fazem `console.log`.

**Principais ações necessárias:**

1. ✅ **Converter console.log em navigate()** - 35+ ocorrências
2. ✅ **Implementar back buttons** - 8 telas afetadas
3. ✅ **Padronizar rotas** - 4 inconsistências
4. ✅ **Adicionar data passing** - Context incompleto
5. ⚠️ **Implementar forms backend** - Atualmente mock
6. ⚠️ **Implementar CTAs de venda** - Checkout não existe

Com as correções do **Sprint 1**, a aplicação terá **~85% de navegação funcional**, o que é suficiente para demo e testes de usabilidade.

---

**Documento gerado em:** 2026-01-15
**Autor:** Code Review Team
**Versão:** 1.0
**Status:** ✅ Análise Completa
