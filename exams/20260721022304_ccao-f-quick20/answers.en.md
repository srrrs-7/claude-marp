# Claude Certified Associate – Foundations (CCAO-F) — Answer Key & Rationale

## Answer Key & Rationale

**Scoring:** correct ÷ 20 is your accuracy. Approx scaled score = `100 + 900 × accuracy` (pass line 720 ≈ 72% accuracy). Record the domain of every miss and transfer it to the score sheet in README.md.

---

### Q1 Correct: B (D1 — Prompting & Task Execution)

The system prompt is the layer that specifies persistent roles and constraints across the whole conversation; writing the tone and boundaries there applies them stably on every turn. Unlike additions that depend on the user message, it does not break when someone forgets, so it removes the root cause of the inconsistency.

**Why the others are wrong**

- **A.** `temperature` only narrows the range of variation; it does not define the role or tone itself
- **C.** Even with a bigger model, without a role specification the tone keeps drifting according to whatever instruction is given
- **D.** Appending text every time is an operational dependency that collapses the moment someone forgets, so it cannot lock the behavior in structurally

**References:**

- [システムプロンプトで役割を与える](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/system-prompts)
- [プロンプトエンジニアリング概要](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview)

---

### Q2 Correct: D (D1 — Prompting & Task Execution)

Wrapping the material in XML tags lets the model structurally tell where the instructions end and the reference data begins. Any command buried in the material is physically separated from the instruction layer, so the root cause—confusing instructions with material—disappears entirely.

**Why the others are wrong**

- **A.** A request alone creates no structural boundary against commands mixed into the material, so the misinterpretation remains
- **B.** The token limit is about how much is read in and is unrelated to distinguishing instructions from material
- **C.** Even with a bigger model, if the input structure stays ambiguous the root cause of the misinterpretation does not go away

**References:**

- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)

---

### Q3 Correct: C (D1 — Prompting & Task Execution)

Having the model write out each step before the final figure makes it build up its reasoning in order before answering, which reduces leaps in the calculation. Because the intermediate results are made visible, the point where an error occurs can also be traced, so both accuracy and verifiability improve structurally.

**Why the others are wrong**

- **A.** Fixing `temperature` is about reproducibility; it does not supply the reasoning steps that were skipped
- **B.** Even with a bigger model, without making it show its work you can neither prevent errors from occurring nor detect them
- **D.** Emphasis like "accurately" provides no structure that forces the steps to be followed, so the skipping is not fixed

**References:**

- [段階的思考を促す](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought)

---

### Q4 Correct: A (D2 — Output Evaluation & Validation)

Grounding it in the provided document and having it answer "not stated" when there is no basis removes the room for the model to fill gaps by guessing. The root cause of hallucination is the behavior of filling in unstated items by inference, so blocking that behavior itself is the most effective fix.

**Why the others are wrong**

- **B.** A request alone cannot structurally stop generation that has no basis, so fabrication persists
- **C.** Even with a bigger model, as long as it is allowed to infer unstated items, invention can still occur
- **D.** An after-the-fact audit is detection after the wrong application has already happened; it cannot prevent the occurrence itself

**References:**

