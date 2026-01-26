---
name: creating-skills
description: Creates and structures new Antigravity agent skills. Use when the user asks to build, generate, or design a new skill, workflow, or agent capability. Reference this skill before creating any other skill to ensure consistency and quality.
---

# Antigravity Skill Creator

Expert system for generating high-quality, predictable, and efficient `.agent/skills/` directories.

## When to Use This Skill

- User asks to "create a skill" or "build a new skill"
- User wants to add a new agent capability
- User needs a workflow or automation packaged as a skill
- **Always reference this before creating ANY other skill**

## Core Structural Requirements

Every skill MUST follow this folder hierarchy:

```
<skill-name>/
├── SKILL.md          # Required: Main logic and instructions
├── scripts/          # Optional: Helper scripts
├── examples/         # Optional: Reference implementations
└── resources/        # Optional: Templates or assets
```

## YAML Frontmatter Standards

The `SKILL.md` must start with YAML frontmatter:

```yaml
---
name: [gerund-name]        # e.g., testing-code, managing-databases
description: [3rd-person]  # Must include specific triggers/keywords
---
```

### Rules:
- **name**: Gerund form. Max 64 chars. Lowercase, numbers, hyphens only. No "claude" or "anthropic".
- **description**: Third person. Include triggers. Max 1024 chars.

## Writing Principles

### Conciseness
- Assume the agent is smart
- Don't explain basics (what a PDF or Git repo is)
- Focus only on unique skill logic

### Progressive Disclosure
- Keep `SKILL.md` under 500 lines
- Link to secondary files if needed: `[See ADVANCED.md](ADVANCED.md)`
- Only one level deep

### Path Format
- Always use `/` for paths, never `\`

### Degrees of Freedom

| Freedom Level | Format | Use Case |
|---------------|--------|----------|
| **High** | Bullet Points | Heuristics, flexible decisions |
| **Medium** | Code Blocks | Templates, configurable patterns |
| **Low** | Specific Commands | Fragile operations, exact steps |

## Workflow & Feedback Loops

For complex tasks, include:

### 1. Checklists
```markdown
- [ ] Step 1: Validate input
- [ ] Step 2: Execute operation
- [ ] Step 3: Verify output
```

### 2. Validation Loops
Use "Plan-Validate-Execute" pattern:
1. Plan the action
2. Run validation script/check
3. Execute only if validation passes

### 3. Error Handling
- Scripts should be "black boxes"
- Tell agent to run `--help` if unsure
- Provide fallback instructions

## Output Template

When creating a skill, output in this format:

---

### Folder Structure
**Path:** `.agent/skills/[skill-name]/`

### SKILL.md Content

```markdown
---
name: [gerund-name]
description: [3rd-person description with triggers]
---

# [Skill Title]

## When to Use This Skill
- [Trigger 1]
- [Trigger 2]

## Workflow

- [ ] Step 1
- [ ] Step 2
- [ ] Step 3

## Instructions

[Specific logic, code snippets, or rules]

## Resources

- [Link to scripts/ or resources/ if applicable]
```

---

## Quality Checklist

Before finalizing any skill:

- [ ] YAML frontmatter is valid and complete
- [ ] Name follows gerund convention (e.g., `testing-code`)
- [ ] Description is third-person with clear triggers
- [ ] Paths use forward slashes `/`
- [ ] Content is concise (under 500 lines)
- [ ] Complex tasks have checklists
- [ ] Error handling is documented
