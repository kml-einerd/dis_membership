---
name: collaborating-with-ai
description: Delegates coding tasks to external AI CLIs (Codex, Gemini) for prototyping, debugging, code review, and multi-agent collaboration. Use when needing algorithm implementation, bug analysis, code quality feedback, or when the user mentions "delegate", "Codex", "Gemini", or "multi-agent". Supports multi-turn sessions.
---

# Collaborating with AI

Enables seamless delegation of coding tasks to external AI models via CLI bridges.

## When to Use This Skill

- User wants to delegate tasks to Codex or Gemini
- Need algorithm implementation or prototyping
- Bug analysis or debugging required
- Code review with external perspective
- Multi-agent collaboration scenarios
- User mentions "multi-model", "Codex", "Gemini", or "delegate"

## Prerequisites

- Python 3.8+ (tested on 3.10)
- [Codex CLI](https://github.com/openai/codex) for Codex integration
- [Gemini CLI](https://github.com/google-gemini/gemini-cli) for Gemini integration

## Quick Start

### Codex Bridge
```bash
python scripts/codex_bridge.py --cd "/path/to/project" --PROMPT "Your task"
```

### Gemini Bridge
```bash
python scripts/gemini_bridge.py --cd "/path/to/project" --PROMPT "Your task"
```

## Response Format

Both bridges return unified JSON:

**Success:**
```json
{
  "success": true,
  "SESSION_ID": "550e8400-e29b-41d4-a716-446655440000",
  "agent_messages": "Model response content...",
  "all_messages": []
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error description"
}
```

## Codex Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `--PROMPT` | str | Required | Task instruction |
| `--cd` | Path | Required | Workspace root |
| `--sandbox` | Literal | `read-only` | `read-only`, `workspace-write`, `danger-full-access` |
| `--SESSION_ID` | UUID | None | Resume existing session |
| `--skip-git-repo-check` | bool | False | Allow non-git directories |
| `--return-all-messages` | bool | False | Include reasoning/tool calls |
| `--image` | List[Path] | None | Attach images to prompt |
| `--model` | str | None | Custom model (user-specified only) |
| `--yolo` | bool | False | Skip approvals (dangerous) |

## Gemini Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `--PROMPT` | str | Required | Task instruction |
| `--cd` | Path | Required | Workspace root |
| `--sandbox` | bool | False | Enable sandbox mode |
| `--SESSION_ID` | str | "" | Resume existing session |
| `--return-all-messages` | bool | False | Include all messages |
| `--model` | str | None | Custom model (user-specified only) |

## Multi-turn Sessions

**CRITICAL**: Always capture `SESSION_ID` from the first response for follow-ups.

```bash
# Initial task
python scripts/codex_bridge.py --cd "/project" --PROMPT "Analyze auth in login.py"
# Response includes SESSION_ID: "abc-123..."

# Continue conversation
python scripts/codex_bridge.py --cd "/project" --SESSION_ID "abc-123..." --PROMPT "Write unit tests for that"
```

## Common Patterns

### Pattern 1: Safe Prototyping (Read-Only Diffs)
```bash
python scripts/codex_bridge.py --cd "/project" --PROMPT "Generate unified diff to add logging" --sandbox read-only
```

### Pattern 2: Full Debug Trace
```bash
python scripts/codex_bridge.py --cd "/project" --PROMPT "Debug this error" --return-all-messages
```

### Pattern 3: Code Review
```bash
python scripts/gemini_bridge.py --cd "/project" --PROMPT "Review login.py for security vulnerabilities"
```

### Pattern 4: Algorithm Implementation
```bash
python scripts/codex_bridge.py --cd "/project" --PROMPT "Implement a binary search tree with balancing"
```

## Workflow Checklist

- [ ] Verify CLI is installed (`codex --help` or `gemini --help`)
- [ ] Set correct `--cd` path to project root
- [ ] Choose appropriate `--sandbox` level
- [ ] Capture `SESSION_ID` for multi-turn
- [ ] Parse JSON response for `success` status
- [ ] Handle errors gracefully

## Error Handling

If a command fails:
1. Check CLI installation: `codex --help` / `gemini --help`
2. Verify Python version: `python --version` (3.8+)
3. Check path exists: `--cd` must be valid directory
4. Review error in JSON response

## Resources

- [Codex CLI Docs](https://github.com/openai/codex)
- [Gemini CLI Docs](https://github.com/google-gemini/gemini-cli)
- [GuDaStudio Skills](https://github.com/GuDaStudio/skills)

## Installation

```bash
# Clone with submodules
git clone --recurse-submodules https://github.com/GuDaStudio/skills
cd skills

# User-level install (all projects)
./install.sh --user --all        # Linux/Mac
.\install.ps1 -User -All         # Windows

# Project-level install
./install.sh --project --all     # Linux/Mac
.\install.ps1 -Project -All      # Windows
```
