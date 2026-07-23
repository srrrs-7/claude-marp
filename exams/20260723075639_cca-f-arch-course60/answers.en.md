# Claude Certified Architect – Foundations (CCA-F) — Answer Key & Rationale

## Answer Key & Rationale

**Scoring:** correct ÷ 60 is your accuracy. Approx scaled score = `100 + 900 × accuracy` (pass line 720 ≈ 72% accuracy). Record the domain of every miss and transfer it to the score sheet in README.md.

---

### Q1 Correct: B (D1 — Agentic Architecture & Orchestration)

The clean-criteria majority is a settled, enumerable sequence, so it belongs in a deterministic workflow where cost and runtime are predictable and steps cannot be skipped. Only the genuinely ambiguous minority needs the open loop's autonomy. Matching the control structure to the nature of the work is the core workflow-versus-agent decision.

**Why the others are wrong**

- **A.** Lowering temperature does not add a stopping condition or enforce step order; the mechanical 60% still runs through a non-deterministic open loop with unpredictable cost.
- **C.** A larger model does not change the open-loop structure that allows the coverage check to be skipped; it raises cost while leaving the root cause untouched.
- **D.** Sending every request to a clinician removes the automation value the system exists to deliver; it answers a capacity question with an over-correction rather than fixing the execution method for the deterministic majority.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q2 Correct: C (D1 — Agentic Architecture & Orchestration)

Retrieval over an index is a point-in-time snapshot, and coverage policy is live, changing state; any snapshot goes stale the moment the policy revises. RAG suits a stable corpus, whereas an authoritative answer about current coverage must come from the live system that owns it. The fix is to query the source of truth, not a copy of it.

**Why the others are wrong**

- **A.** More frequent re-embedding and more chunks still leave a snapshot that is stale between refreshes; the window for approving against retired criteria shrinks but never closes.
- **B.** A higher similarity threshold changes which stale passages are returned, not whether they are current; it tunes retrieval quality while the freshness gap remains.
- **D.** A larger model cannot know that a retrieved passage is out of date; the authority problem is in the data source, not the model's reasoning capacity.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q3 Correct: A (D1 — Agentic Architecture & Orchestration)

A rule that must be correct every time is deterministic work that belongs to the system that already maintains it, not to a probabilistic model whose parametric knowledge silently goes stale. Claude owns the language work of reading the notes, the policy engine owns the coverage rule, and a human owns genuine ambiguity. Assigning each part to its right owner removes the drift at its source.

**Why the others are wrong**

- **B.** A prompt instruction cannot give the model current criteria it does not hold; the decision still rests on stale parametric knowledge and will keep drifting.
- **C.** A next-morning audit detects misapplied approvals after they have already been filed; it observes the drift rather than preventing the wrong decision from being made.
- **D.** Routing every coverage decision to a clinician discards the automation the system is built for; the deterministic rule can be applied correctly by the policy engine without a person.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q4 Correct: C (D3 — Prompt Engineering & Structured Output)

Untrusted external text and trusted instructions are addressed by structurally separating them, not by asking the model to disregard content it cannot reliably distinguish. Delimiting the note as data with XML tags and declaring in the system prompt that tag content is never an instruction establishes the boundary that keeps embedded commands from being promoted to instructions. The boundary itself is the control.

**Why the others are wrong**

- **A.** A "do not follow" request creates no boundary; instructions and data still sit on the same plane, so a well-crafted injection can still be obeyed.
- **B.** Temperature is unrelated to injection resistance; the structure that reads embedded text as an instruction remains, and a low temperature can even make the model follow it more consistently.
- **D.** Banning whole providers halts legitimate volume the system must process and still leaves the underlying instruction-versus-data confusion unaddressed for every remaining provider.

**References:**

- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)
- [プロンプトエンジニアリング概要](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview)

---

### Q5 Correct: B, D (D4 — Tool Design & MCP Integration)

Separate the risk by mechanism rather than by the model's judgment. Auto-approving only clear cases and gating the rest for human approval preserves the 60% target while stopping the irreversible action on ambiguous input (B). Making a passing coverage check a harness-enforced precondition for approve_authorization structurally blocks approvals that were never validated (D). Both place the control on the permission and orchestration layer, where it is provable and cannot be talked out of its decision.

**Why the others are wrong**

- **A.** A prompt request has no enforcement power; even if the model claims it re-verified, an irreversible tool remains callable on ambiguous input with no boundary in front of it.
- **C.** Sending every request to a clinician does eliminate wrongful approvals but also eliminates the 60% auto-approval requirement; it is an over-correction that violates the stated goal.

**References:**

- [Agent SDK の権限制御（human-in-the-loop）](https://docs.claude.com/en/api/agent-sdk/permissions)
- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)

---

### Q6 Correct: A (D4 — Tool Design & MCP Integration)

The cues an agent uses to pick a tool live in the tool description and schema, so mis-selection is a description problem. Stating each tool's responsibility boundary, spelling out when it must not be used, and constraining the input schema removes the ambiguity at the definition level. Writing tools for agents means describing prohibited-use conditions, not just capabilities.

**Why the others are wrong**

- **B.** A renamed tool conveys a vague warning but gives the model no basis for when to choose it over escalate_to_clinician; the boundary is still undefined.
- **C.** Extra confirmation prompts look responsible but leave the descriptions ambiguous and the tool connected, so the wrong tool can still be selected on the same inputs.
- **D.** Collapsing four tools into one bloats the arguments, breaks least privilege by exposing the high-impact action everywhere, and worsens rather than fixes selection clarity.

**References:**

- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [ツール利用の実装](https://docs.claude.com/en/docs/agents-and-tools/tool-use/implement-tool-use)

---

### Q7 Correct: B (D5 — Context Management & Reliability)

An identical, unchanging prefix sent on every call is exactly what prompt caching targets. Marking the static system prompt and tool definitions as a cache prefix skips reprocessing those input tokens from the second call onward, cutting both cost and time-to-first-token the more often the same prefix recurs. It reduces spend without removing any capability.

**Why the others are wrong**

- **A.** Trimming the prompt and removing tool definitions sacrifices capability and still re-sends whatever static portion remains; it treats a caching problem as a length problem.
- **C.** Model choice does not change the cost of reprocessing an identical prefix on every request, and a larger model does not reduce that input-side cost.
- **D.** max_tokens caps output, not the input-side static prefix that is driving the cost and latency; it is an unrelated knob that trades away answer completeness.

**References:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)
- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

### Q8 Correct: C (D5 — Context Management & Reliability)

Transient overloaded errors are recoverable with a retry-and-backoff strategy, but retrying an irreversible action requires idempotency so a committed approval is never filed twice. Keying the retry to whether the action already succeeded adds fault tolerance without creating duplicate approvals. Control over the side effect stays on the harness side, independent of where the interruption landed.

**Why the others are wrong**