- [ハルシネーションを減らす](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

---

### Q5 Correct: A, C (D2 — Output Evaluation & Validation)

Citations mechanically tie each claim to the corresponding span in the referenced document, so reviewers can follow the source directly and fact-check. On top of that, having a human match citation to source text before publication lets wrong citations be detected as a matter of process, ensuring validity.

**Why the others are wrong**

- **B.** A model's self-reported score is not an indicator of accuracy, and the confidence itself can be fabricated
- **D.** Even with a bigger model, no matching of citations is performed, so verifiability is never created

**References:**

- [引用（Citations）で出典を検証可能にする](https://docs.claude.com/en/docs/build-with-claude/citations)
- [ハルシネーションを減らす](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

---

### Q6 Correct: B, D (D2 — Output Evaluation & Validation)

Defining measurable success criteria first and scoring against an evaluation set of representative cases lets you compare whether a change is better or worse objectively, on a single yardstick rather than by opinion. Having the evaluation foundation defined is the fundamental prerequisite for continuous validity judgments.

**Why the others are wrong**

- **A.** Eyeballing a few cases leaves subjectivity and oversights in place and cannot objectively compare whether a change is better or worse
- **C.** Tuning `temperature` is about variation in phrasing and does not provide criteria for judging good from bad

**References:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)

---

### Q7 Correct: D (D2 — Output Evaluation & Validation)

Because a refund is irreversible and high-impact, inserting human approval before execution stops it before the model's misjudgment is locked in as a monetary loss. Placing the control on the harness side, ahead of execution, is the fundamental fix.

**Why the others are wrong**

- **A.** A request cannot structurally stop out-of-policy approvals, so it cannot prevent a mistaken approval from executing
- **B.** An after-the-fact audit is detection after the monetary loss has occurred, and an irreversible refund cannot be undone
- **C.** Having the model second-guess itself leaves the approval on auto-execute, and the self-check itself is unreliable

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)

---

### Q8 Correct: B (D2 — Output Evaluation & Validation)

Validating output against a schema and retrying or repairing on failure reliably rejects broken output before it reaches downstream. Placing validation and retry on the harness side achieves robust validity assurance that does not depend on rare corruption.

**Why the others are wrong**

- **A.** A request alone cannot stop malformed output from slipping in, so rare corruption persists
- **C.** Raising the limit only reduces one cause of truncation; without validation, corruption still passes straight through
- **D.** Even with a bigger model, without a validation step there is still room for broken output to halt the downstream process

**References:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)

---

### Q9 Correct: B (D3 — Product & Model Selection)

Routine, high-volume classification with a narrow range of judgment yields sufficient quality on a fast, low-cost tier. That tier meets the immediate-response requirement with low latency, and because its unit price is low, cost stays structurally contained even at high volume. The requirements (high volume, immediate, low cost, simple judgment) map one-to-one to the choice.

**Why the others are wrong**

- **A.** A top tier with extended thinking is meant for hard reasoning and is overkill for a simple three-way classification; latency and cost get worse, against the requirements
- **C.** Raising `temperature` makes the classification unstable and actually lowers accuracy; it is an irrelevant parameter tweak that does not meet the core requirement
- **D.** Routing everything through human review sacrifices immediacy and throughput—an overreach that defeats the very purpose of automated classification

**References:**

- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)
- [モデル一覧・世代](https://docs.claude.com/en/docs/about-claude/models/overview)

---

### Q10 Correct: C (D3 — Product & Model Selection)

With Projects, once you register material and instructions outside the conversation, they are reused as shared context across every conversation inside the Project. This eliminates the manual re-pasting by design and guarantees the whole team the same background—matching the requirement of ongoing knowledge sharing.

**Why the others are wrong**

- **A.** Artifacts are outputs generated within a conversation, not a shared knowledge base; per-person copying is person-dependent and does not provide ongoing shared context
- **B.** Even enforced by a procedure, the pasting remains manual, so omissions and inconsistencies are not structurally resolved—this is a diligence-only workaround
- **D.** Saving only a summary per person loses information and is not shared; it sacrifices the goal of maintaining a unified context

**References:**

- [Projects とは](https://support.claude.com/en/articles/9517075-what-are-projects)
- [Artifacts とは](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them)

---

### Q11 Correct: A (D4 — Workflow Integration & Solution Design)

A deterministic process whose steps and order can be fixed is best built as a workflow rather than an open-loop agent. Fixing the steps and inserting validation and retries places control on the harness side and makes the behavior predictable. The requirements (fixed steps, unchanging order, retries) map to the design.

**Why the others are wrong**

- **B.** Using an autonomous agent for a deterministic process is overkill, and re-deciding each time makes the behavior unstable; it looks like responsible automation but undermines predictability
- **C.** Making the model bigger does not provide the structure of fixed steps and retries; swapping in a higher-tier model does not meet the core requirement
- **D.** Skipping validation and registration violates the requirements and is an over-simplification that lets wrong values enter the accounting system as-is, sacrificing correctness

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q12 Correct: D (D4 — Workflow Integration & Solution Design)

A task whose focus and depth cannot be fixed in advance and depends on mid-investigation discoveries suits an open-loop agent. Giving it the goal and tools and placing stopping conditions like max iterations and a cost cap on the harness side achieves both flexibility and runaway prevention.

**Why the others are wrong**

- **A.** A fixed workflow does not fit a task whose steps cannot be fixed in advance; it looks like a correct design but violates the requirement itself
- **B.** The premise of enumerating every branch has collapsed, so the decision tree breaks down; full coverage is impossible and it does not meet the true requirement of adaptive exploration
- **C.** `temperature` is an irrelevant parameter tweak that provides no exploration steps or stopping conditions and only increases the risk of runaway

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q13 Correct: B (D4 — Workflow Integration & Solution Design)

Destructive, high-impact operations are fundamentally solved by designing permissions and approval on the harness side. Inserting human approval for high-value refunds and automating only low-risk routine ones structurally limits the blast radius without stopping the business. The requirement (only part of it is dangerous) maps to the design.

**Why the others are wrong**

- **A.** A request in the prompt does not fix the structural flaw of leaving a high-impact tool connected, and cannot reliably prevent deviations
- **C.** Logging and after-the-fact audit only detect the high-value refund that already happened; they do not prevent it, and the loss comes after the fact
- **D.** Removing the tool entirely also stops small routine refunds—an overreach that halts the refund business itself

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q14 Correct: A (D5 — Configuration & Knowledge Management)

Material that is only partly referenced and updated infrequently is best registered as a file in a knowledge source outside the conversation. Instead of loading the full text into context every time, only the needed parts are handled, which structurally resolves the strain, and updates are completed in one place.

**Why the others are wrong**

- **B.** Pasting the full text and then asking it to read selectively does not resolve the context strain and remains a request-only workaround
- **C.** A summary that discards the detailed clauses loses information and is an over-simplification that sacrifices the goal of accurately referencing the regulations
- **D.** `max_tokens` is a cap on generation length and does not solve input strain; it is merely an irrelevant parameter tweak

**References:**

- [ファイル・知識ソースの扱い](https://docs.claude.com/en/docs/build-with-claude/files)
- [Projects とは](https://support.claude.com/en/articles/9517075-what-are-projects)

---

### Q15 Correct: C (D5 — Configuration & Knowledge Management)

A stable, repeated procedure, once defined as an Agent Skill, can be reused by everyone with the same steps simply by invoking it, eliminating the per-time explanation. Externalizing the procedure as knowledge outside the conversation and sharing it by design matches the requirement.

**Why the others are wrong**

- **A.** Even on the wiki, the manual explanation in chat remains every time, so it is not reuse through externalization and stays a diligence-only practice
- **B.** Even a bigger model cannot infer an organization-specific 10 steps; depending on a higher-tier model provides no reusability
- **D.** Pasting a template still loads the procedure into context every time, so it is not true externalization and the repeated manual work remains

**References:**

- [Agent Skills（再利用可能な手順の外部化）](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview)

---

### Q16 Correct: B (D6 — Governance, Risk & Responsible Use)

The root risk—sending PII externally—is structurally resolved by anonymizing the data before it reaches Claude. Masked/tokenized text can be sent while preserving the business value of classification and trend analysis, satisfying both the regulatory concern and the business requirement at once. The key point is placing the control on the pipeline side rather than in a request to the model.

**Why the others are wrong**

- **A.** The problem (sending PII) goes away but so does the business (analysis)—an overreach. Abandoning value delivery when anonymization is available is not responsible use.
- **C.** A request in the prompt does not solve the structural data-flow problem. The fact that raw PII is actually sent externally does not change, and it is a measure that relies on the model's self-report.
- **D.** An after-the-fact audit log is merely a record after PII has already been sent; it does not prevent the sending itself. It detects but leaves the root cause in place.

**References:**

- [信頼・セキュリティ（データ取扱い）](https://trust.anthropic.com/)
- [商用利用規約](https://www.anthropic.com/legal/commercial-terms)

---

### Q17 Correct: D (D6 — Governance, Risk & Responsible Use)

Safety-critical final decisions are controlled by making human review mandatory as a matter of design. A design that limits Claude to a support/draft role and has a qualified human make the determination severs the path by which the model's error reaches the patient directly. Human-in-the-loop in high-risk areas is the basic form of governance.

**Why the others are wrong**

- **A.** A bigger model does not guarantee zero errors and is no basis for auto-finalizing a serious-risk area; scale is not a reason to skip review.
- **B.** Lowering `temperature` does not make the output correct and may deterministically repeat the same error; it skips review via an irrelevant parameter tweak.
- **C.** A disclaimer looks responsible, but the structure where a wrong low-priority rating is used as-is without human review does not change, so the underlying safety risk is not resolved.

**References:**

- [信頼・セキュリティ（データ取扱い）](https://trust.anthropic.com/)
- [ハルシネーションを減らす](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

---

### Q18 Correct: C (D6 — Governance, Risk & Responsible Use)

Governance questions—whether data is used for training, and how it is retained and handled—are determined by the provider's official policy and contract terms, not by the model's behavior. The Trust Center and Commercial Terms of Service are the primary sources and the correct references for legal to base the contract and data-flow design on.

**Why the others are wrong**

- **A.** `temperature` is a parameter controlling generation randomness and is unrelated to whether data is used for training; it is no basis.
- **B.** Model scale and data-handling policy are separate matters; choosing Opus does not change the data-use policy.
- **D.** Internal encryption and reactive handling proceed without confirming how the data is handled at the destination, and lack the primary-source confirmation legal is asking for.

**References:**

- [信頼・セキュリティ（データ取扱い）](https://trust.anthropic.com/)
- [商用利用規約](https://www.anthropic.com/legal/commercial-terms)

---

### Q19 Correct: A (D7 — Troubleshooting & Optimization)

Early settled facts get buried in a long conversation because the context bloats and the relative weight of important information drops. Extracting the settled facts as a structured summary and carrying it over to the front of the context lets the requirements be referenced stably no matter how many turns pass. Actively summarizing and repositioning, rather than passively piling up long context, is the standard practice.

**Why the others are wrong**

- **B.** A request in the prompt does not solve the structural cause of context bloat; reinforcing the instruction leaves the problem of important information getting buried.
- **C.** `max_tokens` is a cap on the output side and is unrelated to the mix-up in the input context; continuing to stack the full history only adds to the cause of degradation.
- **D.** Forcing the conversation to end is an overreach that halts the whole task and severely harms the customer experience; it does not improve the underlying context management.

**References:**

- [長い文脈を扱うコツ](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/long-context-tips)
- [コンテキストウィンドウの考え方](https://docs.claude.com/en/docs/build-with-claude/context-windows)

---

### Q20 Correct: B (D7 — Troubleshooting & Optimization)

The typical cause of output cutting off partway is that the output token allowance (`max_tokens`) is insufficient for the length needed to generate, or that input + output exceeds the context limit. When input volume varies widely by case, the correct starting point is to measure with token counting first and separate the relationship between the allowance and the limit. Identifying the cause and then adjusting the allowance solves it structurally.

**Why the others are wrong**

- **A.** A bigger model does not change the cause of insufficient `max_tokens` or context overflow, so the mid-output truncation is not resolved; scale is not the cause.
- **C.** `temperature` only changes output randomness and is unrelated to generation being cut off (exhausting the token allowance); it does not isolate the cause.
- **D.** Collecting logs is only after-the-fact analysis and merely defers isolating a cause—the relationship between input volume and the token allowance—that is immediately knowable by checking.

**References:**

- [トークン数を数える](https://docs.claude.com/en/docs/build-with-claude/token-counting)
- [コンテキストウィンドウの考え方](https://docs.claude.com/en/docs/build-with-claude/context-windows)

---

## Disclaimer / 免責事項

This is independent study material based on the published Anthropic exam blueprints.
It is not affiliated with, endorsed by, or sponsored by Anthropic.
The items are illustrative only and are **NOT** from the live exam bank.

本問題集は、Anthropic が公開している認定試験ブループリントに基づいて独自に作成した学習用教材です。
Anthropic とは無関係であり、Anthropic による承認・推奨を受けたものではありません。
掲載している問題はすべて出題形式を示すための例題であり、実際の試験問題ではありません。