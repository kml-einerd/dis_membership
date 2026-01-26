---
name: code-review
description: Automated code review for pull requests using multiple specialized agents with confidence-based scoring to filter false positives. Use when reviewing PRs that need guideline compliance checks, bug detection, and quality analysis before merging.
---

# Code Review

Provide automated code review for pull requests using specialized agents.

## Overview

Performs multi-agent code review:
- **2x CLAUDE.md compliance agents**: Check guideline adherence
- **1x Bug detector**: Scan for bugs in changes only
- **1x History analyzer**: Context from git blame

## Usage

```bash
/code-review [--comment]
```

**Options:**
- `--comment`: Post review as PR comment (default: terminal output)

## How It Works

1. **Pre-check**: Verify PR needs review (skips closed, draft, trivial, or already-reviewed)
2. **Gather guidelines**: Collect CLAUDE.md files from repository
3. **Summarize changes**: Create PR summary
4. **Parallel review**: Launch 4 agents independently
5. **Score issues**: Each issue scored 0-100 for confidence
6. **Filter**: Remove issues below 80 confidence threshold
7. **Output**: Post to terminal or PR comment

## Confidence Scoring

- **0**: Not confident, false positive
- **25**: Somewhat confident, might be real
- **50**: Moderately confident, real but minor
- **75**: Highly confident, real and important
- **100**: Absolutely certain, definitely real

## What Gets Flagged (HIGH SIGNAL Only)

**Do flag:**
- Code that will fail to compile (syntax errors, type errors, missing imports)
- Code that will produce wrong results (clear logic errors)
- Clear CLAUDE.md violations (with exact quoted rule)

**Do NOT flag:**
- Pre-existing issues not introduced in PR
- Code style or quality concerns
- Potential issues depending on inputs
- Subjective suggestions
- Issues linters will catch
- General quality issues (unless in CLAUDE.md)

## Requirements

- Git repository with GitHub integration
- GitHub CLI (`gh`) installed and authenticated
- CLAUDE.md files (optional but recommended)

## Example Output

```markdown
## Code review

Found 3 issues:

1. Missing error handling for OAuth callback (CLAUDE.md: "Always handle OAuth errors")
   https://github.com/owner/repo/blob/abc123.../src/auth.ts#L67-L72

2. Memory leak: OAuth state not cleaned up
   https://github.com/owner/repo/blob/abc123.../src/auth.ts#L88-L95

3. Inconsistent naming (CLAUDE.md: "Use camelCase for functions")
   https://github.com/owner/repo/blob/abc123.../src/utils.ts#L23-L28
```