- **A.** Blind restart from the beginning re-invokes an approve_authorization that may already have committed, which is exactly how the double approval occurred; it looks safe but is not idempotent.
- **B.** max_tokens governs output length, not resilience to an overloaded error; raising it does nothing to make an interrupted approval safe to resume.
- **D.** Dropping every errored request throws away recoverable work and pushes load back onto providers, degrading the automation rate to avoid a problem that an idempotent retry solves cleanly.

**References:**

- [エラー種別とリトライ](https://docs.claude.com/en/api/errors)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q9 Correct: C (D2 — Claude Code Configuration & Workflows)

CLAUDE.md is project memory that Claude Code loads into context automatically at startup, so committing the recipe to the repository makes the current version reach every package without a manual paste. A file under version control is updated once and tracked, which structurally removes the stale-paste failure. The fix replaces a fragile per-invocation string with a mechanism the harness guarantees.

**Why the others are wrong**

- **A.** Prompt embedding is the exact source of the stale-paste error; a bulk-rewrite script is symptomatic treatment and still cannot guarantee the recipe is loaded correctly for every package.
- **B.** Temperature and max turns are generation parameters, not a place to carry a written recipe; tuning them does not deliver the mapping or the rewrite order the packages need.
- **D.** A recipe is a specification, not something to be guessed at; a larger model cannot reconstruct the exact deprecated-to-replacement mapping, and relying on model generations that change over time is inappropriate.

**References:**

- [CLAUDE.md によるメモリ](https://docs.claude.com/en/docs/claude-code/memory)
- [Claude Code 設定](https://docs.claude.com/en/docs/claude-code/settings)

---

### Q10 Correct: B (D2 — Claude Code Configuration & Workflows)

A model's self-report that 'tests pass' is not a measurement of whether they passed — the same context that made the edit can fabricate the claim. Keeping verification as a separate subagent whose isolated context actually runs the suite makes the pass/fail an observed result, not a self-attestation. Separating the roles is what keeps the check independent of the editor.

**Why the others are wrong**

- **A.** Asking the agent to be honest is a prompt request with no enforcement; the self-attesting structure remains and an unrun suite can still be reported as green.
- **C.** Temperature tuning changes output variance, not whether the tests were executed; a more consistent false claim is no closer to a real verification.
- **D.** A larger model still self-reports probabilistically and can claim a pass without running anything; scale does not turn a self-attestation into an independent check.

**References:**

- [サブエージェント](https://docs.claude.com/en/docs/claude-code/sub-agents)
- [ベストプラクティス](https://www.anthropic.com/engineering/claude-code-best-practices)

---

### Q11 Correct: A (D2 — Claude Code Configuration & Workflows)

A PostToolUse hook is executed by the harness on the edit event, not chosen by the model, so it runs the suite every time and blocks the write on failure. That converts 'hoping the agent runs the tests' into a deterministic gate, and a red package is stopped at the edit stage before it can be committed. Routine verification that must always happen belongs in a hook.

**Why the others are wrong**

- **B.** Emphasis in memory only raises the probability the agent runs the tests; the structure where the step can be skipped is unchanged, so red commits will still slip through.
- **C.** A next-morning log review is after-the-fact detection, not prevention; the unattended run has already produced the failing commit that the requirement forbids.
- **D.** A stronger model does not make instruction-following certain and relies on generations that drift over time; deterministic execution should be secured by a hook, not by model choice.

**References:**

- [フック](https://docs.claude.com/en/docs/claude-code/hooks)
- [Claude Code 設定](https://docs.claude.com/en/docs/claude-code/settings)

---

### Q12 Correct: D (D2 — Claude Code Configuration & Workflows)

In headless CI there is no one to approve anything, so the control has to live in the permission configuration, not the model's judgment. An allowlist that grants only the edit and test tools and omits the prod-touching scripts means that no matter what the agent outputs — even under a README injection — those scripts physically cannot be invoked. This is least privilege enforced by the harness.

**Why the others are wrong**

- **A.** A confirmation prompt presumes an interactive operator; in an unattended run there is no one to answer, and leaving the tool connected is compensating-control theater that does not remove the danger.
- **B.** A 'never run' instruction in memory is not an enforcement boundary; it can be overridden by the model's interpretation or by an injected instruction in a package's files.
- **C.** A stronger model still decides at runtime and can be steered by a crafted README; scale is not a guarantee that a destructive script is never invoked.

**References:**

- [headless / 非対話実行（CI）](https://docs.claude.com/en/docs/claude-code/headless)
- [Agent SDK の権限制御（human-in-the-loop）](https://docs.claude.com/en/api/agent-sdk/permissions)
- [ベストプラクティス](https://www.anthropic.com/engineering/claude-code-best-practices)

---

### Q13 Correct: B, C (D2 — Claude Code Configuration & Workflows)

Headless reliability comes from removing anything that can block indefinitely and from bounding each unit of work. Running non-interactively with an allowed-tools list means no call waits on an approval prompt, and structured output gives CI a per-package result to record (B). Per-package max-turns and timeout bounds mean a looping package fails fast and releases the queue rather than stalling the whole fleet (C). Both are harness-side controls independent of the model.

**Why the others are wrong**

- **A.** Piping 'yes' auto-approves whatever is requested, including a prod-touching action, so it defeats the permission boundary instead of establishing a safe headless mode.
- **D.** max_tokens is an output cap; it does not stop a pathological loop or an approval hang, so it does not address either operational gap and only invites truncated output.

**References:**

- [headless / 非対話実行（CI）](https://docs.claude.com/en/docs/claude-code/headless)
- [Claude Code 設定](https://docs.claude.com/en/docs/claude-code/settings)
- [ベストプラクティス](https://www.anthropic.com/engineering/claude-code-best-practices)

---

### Q14 Correct: A (D2 — Claude Code Configuration & Workflows)

A representative pilot batch exposes the recipe gaps and hook problems on a scale a team can actually triage, and proves a baseline before the cost of the full fleet is committed. Expanding in waves that feed fixes back into the shared CLAUDE.md turns each stage into an improvement to the recipe every later package inherits. This is the champion-then-batch pattern applied to an automated migration.

**Why the others are wrong**

- **B.** Re-running the whole fleet unchanged repeats the same untriageable failures; without tuning the recipe the pass rate has no reason to climb.
- **C.** A stronger model does not supply the missing recipe rules that real packages exposed, and re-running all 1,400 keeps the failures unmanageable and the cost high.
- **D.** Migrating 1,400 packages by hand discards the automation value the program was created to capture; the failures signal a recipe to tune, not a reason to abandon the pipeline.

**References:**

- [ベストプラクティス](https://www.anthropic.com/engineering/claude-code-best-practices)
- [CLAUDE.md によるメモリ](https://docs.claude.com/en/docs/claude-code/memory)

---

### Q15 Correct: D (D1 — Agentic Architecture & Orchestration)

Matching the control method to the nature of the task is the core workflow-versus-agent decision. A deterministic workflow makes the mechanical majority predictable in cost and runtime and removes needless exploration, while the open loop is reserved for the minority where behavior-change judgment is genuinely required. The split fixes the unpredictability at its root rather than trimming a symptom.

**Why the others are wrong**

- **A.** Lowering temperature does not give the mechanical work the determinism a workflow provides; an open loop still explores and its cost and runtime stay unpredictable.
- **B.** Sending everything to the top-tier model worsens cost unpredictability and still runs the deterministic 90% through an open loop that does not need one.
- **C.** Handing the 10% to engineers may be reasonable for the hard cases, but it leaves the actual question — how to run the mechanical 90% — unanswered, so that work stays on an unpredictable open loop.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q16 Correct: C (D5 — Context Management & Reliability)

An identical static preamble repeated across 1,400 sessions is exactly what prompt caching targets: fixing it at the head lets the API skip reprocessing those input tokens, cutting cost and time-to-first-token structurally. Pairing that with an idempotent retry and backoff gives fault tolerance for the transient overloaded error without re-running a commit that already succeeded. Both controls sit on the harness side.

**Why the others are wrong**

- **A.** Caching keys on a stable leading prefix, so moving the changing diff to the head breaks every cache hit and makes the cost and latency problem worse.
- **B.** Restarting from the beginning can repeat an already-committed step and cause a double migration; it looks careful but is not idempotent.
- **D.** Removing the forbidden-pattern list discards logic the migration relies on to avoid banned constructs; it trades correctness for a small context saving instead of caching the stable prefix.

**References:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)
- [エラー種別とリトライ](https://docs.claude.com/en/api/errors)
- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

### Q17 Correct: C (D1 — Agentic Architecture & Orchestration)

Retrieval over a corpus is a point-in-time snapshot, so it can never be the source of truth for live state. Positions and prices change continuously and are owned by the transactional systems, so those questions must be routed to get_portfolio_positions / get_market_price while the index stays reserved for stable filings and methodology. Matching each question to the right source of truth is the fix.

**Why the others are wrong**

- **A.** An hourly refresh only shortens the staleness window; the index is still a snapshot, so a price or position that moved since the last refresh is still wrong. Live state should be owned by the live tool, not a fresher snapshot.
- **B.** A prompt preference gives no mechanism for actually reaching live data and does not change that the assistant is answering from a snapshot. The structural gap between snapshot and live state remains.
- **D.** A larger model does not change where the data comes from; if the architecture still answers live questions from the index, a stronger model quotes the same stale figure with more confidence.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q18 Correct: B (D1 — Agentic Architecture & Orchestration)

The danger is a fluent summary built over incomplete work. A fan-out gives each holding its own isolated context, and a coverage check at synthesis — results returned must equal units dispatched — turns a silent drop into an explicit gap the run must reconcile before it composes the report. The reconciliation, not the model's diligence, is what guarantees completeness.

**Why the others are wrong**

- **A.** A prompt instruction cannot verify coverage; when a lookup times out and returns nothing, the model still has no signal that a holding is missing, so the same silent drop recurs.
- **C.** A larger window lets more holdings coexist but does nothing to reconcile a dropped unit against the count dispatched, so a timed-out holding is still silently omitted.
- **D.** A next-morning audit is after-the-fact detection; the incomplete report has already been produced and circulated. It observes the gap rather than preventing it.

**References:**

- [サブエージェント（文脈隔離）](https://docs.claude.com/en/api/agent-sdk/subagents)
- [マルチエージェント調査システムの設計](https://www.anthropic.com/engineering/multi-agent-research-system)

---

### Q19 Correct: D (D3 — Prompt Engineering & Structured Output)

Valid attribution is secured by validation at the boundary, not by asking. A schema that binds each claim to a source id, plus a receiving-side check that every id belongs to the passages actually retrieved, mechanically rejects uncited or invented references before they reach the advisor. Because the harness enforces it, correctness does not depend on the model's care.

**Why the others are wrong**

- **A.** A prompt request lowers the rate of missing citations but neither guarantees one is present nor checks that a cited reference is real, so fabricated ids still pass through.
- **B.** Temperature controls output variance, not grounding; a deterministic run can still emit a confident citation to a passage that was never retrieved.
- **C.** A stronger model may fabricate less often, but without a validation step an invented or unsupported citation is still undetectable, and the root cause — no boundary check — remains.

**References:**

- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)
- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)

---

### Q20 Correct: A (D3 — Prompt Engineering & Structured Output)

The confusion comes from stable knowledge and live state sharing one undifferentiated block of text. Delimiting the two with labeled XML tags and stating that live figures may come only from the live-results block gives the model an explicit structural boundary to reason over, so a price from an old filing can no longer be promoted to "current." Structure beats a preference note.

**Why the others are wrong**

- **B.** A preference sentence still leaves both figures on the same undifferentiated plane; when the model cannot tell which block a number came from, it cannot reliably apply the preference.
- **C.** Temperature affects randomness, not the model's ability to attribute a figure to a source; the filings and live numbers are still indistinguishable in the prompt.
- **D.** A stronger model has no clearer boundary to work with either; without the sources separated, it can still read a filing price as the current one.

**References:**

- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)
- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)

---

### Q21 Correct: C (D4 — Tool Design & MCP Integration)

Delivering a report to a client is irreversible and high-impact, so the decision to execute must not rest on the model's confidence. A human-in-the-loop permission puts an advisor's approval structurally in front of every send, so even on an ambiguous request the report cannot go out unreviewed. Control belongs on the permission layer, not in the model's judgment.

**Why the others are wrong**

- **A.** A confirmation written into the prompt is still answered by the model itself; nothing external blocks the call, so on an ambiguous request it can confirm and send anyway. The high-impact tool stays connected with no real gate.
- **B.** A morning log review is after-the-fact; the report has already reached the client and cannot be recalled. It detects the mistaken send rather than preventing it.
- **D.** A more detailed description still leaves the execution decision with the model, so misuse remains possible. It is a show of caution, not a structural barrier.

**References:**

- [Agent SDK の権限制御（human-in-the-loop）](https://docs.claude.com/en/api/agent-sdk/permissions)
- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)

---

### Q22 Correct: A, D (D4 — Tool Design & MCP Integration)

Mis-selection stems from descriptions that say what a tool does but not when it must not be used, and from overlapping responsibilities. Stating search_filings' prohibited uses and pointing to the live tools (A) fixes the cue the model reads when choosing, and giving each tool one responsibility with a distinct schema (D) removes the overlap that made two tools look interchangeable. Both improve selection at the definition level.

**Why the others are wrong**

- **B.** Collapsing four tools into one bloats its arguments, destroys least-privilege, and hides the very distinction between stable and live sources that the model needs — an overreach that does not improve selection.
- **C.** Temperature does not touch the ambiguous descriptions that cause the wrong choice; it only makes an already ill-informed selection more repeatable, leaving accuracy to chance.

**References:**

- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [ツール利用の実装](https://docs.claude.com/en/docs/agents-and-tools/tool-use/implement-tool-use)

---

### Q23 Correct: B (D5 — Context Management & Reliability)

The failure is unbounded accumulation of retrieved chunks pushing the persona and instructions out of the window. Context editing actively removes chunks that are no longer relevant, and a memory tool carries the essential facts forward outside the live context, so each turn holds only what it needs. Managing what stays in the window is the design fix, not enlarging or hoping.

**Why the others are wrong**

- **A.** max_tokens caps the output length; it does nothing about the input context that is filling with appended chunks, so the window still overflows and instructions still fall out.
- **C.** A larger window only delays the overflow while every chunk keeps accumulating; the persona and instructions are eventually pushed out again, and cost per turn grows.
- **D.** A prompt instruction to forget cannot actually remove tokens already in the context; the chunks remain in the window and keep crowding out the earlier content.

**References:**

- [context editing](https://docs.claude.com/en/docs/build-with-claude/context-editing)
- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [memory ツール](https://docs.claude.com/en/docs/agents-and-tools/tool-use/memory-tool)

---

### Q24 Correct: C (D1 — Agentic Architecture & Orchestration)

An open-loop agent cannot guarantee its own stopping condition, so the guarantee must live in the harness. A maximum iteration budget is a control the orchestration layer enforces regardless of what the model decides, and bridging to notify_customer or a human when the cap is reached cuts off only the runaway while the business flow continues. Placing the bound outside the model is the structural fix.

**Why the others are wrong**

- **A.** A request in the prompt is probabilistic and does not add a stopping condition, so the loop can still run unbounded whenever the model keeps deciding to investigate.
- **B.** A larger model still has no enforced stopping condition and can loop just as easily; scale is not a substitute for a harness-side bound.
- **D.** Dashboards and after-the-fact detection observe a loop that already burned tokens; they do not prevent the runaway conversation from happening.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q25 Correct: A (D1 — Agentic Architecture & Orchestration)

The known path is deterministic, so it belongs in a workflow where the ordering and branching live in code and cannot be skipped or looped. Reserving the open loop for the genuinely unpredictable part (misroute investigation) matches the control method to the nature of each task. Choosing workflow for the settled majority and agent only where uncertainty is inherent is the core pattern-selection principle.

**Why the others are wrong**

- **B.** max_tokens is an output cap unrelated to step ordering; as long as sequencing is left to the model's memory, skips and loops recur.
- **C.** A prompt request is not enforcement and cannot guarantee ordering inside an open loop, so the same step-skips and loops remain possible.
- **D.** A larger model does not change the open-loop structure or guarantee the fixed order; cost rises while the root cause remains.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q26 Correct: B (D1 — Agentic Architecture & Orchestration)

The failure is a confident synthesis built over incomplete work because nothing reconciled results against units dispatched. A coverage check that requires returned results to equal dispatched units turns a silently dropped batch into a flagged, retryable gap before anyone reads the summary. Verifying completeness at the synthesis boundary, rather than assuming it, is the structural fix for fan-out.

**Why the others are wrong**

- **A.** Asking subagents not to time out does not make timeouts impossible, and a stronger orchestrator still counts only the results it happens to receive.
- **C.** A larger window changes how much fits, not whether missing batches are noticed; the count can still omit a subagent that returned nothing.
- **D.** Manual next-day reconciliation is after-the-fact detection; the complete-looking summary has already been circulated and acted upon.

**References:**

- [マルチエージェント調査システムの設計](https://www.anthropic.com/engineering/multi-agent-research-system)
- [サブエージェント（文脈隔離）](https://docs.claude.com/en/api/agent-sdk/subagents)

---

### Q27 Correct: D (D3 — Prompt Engineering & Structured Output)

A downstream stage that machine-parses the output needs the shape guaranteed, not requested. Enforcing the fields with a schema and validating on receipt makes parsing reliable regardless of phrasing, and a retry on failure absorbs the occasional bad generation without dropping a notification. Control on the harness side (schema plus validation plus retry) is what secures the format.

**Why the others are wrong**

- **A.** A prompt request plus temperature tuning lowers but does not eliminate format drift, and with no validation a malformed payload still reaches the template.
- **B.** A broader regex still guesses at free-form prose and breaks on the next unseen phrasing; it does not guarantee the fields are present.
- **C.** A larger model still produces probabilistic output and offers no validation, so blank or dropped fields can still slip downstream.

**References:**

- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)
- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)

---

### Q28 Correct: C (D4 — Tool Design & MCP Integration)

Mis-selection is rooted in overlapping descriptions and undefined boundaries, which are the cues the model uses to choose. Stating each tool's responsibility boundary and its "do not use when" conditions removes the overlap and gives the model a clear basis to pick reroute over notify. Tool-selection accuracy is determined by the clarity of the tool definitions, so the fix belongs there.

**Why the others are wrong**

- **A.** Merging routing and messaging into one tool bloats its arguments and breaks least-privilege, collapsing two distinct actions rather than clarifying the choice.
- **B.** Temperature does not touch the ambiguous descriptions that cause the confusion; selection stays hit-or-miss for the wrong reason.
- **D.** A renamed suffix does not encode when a tool must not be used, so the agent still lacks the boundary information it needs to choose correctly.

**References:**

- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [ツール利用の実装](https://docs.claude.com/en/docs/agents-and-tools/tool-use/implement-tool-use)

---

### Q29 Correct: A, D (D4 — Tool Design & MCP Integration)

Both duplicate paths — retries after a transient error and re-investigating the same case — are prevented by making the credit operation idempotent on a stable key. An idempotency key lets the server collapse repeat calls into one (A), and a harness-side once-per-exception precondition backed by a ledger blocks a second execution regardless of what the model does (D). Both keep control off the model's judgment while leaving the automation rate untouched.

**Why the others are wrong**

- **B.** A prompt request has no enforcement power and relies on the model's memory across interruptions, so a retry or a second message can still credit twice.
- **C.** Gating every credit on a human eliminates duplicates but also destroys the immediacy and automation the business tracks — an overreach that stops legitimate credits too.

**References:**

- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [Agent SDK の権限制御（human-in-the-loop）](https://docs.claude.com/en/api/agent-sdk/permissions)

---

### Q30 Correct: B (D4 — Tool Design & MCP Integration)

A bare "error" gives the agent nothing to reason over, so it retries blindly or gives up. A structured, actionable error that names the reason and a recommended next step lets the agent branch deterministically — try another hub, or fall through to notify_customer. Designing tool results to be informative and actionable is a core part of writing tools for agents.

**Why the others are wrong**

- **A.** "Give up after one failure" via the prompt still leaves the agent blind to why the reroute failed, so it cannot choose the right recovery such as trying an alternate hub.
- **C.** Returning a false success hides a real failure and leaves the parcel misrouted, which is more dangerous than the original opaque error.
- **D.** A larger model still cannot recover reliably from a result that carries no information about the cause or the next action.

**References:**

- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [ツール利用の実装](https://docs.claude.com/en/docs/agents-and-tools/tool-use/implement-tool-use)

---

### Q31 Correct: C (D5 — Context Management & Reliability)

An unchanging static prefix repeated across 25,000 sessions is exactly what prompt caching is for; caching it skips reprocessing those input tokens and lowers both cost and time-to-first-token. Context editing then trims the accumulated, no-longer-needed track_shipment results so long investigations do not bloat the window. Both act on the true drivers — the re-sent prefix and the growing context.

**Why the others are wrong**

- **A.** Putting the changing case data first makes the prefix non-static and breaks the cache hit, worsening the cost and latency it was meant to fix.
- **B.** Capping max_tokens only trims output and degrades notifications; it does not reduce the reprocessing of the static prefix that dominates cost.
- **D.** A larger model does not change the fact that the same prefix is reprocessed every session, and it typically raises cost rather than lowering it.

**References:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)
- [context editing](https://docs.claude.com/en/docs/build-with-claude/context-editing)
- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

### Q32 Correct: B (D3 — Prompt Engineering & Structured Output)

Malformed JSON slipping in is rooted in the absence of format enforcement and a validation boundary. Enforcing the shape with a schema, validating on the receiving side, and returning the concrete parse error to Claude to retry lets the occasional probabilistic break be rejected and self-healed before it reaches downstream. Reliability comes from validation plus retry on the harness side, not from asking nicely.

**Why the others are wrong**

- **A.** An emphasized request only lowers the probability of stray text; it neither eliminates preamble nor validates the result, so the batch can still be blocked by the next deviation.
- **C.** Regex extraction cannot repair a structurally broken document and performs no schema validation, so it forwards invalid content downstream instead of catching it.
- **D.** A larger model still produces probabilistic output and guarantees neither preamble-free responses nor schema conformance; it is no substitute for a validation boundary.

**References:**

- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)
- [エラー種別とリトライ](https://docs.claude.com/en/api/errors)

---

### Q33 Correct: C (D3 — Prompt Engineering & Structured Output)

Untrusted or ambiguous document content is addressed by structurally separating it from trusted instructions. Delimiting the contract body with XML tags and defining tagged content as data-only establishes a boundary so imperative phrasing in the body cannot be promoted to an instruction. Establishing the boundary is more reliable than a caution note that leaves instructions and data on the same plane.

**Why the others are wrong**

- **A.** A reminder sentence creates no boundary; instructions and data still share one plane, so cleverly worded clause text can still be read as a directive.
- **B.** Temperature does not govern whether text is parsed as instruction or data; the interfering structure remains and low temperature can even make Claude follow the phrasing more consistently.
- **D.** Rejecting every contract with command-like wording halts legitimate agreements at scale, sacrificing throughput to avoid a problem that a data boundary solves without loss.

**References:**

- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)
- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)

---

### Q34 Correct: D (D3 — Prompt Engineering & Structured Output)

Enum drift is fixed by constraining the output shape and anchoring the mapping, not by hoping the model remembers the vocabulary. A strict schema with the enum, a handful of few-shot examples showing each label in use, and receiving-side validation together make out-of-vocabulary labels both less likely and mechanically rejectable. Control lives in the schema and the validation boundary rather than in the model's word choice.

**Why the others are wrong**

- **A.** Listing the labels in the prompt only lowers the probability of drift and performs no validation, so a stray value still passes to downstream and breaks the schema.
- **B.** max_tokens governs output length, not label conformance; more room to reason does nothing to constrain the field to the allowed enum values.
- **C.** A more capable model still produces probabilistic output and does not guarantee enum conformance; without validation an invalid label is neither prevented nor caught.

**References:**

- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)
- [プロンプトエンジニアリング概要](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview)

---

### Q35 Correct: A, C (D3 — Prompt Engineering & Structured Output)

Prefilling the assistant turn with the JSON's opening token removes the model's freedom to emit a preamble, anchoring the response to the intended structure from the first character. Declaring the schema as a structured-output constraint enforces the shape rather than requesting it. Both act on the mechanics of generation, so they raise first-pass conformance instead of leaving it to chance.

**Why the others are wrong**

- **B.** Higher temperature increases output variance, which makes malformed or off-schema JSON more likely, not less; it works against first-pass conformance.
- **D.** A capitalized request only lowers the probability of stray text and adds no enforcement; the fragile free-form parse fails the same way on the next deviation.

**References:**

- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)
- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)

---

### Q36 Correct: A (D1 — Agentic Architecture & Orchestration)

When one work item is too large for a single reliable pass, the fix is to decompose it into bounded units, process each in a clean context, and reconcile coverage at merge. Chunking the contract, running extraction per section, and checking that sections analyzed equal sections dispatched turns silent omission into a detectable gap. This is the parallelization-and-reconciliation shape, matched to the size of the input.

**Why the others are wrong**

- **B.** A larger context window lets the whole contract be sent, but attention can still thin out over a very long single pass, and there is no coverage check to catch an omitted section — the failure mode persists.
- **C.** A prompt request to be thorough does not change the structure that causes later-section omissions and provides no mechanism to verify that every clause was captured.
- **D.** Truncating to 40 pages discards clauses in the remaining pages, producing an incomplete analysis and defeating the purpose of reviewing the full contract.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [サブエージェント（文脈隔離）](https://docs.claude.com/en/api/agent-sdk/subagents)

---

### Q37 Correct: B (D4 — Tool Design & MCP Integration)

The shape of a tool call is governed by the tool's input schema, so a loose schema is what allows malformed arguments. Declaring typed fields, required keys, and enums constrains the call at the definition level and lets malformed invocations be rejected rather than passed through. Well-specified tool schemas are how an agent's tool-call accuracy is secured, not prompt-side pleading.

**Why the others are wrong**

- **A.** A prompt instruction is probabilistic and adds no enforcement; with the schema still loose, malformed arguments continue to pass validation-free into the tool.
- **C.** Renaming is cosmetic and conveys nothing about required structure; the loose schema that permits malformed arguments is unchanged.
- **D.** More prose examples may nudge behavior but leave the underlying loose schema in place, so the tool still accepts malformed calls.

**References:**

- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [ツール利用の実装](https://docs.claude.com/en/docs/agents-and-tools/tool-use/implement-tool-use)

---

### Q38 Correct: D (D4 — Tool Design & MCP Integration)

Whether an invalid package can be routed onward must not depend on the model's self-check. Enforcing at the harness that send_to_counsel requires a schema-valid document, and diverting failures to a review queue, makes routing an invalid package structurally impossible while keeping valid ones flowing. The control sits on the precondition, not on the model's judgment.

**Why the others are wrong**

- **A.** A prompt instruction to verify is probabilistic and offers no guarantee; an invalid package can still be routed whenever the model's self-check misses.
- **B.** Morning triage is after-the-fact detection: the invalid package has already reached counsel and blocked the batch, so the harm the question targets is not prevented.
- **C.** A more capable model still makes probabilistic decisions and provides no guarantee that an invalid package is never routed; the missing enforcement boundary is the real gap.

**References:**

- [Agent SDK の権限制御（human-in-the-loop）](https://docs.claude.com/en/api/agent-sdk/permissions)
- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)

---

### Q39 Correct: C (D2 — Claude Code Configuration & Workflows)

Cross-team bleed happens because one team's rules sit in the context every team loads. A layered memory structure fixes the root cause: the shared baseline lives in the committed root CLAUDE.md so it reaches everyone, while each team's specifics live in a directory-scoped rules file that only loads when working in that team's area. Both are committed, so changes are versioned and maintainable.

**Why the others are wrong**

- **A.** Packing every team's rules into one file and asking teams to ignore the irrelevant sections leaves all conventions in the same context, so the interference persists — a prompt request cannot create the scoping that is missing.
- **B.** Per-developer personal setups are exactly the drift a shared baseline is meant to prevent; the common policy no longer reliably reaches anyone and the four teams cannot be kept consistent or auditable.
- **D.** A more capable model does not substitute for a written specification; conventions like forbidden SDK calls and required audit logging are policy, not something to be guessed, and inference is not versionable or reviewable.

**References:**

- [CLAUDE.md によるメモリ](https://docs.claude.com/en/docs/claude-code/memory)
- [Claude Code 設定](https://docs.claude.com/en/docs/claude-code/settings)

---

### Q40 Correct: B (D2 — Claude Code Configuration & Workflows)

The requirement — one procedure, run identically, centrally updatable, and rollback-able — is exactly what an organization-managed plugin provides: group targeting, version-controlled updates from a connected repo, and a path back to a prior version. That governance is what was missing when a bad edit shipped org-wide with no way to revert.

**Why the others are wrong**

- **A.** An org-provisioned skill reaches everyone but has no version pinning or native rollback; updates require a manual re-upload — this is precisely the mechanism that failed when the bad edit could not be reverted.
- **C.** Project skills version with each separate repository, so four teams would drift apart rather than run the procedure identically, and there is no central place for compliance to update or revoke it.
- **D.** Hand-copying the text into four rules files reintroduces manual drift and forgotten updates; there is no single governed artifact, no shared version, and no rollback.

**References:**

- [Skills](https://docs.claude.com/en/docs/claude-code/skills)
- [Claude Code 設定](https://docs.claude.com/en/docs/claude-code/settings)

---

### Q41 Correct: A (D2 — Claude Code Configuration & Workflows)

Control belongs in the harness-side permission posture, differentiated by tool impact. Allowing safe read-only ticket-tracker tools while gating the feature-flag server's production-mutating tools behind explicit approval (or denying them) means an accidental or misdirected call cannot flip a prod flag, without disabling the safe capabilities the teams rely on. This is least privilege applied per tool.

**Why the others are wrong**

- **B.** A request in CLAUDE.md does not constrain what tools can be invoked; the production-mutating tool stays connected and reachable, so the same accidental flag change can recur — this is compensating-control theater.
- **C.** Removing the feature-flag server eliminates the risk but also the legitimate flag-management capability; it is an overreach when the safe path is to gate only the production-mutating tools.
- **D.** A larger model still has the production-mutating tools fully enabled and no permission boundary; model capability does not prevent an unsafe or accidental call.

**References:**

- [Claude Code 設定](https://docs.claude.com/en/docs/claude-code/settings)
- [MCP（Anthropic ドキュメント）](https://docs.claude.com/en/docs/agents-and-tools/mcp)

---

### Q42 Correct: A, D (D2 — Claude Code Configuration & Workflows)

The two requirements map to two harness-side controls. Denying the production deploy scripts in the permission settings keeps the prod-reaching action out of the agent's reach regardless of what it outputs (production access controlled). Routing every AI-driven change through the pull-request review gate puts a human in the loop to review and vouch for it before it ships (changes reviewable). Both are enforced by structure, not by trust or model behavior.

**Why the others are wrong**

- **B.** Temperature governs output variance, not whether a dangerous command can run or whether a change is reviewed; it touches neither requirement and only makes behavior harder to reason about.
- **C.** A chat broadcast relies on 40 people remembering a rule; it creates no enforced boundary on the deploy scripts and no review gate, so the exposure remains despite looking like a responsible response.

**References:**

- [Claude Code 設定](https://docs.claude.com/en/docs/claude-code/settings)
- [Claude Code のセキュリティモデル](https://docs.claude.com/en/docs/claude-code/security)

---

### Q43 Correct: C (D2 — Claude Code Configuration & Workflows)

The incident was judgment erosion: output shipped because it looked right and tests were green, but no one could explain or had checked its security. A verification checklist turns that intention into a repeatable gate covering correctness, security, maintainability, and the human-understanding check that the author can explain the change — applied before merge, so unreviewable output cannot reach production.

**Why the others are wrong**

- **A.** Green tests speak only to the behavior they exercise; the leak came through an unvalidated input the tests never covered, so treating passing tests as the whole of review is exactly what let it through — true but insufficient.
- **B.** Summaries audited monthly after shipping is after-the-fact detection; it does not stop an unreviewed change from reaching production, which is what compliance is asking to prevent.
- **D.** A more capable model does not remove the need to review and vouch for a change; assuming less review is needed is precisely the judgment erosion that caused the incident.

**References:**

- [ベストプラクティス](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code のセキュリティモデル](https://docs.claude.com/en/docs/claude-code/security)

---

### Q44 Correct: B (D2 — Claude Code Configuration & Workflows)

Adoption is engineered through champions and batches. A champion per team — especially the skeptical ones — proves a real workflow, absorbs the early friction, and builds local examples before the broad rollout, so peers see a working practice rather than a mandate. This directly addresses skeptics burned before and prevents the lumpy adoption a quota cannot fix.

**Why the others are wrong**

- **A.** A usage quota measures activity, not value, and forcing skeptics who were already burned tends to harden resistance; it produces compliance theater rather than a workflow anyone trusts.
- **C.** A stronger model does not change whether the tool fits their workflow; capability alone does not win over people whose objection is about a prior broken promise, not raw output quality.
- **D.** Waiting for skeptics to volunteer is how adoption stays lumpy — a few heavy users and the rest untouched — so the practice never standardizes and the gain is never realized.

**References:**

- [ベストプラクティス](https://www.anthropic.com/engineering/claude-code-best-practices)

---

### Q45 Correct: D (D5 — Context Management & Reliability)

The symptoms — slow first response and lost focus — come from a bloated, mostly-irrelevant context loaded on every session. The fix is context engineering: keep the root CLAUDE.md lean, scope team specifics to rules files that load only where relevant so each session carries only what it needs, and cache the stable shared prefix to cut the repeated preamble cost. Less, relevant context restores both latency and focus.

**Why the others are wrong**

- **A.** A developer skimming does not change what the model ingests; the whole file still enters context every session, so latency and the loss of focus are unaffected.
- **B.** max_tokens caps output length, not input context; it does nothing about the oversized prefix that is driving the slow first response and the drift in long sessions.
- **C.** A larger context window lets the bloat fit but does not make it relevant; irrelevant context still slows the first token and distracts the model — capability is no substitute for pruning what is loaded.

**References:**

- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [CLAUDE.md によるメモリ](https://docs.claude.com/en/docs/claude-code/memory)
- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)

---

### Q46 Correct: B (D1 — Agentic Architecture & Orchestration)

Cross-competitor contamination is rooted in unrelated research sharing one context window. Assigning a subagent per competitor gives each research task an isolated context concerned only with its own sources, so one competitor's facts physically cannot bleed into another's, and the units fan out in parallel under the supervisor. Context isolation is the core benefit of the fan-out multi-agent pattern.

**Why the others are wrong**

- **A.** A prompt request to keep facts separate does not change the fact that all competitors still coexist in one context, so the bleed persists probabilistically.
- **C.** A larger window still packs every competitor into one shared context; more room does not stop cross-contamination and can make later-stage degradation worse.
- **D.** Three-at-a-time still mixes multiple competitors in the same context, so contamination only shrinks rather than disappears, and five sequential passes is not parallelization.

**References:**

- [マルチエージェント調査システムの設計](https://www.anthropic.com/engineering/multi-agent-research-system)
- [サブエージェント（文脈隔離）](https://docs.claude.com/en/api/agent-sdk/subagents)

---

### Q47 Correct: A, C (D1 — Agentic Architecture & Orchestration)

A confident summary built over incomplete work is the signature failure of fan-out. A deterministic coverage check that requires returned unit IDs to equal dispatched unit IDs (A) catches the silent drop before anyone reads the brief, and validating each return so a failed or empty unit is retried or flagged (C) recovers the recoverable subagent failures instead of letting them pass. Both put the guarantee in the harness, not in the model's diligence.

**Why the others are wrong**

- **B.** Asking the supervisor to double-check is probabilistic self-report; it provides no deterministic reconciliation, so a timed-out unit can still be counted as covered.
- **D.** A larger model does not add a coverage check either; without reconciling dispatched against returned units, a missing competitor stays invisible regardless of model size.

**References:**

- [マルチエージェント調査システムの設計](https://www.anthropic.com/engineering/multi-agent-research-system)
- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q48 Correct: A (D1 — Agentic Architecture & Orchestration)

An open-loop subagent cannot guarantee its own stopping condition, so the stopping condition must be enforced by the harness. A per-subagent iteration cap and time budget structurally bound the runaway and, by returning flagged partial findings, protect the shared 4-hour window without stalling the rest of the fleet. Stopping criteria and per-turn budgets are harness controls, not model behaviors.

**Why the others are wrong**

- **B.** A prompt request to stop is probabilistic and gives no guarantee against looping, leaving the structural absence of a stopping condition unaddressed.
- **C.** A dashboard and next-morning investigation is after-the-fact detection; it does not stop the loop that already consumed the window.
- **D.** A larger model can still loop when nothing bounds its iterations, and it does not enforce a deadline; scale is no substitute for a budget.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q49 Correct: D (D1 — Agentic Architecture & Orchestration)

The supervisor only needs each subagent's distilled conclusions, not the raw pages it read. Returning a compact structured summary keeps the untrusted, high-volume source text inside the subagent's own context and hands the supervisor just the synthesized findings, which lowers cost and preserves synthesis quality. Deciding what each subagent returns is a context-engineering decision, not a model-size one.

**Why the others are wrong**

- **A.** A bigger window still forces the supervisor to reprocess every raw page, so cost and quality dilution remain; it treats a design problem as a capacity problem.
- **B.** A prompt request to be brief does not reliably bound what the model pastes back and still risks whole pages leaking into the supervisor's context.
- **C.** Dropping competitors sacrifices the deliverable's coverage to shrink returns, an overreach that abandons the goal rather than fixing the return contract.

**References:**

- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [マルチエージェント調査システムの設計](https://www.anthropic.com/engineering/multi-agent-research-system)

---

### Q50 Correct: C (D3 — Prompt Engineering & Structured Output)

Returns that a downstream stage machine-assembles must have their shape guaranteed, not requested. A strict schema enforced with structured output plus client-side validation and a retry on failure mechanically rejects and self-heals malformed or incomplete returns before the assembler ever sees them, so a missing competitorId or pricing field cannot silently drop a competitor.

**Why the others are wrong**

- **A.** A request to return clean JSON is probabilistic; without validation, a missing field or stray preamble still breaks the parse the same way.
- **B.** Regex extraction cannot repair a missing field or an ambiguous competitor block, and forcing a parse pushes the corruption further downstream.
- **D.** Temperature does not enforce a schema; formatting can still vary and fields can still be omitted, leaving the parse failures untouched.

**References:**

- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)
- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)

---

### Q51 Correct: B (D3 — Prompt Engineering & Structured Output)

Indirect prompt injection is addressed by structurally separating untrusted data from trusted instructions. Delimiting fetched content with XML tags and declaring that everything inside is data to analyze, not commands to follow, keeps the boundary explicit so embedded text cannot be promoted to an instruction. Establishing the boundary is far more reliable than a caution note on the same plane as the data.

**Why the others are wrong**

- **A.** A do-not-obey request creates no boundary; instructions and data still share the same plane, so a well-crafted injection can still be followed.
- **C.** Temperature has nothing to do with injection resistance; the structure that reads embedded text as an instruction remains and could even be followed deterministically.
- **D.** Domain blocklisting halts legitimate research on those competitors, an overreach that harms coverage while still not isolating instructions from data.

**References:**

- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)

---

### Q52 Correct: D (D4 — Tool Design & MCP Integration)

Distributing to 300 executives is irreversible and high-impact, so whether it fires must not rest on the model's judgment. A human-in-the-loop gate at the permission layer means that even a well-crafted injection or a premature model decision cannot distribute the brief without a person approving it — the control sits on the permission side, where it can be proven and cannot be talked out of.

**Why the others are wrong**

- **A.** A prompt rule is probabilistic and is exactly what the injection overrides; it provides no enforcement before the irreversible send.
- **B.** Logging and a follow-up correction is after-the-fact detection; the brief has already reached 300 executives and cannot be recalled.
- **C.** Renaming the tool is superficial; it changes no control and still leaves the execution decision to the model's discretion.

**References:**

- [Agent SDK の権限制御（human-in-the-loop）](https://docs.claude.com/en/api/agent-sdk/permissions)
- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)

---

### Q53 Correct: C (D5 — Context Management & Reliability)

An identical, unchanging prefix repeated across many calls is exactly what prompt caching targets. Caching the brief, rubric, and tool definitions skips reprocessing those input tokens from the second subagent call onward, cutting cost and time-to-first-token across all fifteen calls without removing any capability, and placing only the per-competitor content after the cache keeps the cached prefix stable.

**Why the others are wrong**

- **A.** Trimming the rubric sacrifices analysis quality and still reprocesses whatever prefix remains on every call, missing the reuse win entirely.
- **B.** A faster model still reprocesses the same static prefix each call; it does not eliminate the redundant reprocessing that drives the cost.
- **D.** max_tokens caps output tokens and does nothing about the input-side static prefix that is actually dominating cost and latency.

**References:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)
- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

### Q54 Correct: B (D1 — Agentic Architecture & Orchestration)

Reproducing a fixed regulated string exactly is a deterministic requirement that must be right every time, and next-token generation is probabilistic — it will drift on verbatim strings no matter how it is instructed. The four-properties lens assigns the disclosure to deterministic template code and leaves the model only the personalization it is genuinely good at, so the verbatim guarantee no longer depends on the model.

**Why the others are wrong**

- **A.** Repeating an instruction only lowers the probability of paraphrase; it cannot guarantee a byte-exact string, so a deterministic legal requirement is still riding on a probabilistic system.
- **C.** A larger model reproduces long strings more often but still not with certainty, and it leaves the verbatim guarantee inside model generation where it does not belong.
- **D.** A nightly comparison only detects violations after notices may already have been mailed; it is after-the-fact monitoring, not prevention of the drift itself.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q55 Correct: A (D1 — Agentic Architecture & Orchestration)

The path here is knowable in advance, so it belongs in code, not in a model's open loop. A deterministic workflow makes cost and runtime predictable and makes step-skipping and looping structurally impossible, while the agent's non-determinism is confined to the small slice of work that genuinely needs judgment. Matching the control structure to the shape of the task is the core workflow-versus-agent decision.

**Why the others are wrong**

- **B.** A prompt request is not enforcement; as long as an open loop owns the control flow, step-skipping and looping can recur regardless of the instruction.
- **C.** max_tokens governs output length, not step compliance; enlarging it does nothing about a missing deterministic control structure and is an irrelevant adjustment.
- **D.** A larger model does not change the open-loop structure that permits skips and loops; it only raises cost while the root cause remains.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q56 Correct: D (D3 — Prompt Engineering & Structured Output)

Preamble and missing fields are the absence of format enforcement and validation, not a wording problem. A schema plus structured output constrains the shape, client-side validation catches any field that still slips, and a retry on failure absorbs the occasional break without dropping the notice. Reliability is secured by validation and retry on the harness side, not by asking nicely.

**Why the others are wrong**

- **A.** Prompt emphasis and a lower temperature only reduce the probability of malformed output; without validation, a missing premium_change field still reaches the merge and still throws.
- **B.** Regex extraction cannot reconstruct a missing field and performs no validation, so it pushes broken data downstream rather than catching it.
- **C.** A larger model still emits probabilistic output with no guaranteed shape, and with no validation boundary a dropped field goes undetected while cost rises.

**References:**

- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)
- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)

---

### Q57 Correct: C (D3 — Prompt Engineering & Structured Output)

A verbatim requirement against a known canonical string is exactly a deterministic check, which is provable and cannot be talked out of its decision. Placing a byte-for-byte comparison on the harness path before the irreversible print blocks any altered disclosure and diverts it to human review, so a non-conforming notice can never reach the mail. Control sits on the harness side, ahead of the irreversible action.

**Why the others are wrong**

- **A.** Self-verification in the prompt is still probabilistic and unenforced; the model can assert the disclosure is verbatim while it is not, so no actual gate exists.
- **B.** A judge model "looks compliant" score is fuzzy and evadable, which is the wrong tool for a known-string match, and it can wave through a subtly altered disclosure.
- **D.** Next-day sampling only detects violations after the irreversible print has happened, and it inspects a fraction, so it prevents nothing.

**References:**

- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)
- [Agent SDK の権限制御（human-in-the-loop）](https://docs.claude.com/en/api/agent-sdk/permissions)

---

### Q58 Correct: A (D4 — Tool Design & MCP Integration)

An irreversible action on ambiguous input must not be left to the model's confidence. Separating the work by risk — auto-advancing clean matches and gating only out-of-criteria cases behind a permission-layer human approval — stops erroneous prints structurally while preserving automation on the bulk. The control lives in the harness permission layer, ahead of the side effect, rather than in the model's judgment.

**Why the others are wrong**

- **B.** A prompt request is probabilistic and gives no guarantee on ambiguous input; the irreversible tool stays reachable with no gate before it fires.
- **C.** A richer description may reduce misuse but still leaves the execute-or-not decision to the model, so an erroneous irreversible print remains possible.
- **D.** Next-day reconciliation only catches prints that have already been mailed; it detects after the fact and does not prevent the irreversible action.

**References:**

- [Agent SDK の権限制御（human-in-the-loop）](https://docs.claude.com/en/api/agent-sdk/permissions)
- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)

---

### Q59 Correct: B (D5 — Context Management & Reliability)

A byte-identical static prefix repeated on every call is precisely what prompt caching targets. Marking it with cache_control skips reprocessing those input tokens from the second call onward, and at this repetition frequency both cost and time-to-first-token drop sharply without removing any capability. It directly addresses the cause — re-sending and reprocessing the same prefix every time.

**Why the others are wrong**

- **A.** Trimming the regulated template wording sacrifices required content and still reprocesses whatever prefix remains on every call; it attacks size, not the repeated reprocessing.
- **C.** Model choice is unrelated to reprocessing an identical prefix every call; it does not remove that work and does not lower cost.
- **D.** max_tokens caps output and has no effect on the input-side static-prefix reprocessing that is driving cost and latency — an irrelevant knob.

**References:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)
- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

### Q60 Correct: D (D5 — Context Management & Reliability)

Debugging starts at what changed just before the symptom appeared. A template edit deployed three days earlier is the prime suspect for both signals at once — the disclosure drift and the cost jump from the now-invalidated cache of the edited static prefix. Diffing the changed component against its prior version isolates the cause; the other options act before the changed component has even been examined.

**Why the others are wrong**

- **A.** Upgrading the model ignores the obvious change that preceded the symptom and treats a deployment regression as a model-capability problem, so it fixes nothing and adds cost.
- **B.** A larger thinking budget is unrelated to a wording change in the static prefix; it does not explain the simultaneous cost jump and does not touch the cause.
- **C.** Adding emphasis is a prompt patch applied before the changed component is even inspected, and it leaves the actual regression and the cache-invalidation cost untouched.

**References:**

- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)

---

## Disclaimer / 免責事項

This is independent study material based on the published Anthropic exam blueprints.
It is not affiliated with, endorsed by, or sponsored by Anthropic.
The items are illustrative only and are **NOT** from the live exam bank.

本問題集は、Anthropic が公開している認定試験ブループリントに基づいて独自に作成した学習用教材です。
Anthropic とは無関係であり、Anthropic による承認・推奨を受けたものではありません。
掲載している問題はすべて出題形式を示すための例題であり、実際の試験問題ではありません。