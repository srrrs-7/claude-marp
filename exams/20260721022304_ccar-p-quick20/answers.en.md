# Claude Certified Architect – Professional (CCAR-P) — Answer Key & Rationale

## Answer Key & Rationale

**Scoring:** correct ÷ 20 is your accuracy. Approx scaled score = `100 + 900 × accuracy` (pass line 720 ≈ 72% accuracy). Record the domain of every miss and transfer it to the score sheet in README.md.

---

### Q1 Correct: B (D1 — Solution Design & Architecture)

Since the steps are fixed and 85% resolve deterministically, an open-loop agent only introduces unnecessary non-determinism, cost, and audit difficulty. Processing the bulk reproducibly with a deterministic workflow and routing only the judgment cases to a human is the fundamental design that satisfies both the audit requirement and the automation rate.

**Why the others are wrong**

- **A.** Handing full authority to an autonomous agent when the steps are fixed makes the process non-deterministic, fails the reproducibility audit requirement, and is over-engineered
- **C.** A larger model does not remove responsibility for borderline judgments; auto-approving the exceptions leaves the risk of incorrect payouts fully in place
- **D.** After-the-fact audit logs do not prevent misjudgments, they only detect them. Without an escalation mechanism, the same errors keep recurring

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q2 Correct: A, C (D1 — Solution Design & Architecture)

Multi-agent designs pay off only for problems that decompose into independent subtasks each agent can explore in parallel within an isolated context. At the same time, token consumption multiplies, so adoption is justified only for high-value, heavy-load research where the cost is warranted. These two statements correctly capture both the fit criterion and the trade-off.

**Why the others are wrong**

- **B.** Adding agents offers no structural guarantee that hallucinations disappear; this is the misconception that quality problems are solved by the number of models
- **D.** The more tightly state is coupled, the higher the coordination cost — the premise that it is always cheaper and faster does not hold

**References:**

- [マルチエージェント調査システムの設計](https://www.anthropic.com/engineering/multi-agent-research-system)
- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q3 Correct: D (D1 — Solution Design & Architecture)

When the task is deterministic with fixed branching, open-loop autonomy is unnecessary and only leaves the side effects of cost, latency, and difficult isolation. A prompt-chaining workflow is the simplest, most reproducible fit for the requirements. The principle is to introduce agents only when non-deterministic judgment is genuinely required.

**Why the others are wrong**

- **A.** Putting an autonomous agent into deterministic processing is over-engineering, and it ignores the concrete penalty of a measured 3x cost increase
- **B.** Scaling up the model does not add needed autonomy to a fixed procedure, and it leaves the isolation difficulty that is specific to multi-agent designs
- **C.** Retries and logging only mask the symptoms of complexity; they do not remove the root cause — unnecessary autonomy in the first place

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q4 Correct: C (D2 — Models, Prompting & Context Engineering)

Prompt caching hits on a static prefix starting from the front of the prompt. Pinning the manual — shared and unchanging across all users — at the front and placing the per-request history and question behind it caches the 30,000-token static portion and greatly reduces the cost of re-sending it. Ordering is the fundamental factor that determines the effect.

**Why the others are wrong**

- **A.** Placing the variable user question first breaks the static prefix, so everything after it falls out of the cache and the caching benefit is lost
- **B.** Reducing max_tokens is about the output side and does not address the true factor — the cost of re-sending the huge input prefix
- **D.** Scaling up the model does not reduce the re-send cost, and summarizing introduces new risks of information loss and invalidated caching

**References:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)

---

### Q5 Correct: B (D2 — Models, Prompting & Context Engineering)

The problem is not exceeding capacity but that irrelevant accumulation lowers the signal-to-noise ratio. Keeping only high-signal information and summarizing or removing old intermediate results — curating the context — is the fundamental remedy that addresses both the accuracy drop and the cost increase. Context is not "more is better" but "denser relevance is better."

**Why the others are wrong**

- **A.** The keep-everything approach is itself the cause of noise accumulation and rising cost, and it worsens the dilution of relevant information
- **C.** Widening the window does not change the proportion of noise, so accuracy does not recover. The problem is context quality, not capacity
- **D.** Temperature only changes sampling variance and does nothing about the cause — the intrusion of irrelevant context

**References:**

- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [長い文脈を扱うコツ](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/long-context-tips)

---

### Q6 Correct: A (D2 — Models, Prompting & Context Engineering)

The requirements differ per step. The high-volume, simple, cost-sensitive classification is best served by a fast tier, and the low-volume, high-accuracy legal reasoning is best served by a top tier. Mixing tiers according to requirements is the design that satisfies overall cost and quality at once. Standardizing on a single tier necessarily sacrifices one of the requirements.

