# Codex Local Configuration

This directory mirrors `.claude` so Codex can use the same project guidance.

## Included

- `agents/` - Playbooks for complex workflows
- `rules/` - Path-scoped authoring rules
- `skills/` - Codex skills (`create-slides`, `generate`, `review-slides`)
- `settings.local.json` - Local permission settings

## Enable Skills in Codex

Codex skills are loaded from `$CODEX_HOME/skills` (default: `~/.codex/skills`).
Run:

```bash
bash .codex/install-skills.sh
```

After installation, restart Codex session and invoke by skill name in chat:

- `create-slides`
- `generate`
- `review-slides`
