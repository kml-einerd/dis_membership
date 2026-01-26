---
name: feature-dev
description: Comprehensive 7-phase feature development workflow with specialized agents for codebase exploration, architecture design, and quality review. Use for complex features touching multiple files, features requiring architectural decisions, or when requirements need clarification. Don't use for single-line fixes, trivial changes, or urgent hotfixes.
---

# Feature Development Workflow

Structured 7-phase workflow for comprehensive feature development.

## Philosophy

Building features requires:
- Understanding the codebase before making changes
- Asking questions to clarify ambiguous requirements
- Designing thoughtfully before implementing
- Reviewing for quality after building

## The 7-Phase Workflow

### Phase 1: Discovery
**Goal**: Understand what needs to be built

- Clarifies the feature request
- Identifies constraints and requirements
- Confirms understanding with user

### Phase 2: Codebase Exploration
**Goal**: Understand relevant existing code and patterns

- Launches 2-3 `code-explorer` agents in parallel
- Each explores different aspects (similar features, architecture, UI patterns)
- Returns comprehensive analysis with key files

### Phase 3: Clarifying Questions
**Goal**: Fill gaps and resolve ambiguities

Identifies underspecified aspects:
- Edge cases
- Error handling
- Integration points
- Backward compatibility
- Performance needs

**Waits for user answers before proceeding**

### Phase 4: Architecture Design
**Goal**: Design multiple implementation approaches

Launches 2-3 `code-architect` agents with different focuses:
- **Minimal changes**: Smallest change, maximum reuse
- **Clean architecture**: Maintainability, elegant abstractions
- **Pragmatic balance**: Speed + quality

Presents comparison with trade-offs and recommendation.

### Phase 5: Implementation
**Goal**: Build the feature

- **Waits for explicit approval** before starting
- Reads all relevant files from previous phases
- Implements following chosen architecture
- Follows codebase conventions

### Phase 6: Quality Review
**Goal**: Ensure code is simple, DRY, elegant, and correct

Launches 3 `code-reviewer` agents:
- **Simplicity/DRY/Elegance**: Code quality and maintainability
- **Bugs/Correctness**: Functional correctness and logic errors
- **Conventions/Abstractions**: Project standards and patterns

Asks: Fix now, fix later, or proceed as-is

### Phase 7: Summary
**Goal**: Document what was accomplished

- What was built
- Key decisions made
- Files modified
- Suggested next steps

## Best Practices

1. Use full workflow for complex features
2. Answer clarifying questions thoughtfully (Phase 3)
3. Choose architecture deliberately (Phase 4)
4. Don't skip code review (Phase 6)

## Example

```bash
/feature-dev Add rate limiting to API endpoints

# Phases:
# 1. Clarifies rate limits
# 2. Explores API middleware patterns
# 3. Asks about limits per endpoint, storage
# 4. Presents 3 architecture options
# 5. Implements after approval
# 6. Runs quality review
# 7. Summarizes what was built
```