**Why the others are wrong**

- **B.** Standardizing every step on the top tier badly undermines the low-cost, low-latency requirement for the hundreds of thousands of simple classifications
- **C.** Standardizing every step on the smallest tier breaks accuracy on the complex legal reasoning and fails to meet its top-priority requirement
- **D.** max_tokens is the output-length limit and is unrelated to classification accuracy. It does not touch the true factor — model-tier selection

**References:**

- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)

---

### Q7 Correct: B (D3 — Integration)

The challenge of providing reusable functionality to multiple agents/teams is structurally solved by serving that functionality as an MCP server. Authentication, rate control, and the tool schema are consolidated into the server's single responsibility, and each agent merely connects and calls the tool, so implementation duplication and divergence cannot arise in principle.

**Why the others are wrong**

- **A.** Distributing copies of a shared library still scatters the implementation inside each agent's process, leaving version drift and duplicated auth configuration. It is not a single point of management.
- **C.** Scaling up the model does not eliminate the differences in each team's tool implementation. Implementation consistency is a matter of integration-layer design, not model capability — a bigger-model error.
- **D.** Pasting a schema into the prompt is no substitute for tool execution and cannot handle authentication or rate control either. It tries to solve structural reuse with a prompt-only-fix.

**References:**

- [MCP（Anthropic ドキュメント）](https://docs.claude.com/en/docs/agents-and-tools/mcp)
- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)

---

### Q8 Correct: A, C (D3 — Integration)

(1) For integrating with another team's agent in a different region, the standard approach is to expose and connect to that agent as a remote MCP server, standardizing a reusable connection over the network. (2) For the verifiable-source requirement, passing the underlying text as Search results with citation metadata is appropriate, so the answer can be structurally traced to the clause it is based on.

**Why the others are wrong**

- **B.** Pasting the entire transaction history into the prompt every time bloats the context, incurs cost and degradation, and is not even a means of integrating with the other team's agent. It is a true-but-irrelevant over-response.
- **D.** Quarterly regulation fine-tuning is costly and provides no verifiable sourcing. Frequently revised facts should be handled via retrieval; baking them into model weights is the wrong approach.

**References:**

