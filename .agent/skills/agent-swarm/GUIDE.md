# 🐝 Guia Completo: Agent Swarm

> Framework de orquestração multi-agente para assistentes de codificação IA via MCP.

---

## 📚 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Configuração](#configuração)
4. [Exemplos Básicos](#exemplos-básicos)
5. [Exemplos Intermediários](#exemplos-intermediários)
6. [Exemplos Avançados](#exemplos-avançados)
7. [Lógicas Não Óbvias](#lógicas-não-óbvias)
8. [Padrões Extremamente Úteis](#padrões-extremamente-úteis)
9. [Troubleshooting](#troubleshooting)

---

## Visão Geral

Agent Swarm é uma camada de orquestração que permite:

- **Lead Agent**: Seu Claude Code principal que coordena o trabalho
- **Worker Agents**: Agentes isolados em Docker que executam tarefas
- **MCP Server**: Ponto central de comunicação (porta 3013)
- **Dashboard**: Interface visual para monitoramento (porta 5173)

### Por que usar Agent Swarm?

| Cenário | Sem Swarm | Com Swarm |
|---------|-----------|-----------|
| Refatorar 10 arquivos | Sequencial, lento | Paralelo, 10x mais rápido |
| Teste + Implementação | Um por vez | Workers separados |
| Risco de mudanças perigosas | No seu ambiente | Isolado em Docker |
| Monitoramento | Logs do terminal | Dashboard visual |

---

## Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                     SEU COMPUTADOR                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐      ┌───────────────────────────┐    │
│  │   Claude Code   │      │      Dashboard UI         │    │
│  │   (Lead Agent)  │      │   http://localhost:5173   │    │
│  └────────┬────────┘      └───────────────────────────┘    │
│           │                           ▲                     │
│           │ MCP                       │ WebSocket           │
│           ▼                           │                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              API/MCP Server                          │   │
│  │           http://localhost:3013                      │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                   │
│      ┌──────────────────┼──────────────────┐               │
│      │                  │                  │                │
│      ▼                  ▼                  ▼                │
│  ┌───────────┐    ┌───────────┐    ┌───────────┐          │
│  │  Worker 1 │    │  Worker 2 │    │  Worker N │          │
│  │  (Docker) │    │  (Docker) │    │  (Docker) │          │
│  │  Python   │    │  TypeScript│   │  General  │          │
│  └───────────┘    └───────────┘    └───────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Configuração

### Instalação Completa

```bash
# 1. Clonar repositório
git clone https://github.com/desplega-ai/agent-swarm.git
cd agent-swarm

# 2. Instalar dependências
bun install

# 3. Configurar API Server
cp .env.example .env
# Editar .env e definir API_KEY

# 4. Configurar Docker Workers
cp .env.docker.example .env.docker
# Editar .env.docker:
#   API_KEY=mesma-chave-do-.env
#   CLAUDE_CODE_OAUTH_TOKEN=seu-token

# 5. Obter token do Claude
claude setup-token
# Copiar token para .env.docker
```

### Instalação Rápida (via npx/bunx)

```bash
# Em qualquer projeto
bunx @desplega.ai/agent-swarm setup

# Seguir wizard interativo
```

---

## Exemplos Básicos

### 🟢 Nível 1: Iniciar o Swarm

```bash
# Terminal 1: API Server
cd agent-swarm
bun run start:http
# Output: Server running at http://localhost:3013

# Terminal 2: Docker Worker
bun run docker:build:worker
mkdir -p ./logs ./work/shared ./work/worker-1
bun run docker:run:worker
# Output: Worker connected, waiting for tasks...

# Terminal 3: Verificar Dashboard
# Abrir http://localhost:5173 no navegador
```

### 🟢 Nível 1: Registrar como Lead Agent

No Claude Code do seu projeto:

```
Register yourself as the lead agent in the agent-swarm MCP.
```

Resposta esperada:
```
Successfully registered as lead agent.
Agent ID: lead-abc123
Connected workers: 1
```

### 🟢 Nível 1: Delegar Tarefa Simples

```
Delegate to a worker: "Create a README.md for this project"
```

O Lead Agent irá:
1. Criar uma tarefa no swarm
2. Atribuir a um worker disponível
3. Aguardar conclusão
4. Retornar resultado

---

## Exemplos Intermediários

### 🟡 Nível 2: Múltiplos Workers Especializados

```bash
# Terminal 2: Worker Python
bun run docker:run:worker -- --system-prompt "You are a Python specialist. Focus on Python code quality, testing, and best practices."

# Terminal 3: Worker TypeScript
bun run docker:run:worker -- --system-prompt "You are a TypeScript specialist. Focus on type safety, modern TS patterns, and frontend code."

# Terminal 4: Worker DevOps
bun run docker:run:worker -- --system-prompt "You are a DevOps specialist. Focus on Docker, CI/CD, and infrastructure."
```

Agora você tem 3 workers especializados prontos para tarefas.

### 🟡 Nível 2: Distribuir Trabalho em Paralelo

No Claude Code (Lead):

```
I need to refactor this codebase. Please:
1. Assign the Python files to a Python specialist worker
2. Assign the TypeScript files to a TypeScript specialist worker  
3. Assign the Dockerfile to a DevOps specialist worker
4. Coordinate the results
```

### 🟡 Nível 2: Monitorar via Dashboard

1. Abrir http://localhost:5173
2. Ver lista de agents conectados
3. Ver tasks em andamento
4. Ver canais de comunicação
5. Ver logs em tempo real

### 🟡 Nível 2: Comunicação entre Agents

Lead Agent pode criar canais:

```
Create a channel called "architecture-discussion" and broadcast:
"We need to discuss the new authentication flow. All workers please share your analysis of the current auth code in your domain."
```

Os workers podem responder no canal, criando uma discussão distribuída.

---

## Exemplos Avançados

### 🔴 Nível 3: Pipeline de CI/CD com Workers

```
I want to set up a quality pipeline. Please:

1. Spawn a "code-analyzer" worker to run static analysis
2. Spawn a "test-runner" worker to run all tests
3. Spawn a "security-scanner" worker to check vulnerabilities
4. Collect all reports and create a summary

Run these in parallel and wait for all to complete.
```

### 🔴 Nível 3: GitHub Integration Automatizada

Configurar `.env`:
```bash
GITHUB_WEBHOOK_SECRET=seu-secret-seguro
GITHUB_BOT_NAME=meu-bot-swarm
```

Agora quando alguém mencionar `@meu-bot-swarm` em uma issue:

```
@meu-bot-swarm please implement this feature
```

O swarm automaticamente:
1. Recebe webhook do GitHub
2. Cria task para o Lead Agent
3. Lead delega para workers apropriados
4. Resultado é postado de volta na issue

### 🔴 Nível 3: Implementar Issue Completa

```
/implement-issue https://github.com/user/repo/issues/42

Use the following workers:
- 1 worker for implementation
- 1 worker for tests
- 1 worker for documentation

Create a PR when done.
```

### 🔴 Nível 3: Review de PR com Múltiplas Perspectivas

```
/review-pr https://github.com/user/repo/pull/55

Assign specialized reviewers:
- Security worker: check for vulnerabilities
- Performance worker: check for bottlenecks
- Style worker: check code conventions

Compile findings into a comprehensive review.
```

### 🔴 Nível 3: Deploy com docker-compose

Para produção, usar `docker-compose.example.yml`:

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3013:3013"
    environment:
      - API_KEY=${API_KEY}
    
  worker-1:
    image: ghcr.io/desplega-ai/agent-swarm-worker:latest
    environment:
      - API_KEY=${API_KEY}
      - CLAUDE_CODE_OAUTH_TOKEN=${CLAUDE_TOKEN}
    volumes:
      - ./work/worker-1:/work
      
  worker-2:
    image: ghcr.io/desplega-ai/agent-swarm-worker:latest
    environment:
      - API_KEY=${API_KEY}
      - CLAUDE_CODE_OAUTH_TOKEN=${CLAUDE_TOKEN}
    volumes:
      - ./work/worker-2:/work
      
  lead:
    image: ghcr.io/desplega-ai/agent-swarm-worker:latest
    command: lead
    environment:
      - API_KEY=${API_KEY}
```

```bash
docker-compose up -d
```

---

## Lógicas Não Óbvias

### 💡 1. Workers são Descartáveis

Workers Docker são stateless. Quando um crash acontece:
- O swarm detecta automaticamente
- Tasks pendentes são reatribuídas
- Novo worker pode ser iniciado

```bash
# Reiniciar worker sem perder trabalho
docker restart agent-swarm-worker-1
```

### 💡 2. Lead Agent Mantém Estado

O Lead Agent (seu Claude Code) mantém o contexto da sessão. Se você fechar o terminal:
- Workers podem continuar trabalhando
- Resultados ficam pendentes no swarm
- Reconecte para recuperar

```
Check the swarm for any completed tasks since I was away.
```

### 💡 3. Volumes Compartilhados

Workers podem compartilhar arquivos via volume:

```
./work/shared/  ← Todos workers acessam
./work/worker-1/ ← Apenas worker 1
./work/worker-2/ ← Apenas worker 2
```

### 💡 4. API_KEY Vazia para Desenvolvimento

Para uso local sem segurança:
```bash
API_KEY=
```

Para produção, **sempre** defina uma chave forte.

### 💡 5. Dry Run no Setup

```bash
bunx @desplega.ai/agent-swarm setup --dry-run
# Mostra mudanças sem aplicar

bunx @desplega.ai/agent-swarm setup --restore
# Reverte para configuração anterior
```

### 💡 6. Port Customizada

```bash
bunx @desplega.ai/agent-swarm mcp --port 8080 --key minha-chave
```

---

## Padrões Extremamente Úteis

### ⭐ Básico: Template de Delegação

```
Delegate to available workers:
- Task: "[DESCRIÇÃO DA TAREFA]"
- Priority: [high/medium/low]
- Timeout: [minutos]
- Return: [summary/full-output/diff]
```

### ⭐ Intermediário: Pipeline Paralelo

```
Execute this pipeline in parallel across workers:

PHASE 1 (Parallel):
- Worker A: Analyze src/
- Worker B: Run tests
- Worker C: Check dependencies

PHASE 2 (After Phase 1):
- Lead: Compile results
- Lead: Create report

PHASE 3 (If issues found):
- Worker A: Fix critical issues
- Worker B: Update tests
```

### ⭐ Avançado: Swarm para Refatoração Grande

```
I need to refactor the entire authentication system.

Setup:
1. Create channel "auth-refactor" for coordination
2. Spawn 4 workers with different focuses

Worker Assignments:
- WORKER-AUTH: Refactor auth.py and related modules
- WORKER-TESTS: Update all auth-related tests
- WORKER-DOCS: Update documentation and comments
- WORKER-MIGRATION: Create migration script for DB changes

Coordination Rules:
- Each worker posts progress to "auth-refactor" channel
- If a worker blocks, they post "@lead BLOCKED: [reason]"
- Lead monitors and reassigns as needed
- Final review by lead before creating PR

Go!
```

### ⭐ Expert: Desenvolvimento Contínuo

```
Run in continuous mode:

Monitor GitHub repo for:
- New issues → Auto-assign to appropriate worker
- PR reviews needed → Assign to code-review worker
- CI failures → Assign to debug worker

Escalate to lead (me) when:
- Confidence < 80%
- Multiple workers disagree
- Security-related changes
- Breaking changes detected

Run until I say "stop swarm"
```

---

## Troubleshooting

### ❌ "Worker not connecting"

```bash
# Verificar se API server está rodando
curl http://localhost:3013/health

# Verificar logs do worker
docker logs agent-swarm-worker-1

# Verificar API_KEY é igual em ambos
cat .env | grep API_KEY
cat .env.docker | grep API_KEY
```

### ❌ "Claude token expired"

```bash
# Renovar token
claude setup-token

# Atualizar .env.docker
# CLAUDE_CODE_OAUTH_TOKEN=novo-token

# Reiniciar workers
docker-compose restart
```

### ❌ "Dashboard not loading"

```bash
cd ui
pnpm install
pnpm run dev
# Confirmar: http://localhost:5173
```

### ❌ "Task stuck in pending"

```bash
# Verificar workers disponíveis
curl http://localhost:3013/api/agents

# Forçar redistribuição
curl -X POST http://localhost:3013/api/tasks/redistribute
```

### ❌ "GitHub webhook not triggering"

1. Verificar URL do webhook: `https://seu-server/api/github/webhook`
2. Verificar secret matches `.env`
3. Verificar eventos habilitados: Issues, Issue comment, PR, PR review comment
4. Testar payload manualmente via GitHub webhook settings

---

## Resumo

| Componente | Porta | Propósito |
|------------|-------|-----------|
| API/MCP Server | 3013 | Coordenação central |
| Dashboard UI | 5173 | Monitoramento visual |
| Workers | N/A | Execução isolada |
| Lead Agent | N/A | Seu Claude Code |

**Fluxo típico:**
1. Lead recebe tarefa complexa
2. Lead divide em sub-tarefas
3. Sub-tarefas vão para workers
4. Workers executam em paralelo
5. Resultados voltam ao Lead
6. Lead consolida e entrega

---

*Skill desenvolvida seguindo as diretrizes do `/creating-skills` do Antigravity Agent.*
