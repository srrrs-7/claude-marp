# Claude Certified Developer – Foundations (CCDV-F) — Answer Key & Rationale

## Answer Key & Rationale

**Scoring:** correct ÷ 20 is your accuracy. Approx scaled score = `100 + 900 × accuracy` (pass line 720 ≈ 72% accuracy). Record the domain of every miss and transfer it to the score sheet in README.md.

---

### Q1 Correct: B (D2 — Applications & Integration)

The requirements are high volume, no need for immediacy, and cost above all — which is exactly what the Message Batches API is designed for. Asynchronous batch processing costs less than synchronous calls, and an overnight deadline fits comfortably inside the 24-hour window, so it structurally lowers cost while satisfying the requirements.

**Why the others are wrong**

- **A.** Synchronous, parallel calls are fastest, but speed is not a requirement here and this runs directly counter to the cost-first constraint. Being fast is fine in itself, but it does not solve the problem being asked.
- **C.** Lowering max_tokens only trims the output and the savings are small and non-structural. It never touches the real cost driver — the absence of batch processing.
- **D.** Uniformly switching to the smallest model is an overreaction that sacrifices summarization and classification quality, throwing away business value in the name of cost.

**References:**

- [Message Batches API（大量・非同期・低コスト）](https://docs.claude.com/en/docs/build-with-claude/batch-processing)
- [Messages API](https://docs.claude.com/en/api/messages)

---

### Q2 Correct: C (D2 — Applications & Integration)

The core of the complaint is the blank interval before the first character appears, not the total generation time. Streaming returns tokens as they are generated, so text starts appearing without waiting for completion, directly improving perceived latency. It changes perception without changing total time — exactly what the requirement asks for.

**Why the others are wrong**

- **A.** A larger model is not necessarily faster and may in fact be slower. This mistakes a perception problem — the blank interval — for a model-performance problem.
- **B.** Extending the timeout addresses disconnects and looks like stabilization, but it has no effect on the blank interval before the first content appears.
- **D.** Shortening the response harms answer quality, and even a short response still leaves a blank interval until completion without streaming. This misses the point by tweaking a parameter.

**References:**

- [ストリーミング](https://docs.claude.com/en/docs/build-with-claude/streaming)
- [Messages API](https://docs.claude.com/en/api/messages)

---

### Q3 Correct: A (D2 — Applications & Integration)

429/529 are transient errors, the kind that mostly succeed if resent after a delay. Retries with exponential backoff automatically resend while avoiding synchronized bursts and respecting Retry-After, turning permanent failures into temporary delays. It is the proper approach of placing control on the harness side.

**Why the others are wrong**

- **B.** Log collection is merely after-the-fact visibility; the failed requests are never recovered. It is a detect-after-the-fact response that does nothing to prevent or recover.
- **C.** temperature only changes the randomness of the output and has nothing to do with rate limiting or overload. It is fiddling with an unrelated parameter.
- **D.** Model size is unrelated to resolving rate limits or overload responses, and may in fact worsen the load or the limits.

**References:**

- [エラー種別とリトライ](https://docs.claude.com/en/api/errors)
- [レート制限](https://docs.claude.com/en/api/rate-limits)

---

### Q4 Correct: D (D2 — Applications & Integration)

Claude's Vision can take images and PDFs directly as input and understand their visual content. Passing the scanned PDFs as-is for field extraction satisfies the requirement without building a separate external OCR. The input form (image PDF) maps one-to-one to the capability (Vision).

**Why the others are wrong**

- **A.** Manually transcribing everything looks like a responsible operation, but it does not scale at 800/day and creates cost and delay. It works around, by hand, something a capability can solve.
- **B.** Classifying by filename alone never reads the amount or due date in the body and does not satisfy the extraction requirement.
- **C.** Increasing model size does not change the fact that the input is an image; on a text-only assumption you are still not passing the content.

**References:**

- [Vision（画像・PDF入力）](https://docs.claude.com/en/docs/build-with-claude/vision)
- [Messages API](https://docs.claude.com/en/api/messages)

---

### Q5 Correct: A, C (D2 — Applications & Integration)

There are two proper axes for handling rate limits: (A) resilience that resends transient 429s with backoff to recover what would otherwise be lost, and (C) throughput control that actively paces your sending given your rate ceiling and, if needed, raises your allocation via a service tier. Combining both preserves availability and throughput at the same time.

**Why the others are wrong**

- **B.** Model size is unrelated to the rate-limit allocation and does not resolve the exceedance itself. It is the error of thinking a bigger model solves everything.
- **D.** Immediately discarding on 429 is an overreaction that throws away work on a transient error and actually lowers availability. The problem goes away, but so does the business function.

**References:**

- [レート制限](https://docs.claude.com/en/api/rate-limits)
- [サービスティア](https://docs.claude.com/en/api/service-tiers)
- [エラー種別とリトライ](https://docs.claude.com/en/api/errors)

---

### Q6 Correct: B, D (D2 — Applications & Integration)

The two requirements each map one-to-one to a distinct capability. (1) High volume, no immediacy, cost-first is the domain of the Message Batches API (B). (2) A perception problem where total time is acceptable but you want the first content to appear sooner is directly solved by streaming (D). The nature of each requirement matches the nature of each capability.

**Why the others are wrong**

- **A.** Synchronous, parallel calls are fast but run counter to the cost-first requirement, needlessly paying a premium for overnight work that has no need for immediacy. Being fast is fine in itself, but it misses the requirement.
- **C.** max_tokens=1 truncates the response to a single token and just breaks the answer; it does nothing to improve the perceived wait. It is fiddling with an unrelated parameter.

**References:**

- [Message Batches API（大量・非同期・低コスト）](https://docs.claude.com/en/docs/build-with-claude/batch-processing)
- [ストリーミング](https://docs.claude.com/en/docs/build-with-claude/streaming)

---

### Q7 Correct: B (D1 — Agents & Workflows)

A process whose steps and order are fully fixed in advance does not need the model to decide the next move. A deterministic workflow (steps connected in a fixed order) makes skipped validation and loops structurally impossible. Turning something into an agent has value only when the required steps vary per input and cannot be determined in advance.

**Why the others are wrong**

- **A.** Enlarging the model does not change the very structure of an open loop that delegates the decision to the model, so room to skip or loop remains. A fixed procedure needs no decision-making.
- **C.** A request in a prompt is not a structural guarantee. If the model does not comply, skipping and looping happen again. Control must be secured by structure.
- **D.** Removing the validation tool itself makes it impossible to run validation — a necessary business step. The problem disappears, but so does the process; an overreaction.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q8 Correct: C (D1 — Agents & Workflows)

A process where the number of steps needed varies per input and cannot be fixed in advance is exactly where an agent (open loop) fits. The model decides tool calls dynamically as the situation demands and iterates until completion. Runaway is contained structurally by a maximum-iteration cap on the harness side, not by the prompt.

**Why the others are wrong**

- **A.** Collecting logs and reviewing them after the fact does not resolve the root cause of running out of steps at runtime (fixing the steps). It is not prevention.
- **B.** The Batches API is about high-volume, asynchronous, low-cost processing and is unrelated to the design problem of a variable number of steps. It does not solve the problem being asked.
- **D.** Enlarging the model leaves the fixed three-step constraint in place. The structure that cannot take the extra investigation steps a complex ticket needs is unchanged.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q9 Correct: A (D1 — Agents & Workflows)

Agent control is secured by mechanisms on the harness side, not by the model's good intentions. A maximum-iteration cap and a timeout stop runaway, least-privilege strips unused high-impact tools, and destructive operations are gated by human approval (human-in-the-loop). Because these are mechanisms, they reliably take effect.

**Why the others are wrong**

- **B.** A request in a prompt carries no enforcement. If the model does not comply, runaway and destructive operations happen again. It is not a structural guarantee.
- **C.** As long as you depend on the model's own judgment, you cannot reliably prevent destructive operations. Placing control inside the model is itself the root cause.
- **D.** max_tokens only changes the length of a single output and has nothing to do with the number of iterations or whether a destructive operation executes. It mistakes the control lever.

**References:**

- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)
- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q10 Correct: D (D5 — Model Selection & Optimization)

Prompt caching applies to a static prefix from the front. Placing the variable question first makes the huge manual behind it a cache miss every time, forcing reprocessing. Simply reordering the identical manual to the front and the variable part to the back lets you skip processing the manual from the second request on, structurally lowering both latency and cost.

**Why the others are wrong**

- **A.** A smaller model lowers cost but risks harming the policy-QA answer quality, and it does not fix the true cause (reprocessing the same huge prefix every time).
- **B.** max_tokens is an output-side cap and does nothing for the main cost driver — repeatedly processing a 30,000-token input. The reduction is not structural.
- **C.** Streaming only improves perceived latency; the cost and actual processing time of reprocessing the manual every time are unchanged. It does not solve the true cause being asked about.

**References:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)

---

### Q11 Correct: B (D5 — Model Selection & Optimization)

Extended thinking is a capability that pays off on hard problems requiring multi-step reasoning; on a shallow task like sorting into 5 categories it does not contribute to accuracy and only raises latency and cost. The root fix is to decide whether to use it based on the task's difficulty. For simple tasks, disable it.

**Why the others are wrong**

- **A.** The true cause is enabling a capability that does not fit the task on every request. Enlarging the model only adds cost and latency and does not change the fact that a simple task needs no thinking.
- **C.** Accuracy has plateaued because the task is simple and requires no deep thinking. Increasing the budget only worsens cost and latency further — it looks responsible but is counterproductive.
- **D.** temperature is a parameter that changes output variance and is unrelated to whether extended thinking is needed or to the cost/latency problem. It mistakes the lever.

**References:**

- [extended thinking](https://docs.claude.com/en/docs/build-with-claude/extended-thinking)
- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)

---

### Q12 Correct: C (D5 — Model Selection & Optimization)

Model tiers are chosen to match task difficulty. A simple, high-frequency stage like fixed-format formatting can achieve sufficient quality on a fast, low-cost tier, while complex summarization needs a higher tier. Routing the simple stage that dominates cost to a lower tier and reserving the top tier for the hard parts structurally lowers cost while preserving quality.

**Why the others are wrong**

- **A.** max_tokens only changes the output cap and does nothing for the main cost driver — running a simple stage on the top-tier model. The reduction is not structural.
- **B.** Being concise via the prompt does not change the structure of running large volumes of simple processing on an expensive model. It does not fix the true cause: the mismatch between stage and model tier.
- **D.** Unifying all stages on the smallest model drops the quality of the complex summarization stage too. Cost falls, but it is an over-simplification that sacrifices quality.

**References:**

- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)

---

### Q13 Correct: B (D3 — Claude Code)

The root cause of the rework of re-pasting the same context every time is that project-specific knowledge is not persisted across sessions. A CLAUDE.md placed at the repository root is automatically loaded into context at the start of each session, so writing the build/test commands and conventions once shares them permanently, and the guessing-driven rework structurally disappears.

**Why the others are wrong**

- **A.** prompt-only-fix. A note gives no knowledge source, so Claude still does not know the correct commands and keeps guessing. The manual pasting also remains.
- **C.** bigger-model. Enlarging the model does not mean it has learned the repo-specific commands or conventions; it only gets better at random guessing and never achieves persistent sharing.
- **D.** detect-after-the-fact. After-the-fact review only records mistakes and provides no mechanism for the next session to start with the correct assumptions.

**References:**

- [Claude Code 概要](https://docs.claude.com/en/docs/claude-code/overview)
- [代表的なワークフロー](https://docs.claude.com/en/docs/claude-code/common-workflows)

---

### Q14 Correct: D (D4 — Eval, Testing & Debugging)

The root cause of regressions surfacing after release is the absence of an objective standard for measuring quality before and after a change. Building an evaluation set with ground-truth labels and automatically scoring each change against the same rubric lets you quantitatively compare, before release, which change raised or lowered quality, preventing regressions.

**Why the others are wrong**

- **A.** knob-twiddling. temperature only changes output variance and neither measures nor prevents the actual quality problem of missing key points.
- **B.** sounds-responsible. Visually checking a few cases lacks coverage and reproducibility, so it cannot detect regressions reliably.
- **C.** prompt-only-fix. Strengthening the instruction leaves no means of measuring whether the change actually raised quality, so the next regression goes undetected too.

**References:**

- [評価テストの作り方](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)
- [Evaluation ツール](https://docs.claude.com/en/docs/test-and-evaluate/eval-tool)

---

### Q15 Correct: A (D6 — Prompt & Context Engineering)

The root cause of parse exceptions is that the output structure is left to the model and not guaranteed. Requesting structured output via a tool schema binds the format to the schema, and additionally validating against the schema on the client side and retrying only the failures completes a mechanism that tolerates occasional deviation. The key is placing control on the harness side (validation + retry).

**Why the others are wrong**

- **B.** prompt-only-fix. Strengthening the request does not guarantee the format, and the few dozen deviations keep occurring probabilistically.
- **C.** detect-after-the-fact. Merely watching the anomaly rate provides no means of correctly ingesting malformed output, and the job stays halted.
- **D.** knob-twiddling. temperature and max_tokens do not solve the structural problem of preamble contamination or missing fields.

**References:**

- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)
- [ツール利用の実装](https://docs.claude.com/en/docs/agents-and-tools/tool-use/implement-tool-use)

---

### Q16 Correct: C (D6 — Prompt & Context Engineering)

The root cause of preamble contamination is that the start of the response is left to the model. Prefilling the response up to `## Summary` forces the model to generate from that continuation, so the output always begins with the prescribed heading. Structurally fixing the opening is the most reliable approach.

**Why the others are wrong**

- **A.** sounds-responsible. Post-processing can strip the preamble but is fragile to deviations other than the heading, and it does not control the opening itself.
- **B.** prompt-only-fix. Emphasis still leaves the preamble probabilistically. It does not fix the opening as a mechanism.
- **D.** bigger-model. Even a larger model does not reduce opening deviations to zero and does not substitute for a structural guarantee like prefill.

**References:**

- [応答のprefill](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/prefill-claudes-response)
- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

### Q17 Correct: B (D7 — Security & Safety)

The root cause of injection is that untrusted fetched content is treated with the same standing as trusted instructions, and high-impact tools can execute unconditionally. Isolating the fetched body as untrusted data (so it is not interpreted as instructions) and gating destructive operations like refunds behind least privilege plus human approval closes the path by which an embedded instruction reaches real harm.

**Why the others are wrong**

- **A.** prompt-only-fix. A request sentence does not mechanically separate the boundary between untrusted content and trusted instructions, and clever embeddings break through it.
- **C.** detect-after-the-fact. Anomaly detection is about after the refund has executed and does not prevent the harm itself from occurring.
- **D.** over-restriction. Abolishing the fetch capability entirely also halts the core business of handling inquiries. The problem disappears, but so does the value.

**References:**

- [ジェイルブレイク／インジェクション緩和](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks)
- [ツール利用 概要](https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview)

---

### Q18 Correct: D (D7 — Security & Safety)

Unconditionally permitting all operations creates a structure where an error or injection leads directly and instantly to destructive operations. Claude Code's permission model is designed so you can explicitly narrow what is permitted; least privilege that excludes destructive operations from the allowlist structurally limits the blast radius of runaway even in a non-interactive environment.

**Why the others are wrong**

- **A.** knob-twiddling. temperature is unrelated to the breadth of permissions and reduces nothing about the possibility of executing destructive operations.
- **B.** bigger-model. Even a smart model can hit injections or mis-operations, so the danger of full permission remains.
- **C.** detect-after-the-fact. An audit log only lets you trace after the destruction has occurred and does not prevent the execution itself.

**References:**

- [Claude Code のセキュリティモデル](https://docs.claude.com/en/docs/claude-code/security)
- [Claude Code 概要](https://docs.claude.com/en/docs/claude-code/overview)

---

### Q19 Correct: A (D8 — Tools & MCPs)

Redundantly implementing the same capability across multiple apps is the root cause of the maintenance cost. A capability you want to reuse, once made into an MCP server, means each app just connects to the shared server, and a schema change reflects across all apps by fixing the server in one place. MCP is the mechanism for externalizing reusable capabilities.

**Why the others are wrong**

- **B.** sounds-responsible. It looks like fewer implementation sites, but a copy policy ultimately reproduces the duplication and invites spec divergence.
- **C.** sounds-responsible. Manual synchronization relying on an operational rule is easy to forget and does not mechanically solve the root problem of inconsistency across three places.
- **D.** true-but-irrelevant. Enriching the description text may improve how the tool is used, but it does not solve the problem being asked — duplicated implementation and multi-site maintenance.

**References:**

- [MCP（Anthropic ドキュメント）](https://docs.claude.com/en/docs/agents-and-tools/mcp)
- [リモートMCPサーバ](https://docs.claude.com/en/docs/agents-and-tools/remote-mcp-servers)

---

### Q20 Correct: C (D8 — Tools & MCPs)

The root cause of missing arguments and malformed formats is that the tool definition does not adequately convey each parameter's meaning, whether it is required, and the expected format. Clearly stating each parameter's description and expected format and constraining required fields with the schema's required structurally raises the probability that the model fills arguments correctly. For tools built for agents, clarity of description and schema is key.

**Why the others are wrong**

- **A.** detect-after-the-fact. Monitoring failures only visualizes trends and provides no means of getting correct calls.
- **B.** prompt-only-fix. A general note does not fix the ambiguity of the tool definition, so the model still guesses what is required and in what format.
- **D.** bigger-model. Even a larger model still misuses an ambiguous definition, and it does not substitute for a structural guarantee like schema constraints.

**References:**

- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [ツール利用の実装](https://docs.claude.com/en/docs/agents-and-tools/tool-use/implement-tool-use)

---

## Disclaimer / 免責事項

This is independent study material based on the published Anthropic exam blueprints.
It is not affiliated with, endorsed by, or sponsored by Anthropic.
The items are illustrative only and are **NOT** from the live exam bank.

本問題集は、Anthropic が公開している認定試験ブループリントに基づいて独自に作成した学習用教材です。
Anthropic とは無関係であり、Anthropic による承認・推奨を受けたものではありません。
掲載している問題はすべて出題形式を示すための例題であり、実際の試験問題ではありません。