- [リモートMCPサーバ](https://docs.claude.com/en/docs/agents-and-tools/remote-mcp-servers)
- [検索結果を根拠付きで渡す](https://docs.claude.com/en/docs/build-with-claude/search-results)

---

### Q9 Correct: B (D3 — Integration)

The temporal clue — "degradation only on the updated topics, immediately after the KB update" — points squarely at the component that changed: the embeddings/index. If incomplete re-embedding of new documents, chunk-split inconsistency, or index-freshness lag causes retrieval to return the old version, the answer reflects the old spec even if generation is correct. Investigating what changed is the standard move.

**Why the others are wrong**

- **A.** Legacy questions are fine and only the revised topics degraded, so this is a retrieval-freshness problem, not general hallucination. Asking nicely in the prompt does not fix index inconsistency (prompt-only-fix).
- **C.** The regression started with Tuesday's KB load and is unrelated to model generation. Even a higher-tier model answers the old spec if it is handed old chunks. A bigger-model error.
- **D.** The symptom is 'consistently wrong toward the old spec,' not output wavering. Temperature adjustment is irrelevant knob-twiddling.

**References:**

- [埋め込み（RAG の retrieval 側）](https://docs.claude.com/en/docs/build-with-claude/embeddings)
- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

### Q10 Correct: B (D3 — Integration)

The requirement — high volume, no immediacy needed, cost as the top priority — maps one-to-one onto the design purpose of the Batches API. The asynchronous bulk-processing window lowers the unit price and avoids the rate-limit crunch that synchronous parallelism causes. The constraints of the requirement and the nature of the correct answer align exactly.

**Why the others are wrong**

- **A.** Maximum synchronous parallelism hits rate limits and is also the most expensive. It optimizes for speed against a requirement that does not need immediacy — true-but-irrelevant.
- **C.** Reducing max_tokens does not structurally lower the per-request unit price and fails the cost-first requirement of bulk processing. Knob-twiddling.
- **D.** Discarding accuracy entirely undermines the purpose of an audit report — over-restriction. Cost can be lowered with Batches.

**References:**

- [Message Batches API（大量・非同期・低コスト）](https://docs.claude.com/en/docs/build-with-claude/batch-processing)
- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)

---

### Q11 Correct: D (D4 — Evaluation, Testing & Optimization)

Objective quality judgment requires evaluation tests that machine-score measurable metrics — accuracy, latency, cost, safety — against a ground-truth-labeled evaluation set. This detects regressions on every change and judges whether the criteria are met before production. Eyeballing 10 cases or after-the-fact reports have neither reproducibility nor coverage.

**Why the others are wrong**

- **A.** The model's self-confidence is not a measure of accuracy. It can assign high confidence to wrong extractions, and the confidence itself can be fabricated. Sounds-responsible.
- **B.** Monthly aggregation of customer reports is merely after-the-fact detection and does not assure quality before production. Detect-after-the-fact.
- **C.** Skipping evaluation and relying on a higher-tier model is not quality assurance, and the premise that extraction errors will not occur is false. Bigger-model.

**References:**

- [評価テストの作り方](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)
- [Evaluation ツール](https://docs.claude.com/en/docs/test-and-evaluate/eval-tool)

---

### Q12 Correct: A (D4 — Evaluation, Testing & Optimization)

Evaluation and optimization only become possible once measurable success criteria are defined first. Agreeing on acceptable accuracy, latency, cost, and safety as numbers ties all subsequent design, model selection, and evaluation tests to those criteria, so quality no longer becomes a subjective debate. Defining success criteria is the starting point of the lifecycle.

**Why the others are wrong**

- **B.** Building first and adding criteria later is after-the-fact detection and cannot judge quality before release. Detect-after-the-fact.
- **C.** Selecting a model without criteria still cannot measure pass/fail. Quality starts from criteria definition, not model selection. Bigger-model.
- **D.** A wishful statement in the prompt is neither a measurable criterion nor quality assurance. Prompt-only-fix.

**References:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)
- [評価テストの作り方](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)

---

### Q13 Correct: C (D4 — Evaluation, Testing & Optimization)

'Instant and 100% accurate' cannot be satisfied simultaneously, and the CCAR-P architect should present the measured trade-off in numbers and let the business choose. Showing the measured values of 97%/4.2s versus 88%/under-1s, along with the option of a human-in-the-loop only for critical cases, grounds the decision in evidence. It makes the requirement's infeasibility visible through measurement.

**Why the others are wrong**

- **A.** Adjusting max_tokens or temperature does not erase the fundamental accuracy-latency trade-off. Knob-twiddling that contradicts the measurements.
- **B.** After-the-fact audit logs are neither a guarantee of 100% accuracy nor prevention. Detect-after-the-fact.
- **D.** Even a higher-tier model cannot guarantee 100% accuracy — the measured value is 97%. A bigger-model error that simply accepts an unrealistic demand.

**References:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)
- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)

---

### Q14 Correct: B (D5 — Governance, Safety & Risk)

The root cause of indirect prompt injection is that untrusted fetched content and trusted instructions coexist on the same command plane. Isolating the fetched body as 'data' and setting a boundary that does not interpret its wording as tool-execution instructions neutralizes embedded commands, leaving them as mere text. The key is to place control in the harness's input design, not in a textual plea.

**Why the others are wrong**

- **A.** Prompt-only-fix. A prohibition in the system prompt does not change the structure in which untrusted text flows onto the same command plane, so it is repeatedly broken by clever embeddings.
- **C.** Detect-after-the-fact. Full-text logging provides after-the-fact detection but does not prevent a pre-execution takeover. Auditing is no substitute for mitigation.
- **D.** Over-restriction. Abolishing the fetch feature removes the attack surface but simultaneously loses the business value of using external information — an over-response that kills a problem the isolation design could solve while keeping both.

**References:**

- [ジェイルブレイク／インジェクション緩和](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks)

---

### Q15 Correct: C (D5 — Governance, Safety & Risk)

Under the principle of least privilege, high-impact tools that are not actually used are nothing but attack and misoperation surface. Stripping them from the tool set means the model cannot call them no matter how it behaves. Isolating the rare cases where a destructive operation is genuinely needed into a separate human-in-the-loop path is correct, and 'not granting' the capability is the strongest control.

**Why the others are wrong**

- **A.** Sounds-responsible. Urging self-checks leaves the tools wired up, so they can still be executed if injection or a model misjudgment skips the self-check. It is not the fundamental remedy of removing the capability.
- **B.** Knob-twiddling. Temperature is not the root cause of wrong tool selection, and as long as the dangerous capability remains, the risk does not disappear.
- **D.** Bigger-model. Even a higher-tier model can still make mistaken calls or follow injections. It ignores that the granted capability itself is the risk.

**References:**

- [Claude Code の権限モデル](https://docs.claude.com/en/docs/claude-code/iam)

---

### Q16 Correct: D (D5 — Governance, Safety & Risk)

The root cause of hallucination is the model filling in gaps without grounding. Grounding the answer in a retrieved source, requiring clause citations to make it verifiable, and formally allowing an 'I don't know / not stated' escape hatch removes the incentive to make ungrounded assertions. The key is to address it with the mechanisms of grounding, citation, and permitting 'unknown.'

**Why the others are wrong**

- **A.** Bigger-model. Even a higher-tier model can hallucinate without grounding. Model tier is not a guarantee of factuality.
- **B.** Knob-twiddling. Output length is not the cause of hallucination, and making answers shorter actually encourages ungrounded assertions.
- **C.** Prompt-only-fix. Emphatic phrasing provides no grounding mechanism, so it cannot stop ungrounded generation.

**References:**

- [ハルシネーションを減らす](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)
- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)

---

### Q17 Correct: D (D6 — Stakeholder Communication & Lifecycle Management)

'Instant and 100%' stems from the business side not understanding the speed/accuracy/cost trade-off. The architect's role is to make the feasible operating points visible with measured values and to hand the decision of which trade-off to take to the business owner. The best agreement-building is presenting the facts in a choosable form — neither deciding unilaterally nor throwing the demand back.

**Why the others are wrong**

- **A.** Sounds-responsible. Technically correct, but merely throwing the demand back without alternatives is not agreement-building, and the business side gets no material for a decision.
- **B.** Detect-after-the-fact. Quietly shipping without sharing the measured trade-off abandons agreement-building, and losing trust once the accuracy shortfall surfaces later.
- **C.** Over-restriction. Formally agreeing to an unachievable '100%' and hiding the cost increase is dishonest and invites a later breakdown of the relationship.

**References:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)

