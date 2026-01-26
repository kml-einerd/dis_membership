---
name: agent-swarm
description: Orchestrates multi-agent coordination for AI coding assistants using MCP. Use when needing to spawn worker agents, delegate tasks, coordinate multiple agents, or when the user mentions "swarm", "workers", "lead agent", "multi-agent coordination", or "parallel agents". Enables Docker-based isolated workers.
---

# Agent Swarm

Multi-agent orchestration layer for AI coding assistants via MCP (Model Context Protocol).

## When to Use This Skill

- Need to spawn multiple worker agents for parallel tasks
- Want to delegate complex work to specialized agents
- Require isolated execution environments (Docker workers)
- Coordinating lead/worker agent patterns
- User mentions "swarm", "workers", "parallel agents"
- GitHub integration for automated issue/PR handling

## What Agent Swarm Provides

| Feature | Description |
|---------|-------------|
| **Task Management** | Assign, track, and coordinate tasks across agents |
| **Agent Communication** | Channel-based messaging between agents |
| **Service Discovery** | Register and discover background services |
| **Docker Workers** | Run isolated Claude workers in containers |
| **Lead/Worker Pattern** | Coordinate work with a lead agent and multiple workers |
| **Dashboard UI** | Real-time monitoring at http://localhost:5173 |
| **GitHub Integration** | Auto-create tasks from @mentions in issues/PRs |

## Prerequisites

- [Bun](https://bun.sh) (or Node.js 22+)
- [Docker](https://docker.com)
- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code)

## Quick Start

### 1. Install Agent Swarm

```bash
# Clone repository
git clone https://github.com/desplega-ai/agent-swarm.git
cd agent-swarm
bun install

# Or use npx/bunx directly
bunx @desplega.ai/agent-swarm setup
```

### 2. Configure Environment

```bash
# API Server config
cp .env.example .env
# Set API_KEY in .env

# Docker worker config
cp .env.docker.example .env.docker
# Set API_KEY and CLAUDE_CODE_OAUTH_TOKEN
# Get token with: claude setup-token
```

### 3. Start Services

```bash
# Terminal 1: Start API Server
bun run start:http
# Runs at http://localhost:3013

# Terminal 2: Start Docker Worker
bun run docker:build:worker
mkdir -p ./logs ./work/shared ./work/worker-1
bun run docker:run:worker

# Terminal 3: Connect Claude Code as Lead
bunx @desplega.ai/agent-swarm setup
# Then in Claude: "Register yourself as the lead agent in the agent-swarm MCP."
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `setup` | Setup wizard to configure Claude Code integration |
| `mcp` | Start MCP & API server |
| `worker` | Run a worker agent |
| `lead` | Run lead agent in background |
| `hook` | GitHub webhook handler |
| `help` | Show available commands |

### CLI Examples

```bash
# Setup wizard
bunx @desplega.ai/agent-swarm setup

# Start MCP & API server on custom port
bunx @desplega.ai/agent-swarm mcp --port 8080 --key my-api-key

# Run worker with custom system prompt (NOT in Docker - use with caution)
bunx @desplega.ai/agent-swarm worker --system-prompt "You are a Python specialist"

# Run lead agent in background (without human-in-the-loop)
bunx @desplega.ai/agent-swarm lead
```

## Agent Commands (via MCP)

When connected to the swarm, agents can use these commands:

| Command | Description |
|---------|-------------|
| `/implement-issue` | Implement a GitHub issue |
| `/review-pr` | Review a pull request |
| `/create-pr` | Create a new pull request |
| `/close-issue` | Close a GitHub issue |
| `/respond-github` | Respond to GitHub thread |

## GitHub Integration

### Setup GitHub App

1. Create GitHub App at https://github.com/settings/apps/new
2. Set webhook URL: `https://your-server.com/api/github/webhook`
3. Generate webhook secret
4. Add to `.env`:
   ```
   GITHUB_WEBHOOK_SECRET=your-secret
   GITHUB_BOT_NAME=agent-swarm-bot
   ```
5. Enable webhook events: Issues, Issue comment, Pull request, Pull request review comment
6. Install the app on your repositories

### Trigger Tasks

Mention `@agent-swarm-bot` (or your configured bot name) in any issue, PR, or comment to automatically create a task for the lead agent.

## Workflow Checklist

- [ ] Install prerequisites (Bun, Docker, Claude Code CLI)
- [ ] Clone and install agent-swarm
- [ ] Configure `.env` and `.env.docker`
- [ ] Start API server (`bun run start:http`)
- [ ] Start Docker worker(s)
- [ ] Connect Claude Code as lead agent
- [ ] Register as lead: "Register yourself as the lead agent in the agent-swarm MCP."
- [ ] Verify dashboard at http://localhost:5173

## Architecture

```
┌─────────────────┐
│   Lead Agent    │  (Claude Code - your main session)
│   (Orchestrator)│
└────────┬────────┘
         │ MCP Protocol
         ▼
┌─────────────────┐
│   API Server    │  (http://localhost:3013)
│   (MCP HTTP)    │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌───────┐
│Worker │ │Worker │  (Docker containers)
│   1   │ │   2   │
└───────┘ └───────┘
```

## Resources

- [GitHub Repository](https://github.com/desplega-ai/agent-swarm)
- [Deployment Guide](https://github.com/desplega-ai/agent-swarm/blob/main/DEPLOYMENT.md)
- [UI Documentation](https://github.com/desplega-ai/agent-swarm/blob/main/UI.md)
- [Website](https://agent-swarm.desplega.sh)
