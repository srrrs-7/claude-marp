# Development Insights

AI-generated insights from `/insights` analysis, triggered automatically on `git push` (throttled to once per 6 hours).

Each entry records observations about the session, patterns, and improvement suggestions.

**Workflow:**
1. Review entries periodically
2. Apply useful suggestions to `CLAUDE.md`, `.claude/rules/`, or `.claude/skills/`
3. Delete applied entries (or mark as `[applied]`)

> Note: the pre-push hook appends in the background *after* the push, so this file
> will often show as modified — commit it together with the next push.

---

## 2026-07-23 — branch: `main` `[applied]`

Meta-insights harvested from this file's own history (2026-02-22 → 2026-07-23, 55 entries), all applied to `scripts/hooks/pre-push`:

- **Zero-content entries:** `claude -p "/insights"` prints only a link to an HTML report; appending raw stdout produced 55 entries with no insight text. → The hook now runs a second haiku pass that extracts markdown bullets from the report, and skips the append entirely when nothing substantive comes back.
- **No throttle:** push bursts (13 pushes in ~40 min on 2026-03-11 and 2026-03-13) each appended an identical entry. → Throttled to one analysis per 6 hours via `.git/insights-last-run`.
- **PATH loss in detached subshell:** the backgrounded hook outlived the terminal and failed with `env: node: No such file or directory` (exit 127). → `claude`/`node` are resolved to absolute paths before backgrounding.
- **Merge conflict shipped to `main`:** because the hook writes after push, the file is perpetually dirty; on 2026-07-20 an unresolved `<<<<<<< HEAD` block was committed. → Conflict resolved; workflow note added above.
- **Noise passthrough:** `SessionEnd hook ... failed` errors and `<message>` wrapper tags were recorded verbatim. → Only extracted `- ` bullets are appended now.

Re-install the hook after pulling: `make setup-hooks`