---

### Q18 Correct: B (D6 — Stakeholder Communication & Lifecycle Management)

The purpose of a postmortem is not blame but recurrence prevention and trust recovery. Sharing impact, cause, and countermeasures on a fact basis and blamelessly, anchored on the timing of change — 'what happened right after what changed' — conveys judgment and learning even to non-technical stakeholders. Avoiding personal attacks is what prevents recurrence of the same kind of failure.

**Why the others are wrong**

- **A.** Over-restriction. A report that withholds impact lacks transparency and, when the scale later becomes clear, harms trust instead.
- **C.** Sounds-responsible. Blaming individuals focuses on people rather than the structure of the cause, breaks a culture of candid reporting, and weakens recurrence prevention.
- **D.** True-but-irrelevant. Attaching full raw logs is undecipherable for non-technical stakeholders and is not the summary needed for decision-making.

**References:**

- [障害の切り分けと事後分析の実例](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues)

---

### Q19 Correct: A (D6 — Stakeholder Communication & Lifecycle Management)

An SLA can only stand on measurable, agreed-upon success criteria. Defining accuracy, latency, cost, and safety as target thresholds on an evaluation set first, and aligning the scattered expectations onto a common yardstick, is the foundation. Numeric promises and model selection both come after this definition. The key is the order: you cannot promise what you cannot measure.

**Why the others are wrong**

- **B.** Sounds-responsible. Promising numbers first without measurement criteria is a classic failure of shouldering an unachievable SLA, and it lacks the foundation for agreement.
- **C.** Detect-after-the-fact. Monitoring is necessary, but deciding success criteria by feel afterward makes SLA pass/fail judgments ambiguous and yields no agreement.
- **D.** Bigger-model. Model tier cannot precede the definition of success criteria; with no agreed definition of what counts as good, neither selection nor evaluation is possible.

**References:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)

---

### Q20 Correct: C (D7 — Developer Productivity & Operational Enablement)

The root cause is that reusable procedures depend on each person's manual work. Externalizing the shared premises and procedures into the repository as CLAUDE.md or Agent Skills and auto-loading them removes the pasting and paste-forgetting steps entirely and applies consistently to the whole team. Systematizing productivity through externalized procedures is what makes it sustainable.

**Why the others are wrong**

- **A.** Sounds-responsible. Consolidating boilerplate looks like an improvement but keeps dependence on copy-paste each time and leaves the paste-forgetting structure intact.
- **B.** Bigger-model. Model tier does not solve the process issue of forgetting to paste premises, and returning templating to individual discretion loses reproducibility.
- **D.** Detect-after-the-fact. A post-hoc CI warning only detects rework and does not make the work of pasting premises every time unnecessary.

**References:**

- [ベストプラクティス](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Agent Skills のベストプラクティス](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices)

---

## Disclaimer / 免責事項

This is independent study material based on the published Anthropic exam blueprints.
It is not affiliated with, endorsed by, or sponsored by Anthropic.
The items are illustrative only and are **NOT** from the live exam bank.

本問題集は、Anthropic が公開している認定試験ブループリントに基づいて独自に作成した学習用教材です。
Anthropic とは無関係であり、Anthropic による承認・推奨を受けたものではありません。
掲載している問題はすべて出題形式を示すための例題であり、実際の試験問題ではありません。