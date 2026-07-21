# Claude Certified Architect – Foundations (CCA-F) — Answer Key & Rationale

## Answer Key & Rationale

**Scoring:** correct ÷ 20 is your accuracy. Approx scaled score = `100 + 900 × accuracy` (pass line 720 ≈ 72% accuracy). Record the domain of every miss and transfer it to the score sheet in README.md.

---

### Q1 Correct: C (D1 — Agentic Architecture & Orchestration)

An open-loop agent cannot guarantee its own stopping condition. A cap on iteration count is a control that must be enforced by the harness (the orchestration layer), not by the model's judgment; bridging to escalate_to_human when the limit is reached structurally cuts off only the runaway while keeping the business flow running.

**Why the others are wrong**

- **A.** A request in the prompt is probabilistic and does not guarantee a fix for the structural absence of a stopping condition such as looping.
- **B.** A larger model can still loop when there is no stopping condition. Scale is no substitute for a guardrail.
- **D.** Logging and after-the-fact detection do not stop a loop that has occurred. It is mere post-hoc observation, not a preventive control.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q2 Correct: A (D1 — Agentic Architecture & Orchestration)

Cross-category instruction interference is rooted in unrelated context sharing the same window. If a supervisor classifies and delegates to a subagent dedicated to each category, each subagent operates in a context concerned only with its own topic, and the interference structurally disappears. Context isolation is the core benefit of multi-agent design.

**Why the others are wrong**

- **B.** Asking in the prompt to "ignore" does not change the fact that unrelated context coexists, so the interference remains.
- **C.** Increasing max_tokens does not resolve the crossed instructions. If anything, a longer context worsens interference — an irrelevant adjustment.
- **D.** Repacking everything into one context only improves appearances and leaves the root cause of cross-category context interference intact.

**References:**

- [サブエージェント（文脈隔離）](https://docs.claude.com/en/api/agent-sdk/subagents)
- [マルチエージェント調査システムの設計](https://www.anthropic.com/engineering/multi-agent-research-system)

---

### Q3 Correct: B, D (D4 — Tool Design & MCP Integration)

The root cause of mis-selection is duplicated descriptions and blurry boundaries. Stating the responsibility boundary including when not to use a tool (B) and reorganizing into one function per tool so capabilities do not overlap (D) fixes the very cues the model uses to choose. Clarity of tool design determines an agent's selection accuracy.

**Why the others are wrong**

- **A.** Merging every capability into one tool bloats the arguments and breaks least-privilege — an overreach that does not improve selection accuracy.
- **C.** Tuning temperature does not touch the cause (ambiguous descriptions) and leaves selection hit-or-miss to chance — an irrelevant adjustment.

**References:**

- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [ツール利用の実装](https://docs.claude.com/en/docs/agents-and-tools/tool-use/implement-tool-use)

---

### Q4 Correct: A (D4 — Tool Design & MCP Integration)

An actual refund is irreversible and high-impact, so whether to execute must not be left to the model's confidence. A destructive operation should be placed under human-in-the-loop at the permission layer, requiring human approval before execution, so that even in ambiguous cases erroneous execution structurally cannot occur. The principle is to place control on the permission side.

**Why the others are wrong**

- **B.** A request in the prompt is probabilistic and gives no guarantee that erroneous execution won't happen on ambiguous input.
- **C.** An after-the-fact audit only detects refunds that have already gone out; it does not prevent the irreversible execution itself.
- **D.** Making the description more detailed still leaves the execution decision up to the model. It is merely a show of responsibility that leaves the possibility of erroneous execution.

**References:**

- [Agent SDK の権限制御（human-in-the-loop）](https://docs.claude.com/en/api/agent-sdk/permissions)
- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)

---

### Q5 Correct: D (D3 — Prompt Engineering & Structured Output)

Broken JSON creeping in is rooted in the absence of format enforcement and validation. If you enforce the output format with a schema, validate on the receiving side, and add a retry on parse failure, output that probabilistically breaks now and then can be absorbed without halting the pipeline. Reliability is secured by validation plus retry on the harness side.

**Why the others are wrong**

- **A.** Emphasis in the prompt only lowers the probability of format deviation; it neither eliminates breakage nor validates.
- **B.** Regex extraction cannot repair a broken structure and does not validate, so it pushes the downstream damage further downstream.
- **C.** Even a larger model produces probabilistic output; 100% format compliance is not guaranteed and it is no substitute for validation.

**References:**

- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)
- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)

---

### Q6 Correct: B (D5 — Context Management & Reliability)

A static prefix that is identical and unchanging every time is exactly what prompt caching is for. Attaching cache_control to the leading static portion skips reprocessing the input tokens from the second call onward, and the higher the frequency of the same prefix, the more both cost and TTFT structurally drop. It does not cut the agent's capabilities.

**Why the others are wrong**

- **A.** Trimming the prompt or tool definitions is an overreach that sacrifices capability and does not solve the essence of re-sending the static portion.
- **C.** Switching models is irrelevant to the cause of reprocessing the static prefix every time and does not reduce cost either.
- **D.** max_tokens is an output-side cap and does not affect the input-side static-prefix reprocessing that is driving the increase — an irrelevant adjustment.

**References:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)
- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

### Q7 Correct: C (D2 — Claude Code Configuration & Workflows)

As long as it is run by hand, missed steps depend on people and will inevitably occur. A Claude Code hook is a mechanism that deterministically runs validation commands on events such as edits or commits, guaranteeing the steps are executed without relying on human memory. Putting routine steps that should be automated into a harness-side hook is the fundamental fix.

**Why the others are wrong**

- **A.** Verbal or chat broadcasts rely on human memory and cannot structurally prevent the recurring missed step.
- **B.** Upgrading the model does not close the operational gap of developers forgetting to run the validation commands — an irrelevant remedy.
- **D.** After-the-fact discovery in CI logs does not stop the broken commit itself. It is post-hoc detection, not prevention.

**References:**

- [フック](https://docs.claude.com/en/docs/claude-code/hooks)
- [Claude Code 設定](https://docs.claude.com/en/docs/claude-code/settings)

---

### Q8 Correct: B (D2 — Claude Code Configuration & Workflows)

In headless/CI, interactive approval is impossible, so control belongs to the harness-side permissions, not the model's judgment. Making only pre-approved tools executable via `--allowedTools` and leaving the destructive, high-impact `deploy-prod` off the allow list means that no matter what the model outputs, and even if an injection is planted in a PR body, that tool physically cannot be invoked. This is the principle of least privilege itself.

**Why the others are wrong**

- **A.** A confirmation prompt presumes interaction, and in unattended headless there is no one to respond. Adding only a confirmation while the tool stays connected is compensating-control theater that does not remove the root cause (that a dangerous tool can be invoked).
- **C.** A "do not run it" request in the system prompt/memory is not a structural guarantee. It can be broken by the model's interpretation or by injection. Permissions are constrained by the harness, not the prompt.
- **D.** Abolishing the whole pipeline removes the problem (exposure of a dangerous tool) but also stops the business value of automated mechanical review — an overreach. Removing only the dangerous tool achieves both.

**References:**

- [headless / 非対話実行（CI）](https://docs.claude.com/en/docs/claude-code/headless)
- [Agent SDK の権限制御（human-in-the-loop）](https://docs.claude.com/en/api/agent-sdk/permissions)
- [Claude Code のセキュリティモデル](https://docs.claude.com/en/docs/claude-code/security)

---

### Q9 Correct: C (D2 — Claude Code Configuration & Workflows)

CLAUDE.md is a mechanism where project memory automatically enters context at startup. Committing the policy to the repository structurally prevents forgotten pastes, and policy changes are tracked via file update = version control. It replaces the fragile practice of manually embedding into prompt strings with a mechanism the harness guarantees.

**Why the others are wrong**

- **A.** Prompt embedding is a breeding ground for the very human error — a forgotten paste — that caused the incident. A bulk-replace script is symptomatic treatment and gives no guarantee the policy reliably enters at startup.
- **B.** temperature and max_tokens are generation parameters, not a means of carrying a review policy. It is irrelevant knob-twiddling that does not solve the problem.
- **D.** Upgrading the model does not automatically restore a written-out policy (naming conventions, forbidden patterns). A policy is a specification, not something to be guessed at. Basing it on model generations that rot over time is also inappropriate.

**References:**

- [CLAUDE.md によるメモリ](https://docs.claude.com/en/docs/claude-code/memory)
- [Claude Code 設定](https://docs.claude.com/en/docs/claude-code/settings)

---

### Q10 Correct: A (D2 — Claude Code Configuration & Workflows)

A hook is a mechanism the harness always runs, event-driven, regardless of the model's choices. Running the linter/tests in PostToolUse and blocking the write on failure means that even if the model skips execution, a violating patch is stopped at the submission stage. It replaces "hoping the model does it every time" with a deterministic gate.

**Why the others are wrong**

- **B.** Emphasis in the prompt only raises probability; it does not guarantee execution. The structure where the skip can occur remains.
- **C.** The next-morning human audit is after-the-fact detection, not prevention. The very event of the unattended batch producing a violating patch is not stopped.
- **D.** Upgrading the model does not make instruction-following certain, and it is based on model generations that rot over time. Deterministic execution should be secured by a hook.

**References:**

- [フック](https://docs.claude.com/en/docs/claude-code/hooks)
- [Claude Code 設定](https://docs.claude.com/en/docs/claude-code/settings)

---

### Q11 Correct: D (D1 — Agentic Architecture & Orchestration)

Running the deterministic majority through a workflow (fixed sequence) makes cost and runtime predictable, and only the judgment-requiring minority goes to the agent's open loop. It is a design that matches the control method to the nature of the task and does not bring unnecessary exploration into mechanical work. This is exactly the principle of choosing between workflow and agent.

**Why the others are wrong**

- **A.** Entrusting everything to an agent loads the mechanical work with the open loop's cost and non-determinism. Lowering temperature does not yield the predictability that workflow-ization provides.
- **B.** Consolidating on the top-tier model worsens the unpredictability of cost and runtime and still wastefully runs the deterministic 92% through an agent. Raising the level of judgment is not the issue for the mechanical majority.
- **C.** Returning the judgment-requiring 8% to humans is an overreach that cuts automation value, and it also fails to answer the actual question — the execution method (workflow-ization) for the mechanical 92%.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q12 Correct: B (D1 — Agentic Architecture & Orchestration)

A subagent has its own context isolated from the parent. Assigning a subagent per service means each review sees only its own service's diff and conventions, so other services' information cannot physically mix in, and it can fan out in parallel under the supervisor. It cuts off the root cause of cross-contamination through context isolation.

**Why the others are wrong**

- **A.** Reducing the count still leaves the structure of mixing multiple services in the same context; contamination only shrinks, it does not disappear. And 90 sequential runs is not parallelization either.
- **C.** A "do not mix" request in the prompt does not guarantee isolation. As long as other services' information exists in the same context, it can mix in.
- **D.** Widening the window does not change the structure where all services coexist in one context, so contamination is not solved. The more you pack in, the worse the later-stage degradation can get.

**References:**

- [サブエージェント（文脈隔離）](https://docs.claude.com/en/api/agent-sdk/subagents)
- [マルチエージェント調査システムの設計](https://www.anthropic.com/engineering/multi-agent-research-system)
- [サブエージェント](https://docs.claude.com/en/docs/claude-code/sub-agents)

---

### Q13 Correct: A (D3 — Prompt Engineering & Structured Output)

For output that a downstream stage machine-processes, guaranteeing the shape with a schema is the fundamental fix. Enforcing the fields (target file, line, finding, patch) with structured output makes parsing reliable regardless of heading or delimiter variation and eliminates the fragile regex extraction. The requirement (auto-posting, auto-applying) maps one-to-one to the nature of the output (machine-readable).

**Why the others are wrong**

- **B.** A request to "return clean JSON" does not guarantee the format. If variation remains, the regex parse fails the same way. It tries to solve a structural problem with a prompt request.
- **C.** Increasing max_tokens helps with mid-way cutoff but does not solve the main cause — parse failures from heading and delimiter variation. Irrelevant knob-twiddling.
- **D.** The manual fallback is after-the-fact patching and does not prevent the parse failure itself. It also runs counter to the goal of unattended automation.

**References:**

- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)
- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)

---

### Q14 Correct: C (D5 — Context Management & Reliability)

Prompt caching works on an unchanging static prefix. Fixing the CLAUDE.md, subagent definitions, and forbidden patterns at the head to cache them, and placing only the service-specific diff after them, greatly reduces the reprocessing cost and latency of the static portion across 900 calls. It directly targets the main cause — "repeatedly re-sending the same prefix."

**Why the others are wrong**

- **A.** Caching works on the leading static prefix, so placing the changing diff at the head breaks the cache hit — counterproductive. The reordering is in the wrong direction.
- **B.** Lowering max_tokens does not reduce the reprocessing of the static prefix that dominates cost and latency. It only invites quality degradation by trimming findings — irrelevant knob-twiddling.
- **D.** Upgrading the model does not change the structure of reprocessing the static prefix every time; the re-send cost remains. Basing it on model generations that rot over time is also inappropriate.

**References:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)
- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

### Q15 Correct: B (D3 — Prompt Engineering & Structured Output)

Structure is secured by validation, not a "request." Placing a schema definition plus client-side schema validation at the boundary and returning the error to retry on failure mechanically rejects and self-heals invalid output before it reaches downstream. Because control is on the harness side, it does not depend on the mood of the model or prompt.

**Why the others are wrong**

- **A.** A prompt request and temperature tuning cannot guarantee structure. Without validation, missing fields still slip downstream (prompt-only-fix / knob-twiddling).
- **C.** A larger model is no guarantee of structure, and without validation missing fields cannot be detected. Only cost rises while the root cause (absence of a validation boundary) remains.
- **D.** Nightly manual entry is after-the-fact patching and does not prevent invalid output from reaching downstream. It harms both immediacy and automation rate.

**References:**

- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)
- [エラー種別とリトライ](https://docs.claude.com/en/api/errors)

---

### Q16 Correct: C (D3 — Prompt Engineering & Structured Output)

Untrusted input (partner-supplied text) is fundamentally addressed by structurally isolating it from trusted instructions. Making the boundary between instructions and data explicit with XML tags and defining content inside the tags as data only prevents commands in the body from being promoted to instructions. Establishing the boundary itself is more reliable than a caution note in the prompt.

**Why the others are wrong**

- **A.** A "do not follow" request creates no boundary. Instructions and data still coexist on the same plane, so a cleverly embedded injection can still slip through (prompt-only-fix).
- **B.** temperature is unrelated to injection resistance. The structure that interprets anomalous text as an "instruction" remains, and it may even be followed deterministically (knob-twiddling).
- **D.** Stopping ingestion per partner is an overreach that halts the business, harming the goal of processing 40,000 invoices. Many legitimate invoices are caught in the crossfire (over-restriction).

**References:**

- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)

---

### Q17 Correct: A, D (D4 — Tool Design & MCP Integration)

Separate risk by mechanism. Passing only low-risk (matching, non-high-value) cases automatically and putting only the out-of-criteria ones on a human approval gate preserves the 80% automation rate and immediacy while stopping only the high-impact erroneous payments (A). Further, enforcing at the harness that "a successful match is a precondition for calling schedule_payment" structurally prevents unmatched payments (D). Both keep control on the harness side and do not depend on the model's judgment.

**Why the others are wrong**

- **B.** A prompt request has no enforcement power, and even if Claude states it "re-checked," that is no actual prevention. A high-impact tool remains connected with no boundary (prompt-only-fix).
- **C.** Reviewing every case by hand does eliminate erroneous payments but simultaneously eliminates the 80%-automation and immediacy requirements. An overreach that violates the requirements (over-restriction).

**References:**

- [Agent SDK の権限制御（human-in-the-loop）](https://docs.claude.com/en/api/agent-sdk/permissions)
- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)

---

### Q18 Correct: B (D4 — Tool Design & MCP Integration)

When to use a tool is fundamentally written in the tool description itself. Stating, in addition to "what it does," the "conditions under which it must not be used (on mismatch/high-value, go to flag_for_review)" and making the input schema strict closes off the room for Claude to misuse it at the definition level. Tools for agents should be described including the situations in which their use is prohibited.

**Why the others are wrong**

- **A.** Renaming is superficial and does not convey the prohibited-use conditions. Changing the name gives no basis in the definition for not calling it on a mismatch (knob-twiddling).
- **C.** Increasing confirmation prompts looks like a responsible response, but the tool stays connected and the prohibited conditions are still undefined, so it does not fix the root cause (sounds-responsible).
- **D.** Deleting the tool removes misuse but also stops automation (the 80% goal) — an overreach. Fixing the description reduces misuse while preserving automation (over-restriction).

**References:**

- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [ツール利用の実装](https://docs.claude.com/en/docs/agents-and-tools/tool-use/implement-tool-use)

---

### Q19 Correct: A (D1 — Agentic Architecture & Orchestration)

The principle is to put deterministic sequences in a workflow and leave only the ambiguous, judgment-requiring part to an agent. Making the fixed order and branching a control structure on the code side means matching-skips and unnecessary loops structurally cannot occur. The open loop is limited to where uncertainty is inherently needed (review routing).

**Why the others are wrong**

- **B.** max_tokens is unrelated to step compliance. As long as control is entrusted to the model's memory, step-skipping and looping will recur (knob-twiddling).
- **C.** A prompt request is not enforcement, and it cannot guarantee ordering while remaining an open loop. It leaves to the model what should be deterministic (prompt-only-fix).
- **D.** A larger model does not change the open-loop structure and does not guarantee step compliance. Only cost rises while the root cause remains (bigger-model).

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q20 Correct: D (D5 — Context Management & Reliability)

A repeated static prefix is exactly what prompt caching works on. Fixing the stable portion at the head to cache it structurally lowers cost and latency across the 40,000 repetitions. For transient errors, an idempotent retry plus backoff adds fault tolerance while a design that does not re-run an already-completed payment schedule also prevents double payments.

**Why the others are wrong**

- **A.** Placing the body at the head and the instruction at the tail makes the prefix unstable and disables prompt caching. It worsens the cost/latency problem (true-but-irrelevant).
- **B.** Unconditionally restarting from the beginning can re-call an already-successful schedule_payment and cause a double payment. It looks responsible but is not idempotent (sounds-responsible).
- **C.** Removing the matching rules discards necessary logic — an overreach. Matching accuracy drops and the premise of 80% automation collapses (over-restriction).

**References:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)
- [エラー種別とリトライ](https://docs.claude.com/en/api/errors)

---

## Disclaimer / 免責事項

This is independent study material based on the published Anthropic exam blueprints.
It is not affiliated with, endorsed by, or sponsored by Anthropic.
The items are illustrative only and are **NOT** from the live exam bank.

本問題集は、Anthropic が公開している認定試験ブループリントに基づいて独自に作成した学習用教材です。
Anthropic とは無関係であり、Anthropic による承認・推奨を受けたものではありません。
掲載している問題はすべて出題形式を示すための例題であり、実際の試験問題ではありません。