# Claude Certified Architect – Professional (CCAR-P) — Answer Key & Rationale

## Answer Key & Rationale

**Scoring:** correct ÷ 63 is your accuracy. Approx scaled score = `100 + 900 × accuracy` (pass line 720 ≈ 72% accuracy). Record the domain of every miss and transfer it to the score sheet in README.md.

---

### Q1 Correct: B (D1 — Solution Design & Architecture)

Eligibility is a deterministic, versioned rule the business is counting on, and the threshold just moved from 12 to 6 months. Claude has no reliable way to know when the version it learned went stale, and it will state a stale answer in the same confident tone it uses for a correct one. The rules engine must own that decision; Claude reads the message and drafts the reply.

**Why the others are wrong**

- **A.** Reading and interpreting free-text is pattern-rich language work squarely in Claude's strength; moving it to the HRIS discards the one step Claude should own.
- **C.** Handing all drafting to a human removes the assistant's main value; drafting is language work for Claude, with human approval reserved for genuinely consequential actions, not routine replies.
- **D.** Enrollment tier is authoritative live data held by the HRIS; inferring it from message cues reintroduces a knowledge-boundary error the existing system already answers correctly.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q2 Correct: D (D1 — Solution Design & Architecture)

Precise numerical computation is exactly where next-token prediction and steerability fail: the model produces fluent, mostly-right figures but drifts on specifics, and confidence is not validity. High-stakes arithmetic must be owned by deterministic computation, with the model restricted to explaining the tool's result. Nothing changed in the inputs, so this is an inherent property, not a data or context defect.

**Why the others are wrong**

- **A.** The tariff data is current and unchanged; retrieval fixes stale knowledge, not arithmetic drift, so web search does not address the root cause.
- **B.** There is no evidence the request is oversized or truncated; the figure is generated in full, so a window problem is not what produces the off-by-a-few-dollars errors.
- **C.** A larger model still predicts tokens rather than computing deterministically; it lowers but never eliminates arithmetic drift, and betting accuracy on a bigger tier ignores the property in play.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)

---

### Q3 Correct: A (D1 — Solution Design & Architecture)

The task is well-defined, single-pass, and its output is machine-verifiable against a schema: that is the high-predictability, low-autonomy quadrant where an augmented call fits. An agent's non-deterministic trajectory adds latency, token cost, and observability gaps with no benefit when the six categories are fixed. Build the simplest pattern that meets the requirement and revisit only if measurement shows it falling short.

**Why the others are wrong**

- **B.** Tool use is available to augmented calls and workflows alike, not just agents; schema validation is downstream code and does not require an agent pattern.
- **C.** Six fixed categories on a one-page email is a single bounded call; per-category subagents multiply token spend and failure boundaries for a job one call already does.
- **D.** Throughput is handled by scaling concurrent independent calls, not by adopting an agent; the volume figure is real but irrelevant to the pattern decision.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [マルチエージェント調査システムの設計](https://www.anthropic.com/engineering/multi-agent-research-system)

---

### Q4 Correct: C (D1 — Solution Design & Architecture)

When the next step depends on what the last one turned up and the paths differ per input, the steps cannot be enumerated, which is precisely the case an agent is for. The agent's autonomy is the liability, so it is bounded by a narrow read-only tool entry point, a turn budget, and stopping criteria rather than removed. Forcing a fixed workflow onto genuinely unpredictable work makes it fail on the branches no one scripted.

**Why the others are wrong**

- **A.** A five-step script cannot cover branches that differ per CVE; auditability does not justify a pattern that structurally cannot reach the right answer.
- **B.** One pass over a static inventory cannot perform the iterative, evidence-driven investigation the task requires; the follow-up depends on intermediate findings.
- **D.** One subagent per service is a heavier assembly than the work needs and still does not solve the per-CVE branching within each investigation; it multiplies cost and failure boundaries.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [マルチエージェント調査システムの設計](https://www.anthropic.com/engineering/multi-agent-research-system)

---

### Q5 Correct: B (D1 — Solution Design & Architecture)

Delegation is decided by reversibility, stakes, and accountability: an unbounded credit and an unrecallable email are high-stakes and irreversible, so they belong behind a human gate, while small reversible credits can pass to preserve throughput. This places scarce reviewer attention where a wrong call actually costs, rather than gating everything or nothing. Claude drafts; a person authorizes what cannot be undone.

**Why the others are wrong**

- **A.** A prompt request to be careful is steerable, not enforceable; it leaves an irreversible high-value action entirely to the model's discretion.
- **C.** Removing the tools stops the harm by stopping the work; the agent can no longer perform its core function, which is over-restriction rather than calibrated control.
- **D.** Logging catches an unrecoverable email only after it is sent and a large credit only after it is issued; detection after the fact does not prevent the irreversible action.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q6 Correct: B, D (D1 — Solution Design & Architecture)

An agent moves the control flow out of inspectable code and into the model's trajectory, so there is no discrete step an auditor can point to, which is the observability cost. Because the model chooses its own sequence of turns, runtime and token consumption are open-ended and must be budgeted for the worst case. These are the two costs the team trades away when steps are actually knowable in advance.

**Why the others are wrong**

- **A.** This is false; augmented calls, workflows, and agents can all call tools, so tool use is not a cost the agent choice imposes.
- **C.** A larger model tier does not remove the agent's non-determinism, audit gaps, or open-ended cost; assuming the top tier absorbs the complexity ignores the actual tradeoff.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q7 Correct: C (D1 — Solution Design & Architecture)

Stock level is live transactional state owned by the warehouse system, not stable knowledge, so an index of periodic snapshots can only ever hold values that were true when it was written. Calling the system of record through a tool makes current state authoritative, while retrieval keeps doing the job it is good at: the stable spec sheets. The category error is representing live state as retrievable text in the first place.

**Why the others are wrong**

- **A.** A shorter refresh interval and a higher threshold only narrow the staleness window; between refreshes the index still serves a snapshot that can disagree with the WMS, so the confident-but-wrong answers persist.
- **B.** A better embedder and exact SKU matching improve retrieval quality, but the failure is not poor retrieval of the right chunk—it is retrieving any cached snapshot of state that changes independently of the index.
- **D.** A disclaimer plus mismatch logging detects and hedges the problem after the fact; it never gives the assistant the current value, so reps keep receiving stale stock figures.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

### Q8 Correct: B (D1 — Solution Design & Architecture)

A document-processing pipeline over semi-structured inputs goes wrong when there is no exception path: low-confidence extractions flow through the same route as clean ones with nothing to catch them. The fitting blueprint pairs extraction with an evaluator that validates against the schema and a confidence threshold and diverts the uncertain cases to a human gate, so the failures the model produces on hard scans stop reaching the LIS unchecked.

**Why the others are wrong**

- **A.** A stronger model reduces but never eliminates errors on handwritten or skewed scans, and with every extraction still posting on one path, the residual errors keep reaching the LIS with no gate to catch them.
- **C.** An autonomous agent adds non-deterministic trajectory to a task whose steps are already enumerable, enlarging the failure surface for a high-stakes clinical posting instead of adding the missing exception gate.
- **D.** More few-shot examples chase a zero error rate the model cannot guarantee on adversarial scans, and without an exception path the low-confidence cases still post automatically.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q9 Correct: A, C (D1 — Solution Design & Architecture)

Fan-out fails silently when synthesis runs over whatever results happened to return. A deterministic check at the code boundary—results returned must equal units dispatched, by ID—cannot be skipped or persuaded and catches the shortfall before anyone reads the summary. Pairing it with idempotent, retryable subagent work that retries or flags a timed-out unit recovers the failure at the boundary where it is recoverable, rather than letting a confident summary paper over incomplete work.

**Why the others are wrong**

- **B.** A larger orchestrator model still synthesizes over the results it received; a dropped subagent never arrives, so no model tier can track a unit that returned nothing, and the coverage gap remains.
- **D.** Asking the synthesis prompt to self-check leaves the completeness guarantee inside a probabilistic step that can confidently report "nothing missing"; the check must sit in deterministic code, not in the model's own reasoning.

**References:**

- [マルチエージェント調査システムの設計](https://www.anthropic.com/engineering/multi-agent-research-system)
- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q10 Correct: D (D1 — Solution Design & Architecture)

The recovery asymmetry is the point: a subagent failure is recoverable and is already handled, but an orchestrator that loses its thread takes the whole run and strands completed work. The design response is to protect and checkpoint the orchestrator's state and make subagent results idempotent, so a failed run resumes rather than restarts. The fix belongs at the orchestrator boundary, which is where the unrecoverable loss actually occurs.

**Why the others are wrong**

- **A.** More subagent retries hardens a boundary that is already recoverable and already handled; it does nothing for the orchestrator losing its synthesis state, which is where these runs actually failed.
- **B.** Smaller slices change the decomposition, not the orchestrator's fragility; a lost orchestrator thread still discards all subagent work regardless of how finely the task was split.
- **C.** A larger window does not preserve state across a failure—the run still restarts from nothing—so the loss recurs; window size was never the cause of the orchestrator losing its thread.

**References:**

- [マルチエージェント調査システムの設計](https://www.anthropic.com/engineering/multi-agent-research-system)
- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q11 Correct: A (D1 — Solution Design & Architecture)

Completeness is a deterministic property that must be enforced in code, not assumed of a probabilistic extractor. Reconciling the summed line items against the invoice's own stated total and line count at the code boundary before posting turns a silent omission into a caught mismatch that a human resolves. The guard sits where posting happens, so no dropped line reaches the ledger unnoticed regardless of how the model extracted.

**Why the others are wrong**

- **B.** A prompt instruction to be careful cannot guarantee completeness; the model can still drop a line and report a plausible total, and nothing deterministic verifies the count before posting.
- **C.** A higher model tier omits fewer lines but not zero, and with no reconciliation the residual omissions still post silently with a plausible-looking total.
- **D.** Raising max_tokens addresses truncation of the model's own output, not the model choosing to omit a line item; the invoices here are not being cut off, so the omission persists.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q12 Correct: B (D2 — Models, Prompting & Context Engineering)

A downgrade is a release, and its gate is an eval set that reflects the real distribution of work with a rollback threshold fixed before the run so the data cannot be renegotiated afterward. Stratifying by document type keeps a regression concentrated in a few types from being hidden by a healthy overall average, and it surfaces the partial-migration option of routing only the weak types to the stronger tier.

**Why the others are wrong**

- **A.** An overall average over a tiny, unstratified sample masks a regression concentrated in specific document types and is far too small to give per-type confidence.
- **C.** Monitoring complaints is after-the-fact detection that exposes users to exactly the regression a pre-ship eval is meant to catch, and by the time complaints rise the damage is done.
- **D.** Lowering max_tokens caps output length rather than the per-token tier cost that dominates the bill, and it changes behavior with no measurement of the quality effect.

**References:**

- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)
- [評価テストの作り方](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)

---

### Q13 Correct: C (D2 — Models, Prompting & Context Engineering)

The absence of a deliberate per-step tier decision was itself a decision: the system defaulted to the most expensive option and pays for capability that steps like a classifier never use. The fix is a per-step eval that lets each step drop to the lowest tier meeting its quality bar, reserving the top tier for the one or two steps that measurably need it, which is what makes the tier choice defensible rather than reflexive.

**Why the others are wrong**

- **A.** Forcing the cheapest tier everywhere abandons quality on the steps that genuinely need capability, trading a cost problem for a quality one with no eval to say which steps can safely drop.
- **B.** Caching trims token cost but leaves every step on the most expensive tier, so the structural overspend and the latency breach both remain.
- **D.** Extended thinking generates billed reasoning tokens and adds latency to every call, worsening the exact cost and latency budgets that are already breached.

**References:**

- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)
- [料金](https://docs.claude.com/en/docs/about-claude/pricing)

---

### Q14 Correct: B (D2 — Models, Prompting & Context Engineering)

Extended thinking generates billed thinking tokens and adds latency on every call, so it is worth enabling only when evals show an accuracy gap that it actually closes. A classifier making a simple routing decision shows no such gap, which makes the reasoning pass pure cost. The disciplined default is to run evals without extended thinking first and turn it on only against measured evidence.

**Why the others are wrong**

- **A.** 'Can only help' ignores that the pass is billed and slower on every single request while the eval shows no accuracy gain, so the team pays continuously with no proof it moves the metric.
- **C.** Temperature controls sampling randomness, not the thinking budget, and raising it on a classifier makes its routing less reliable rather than cheaper.
- **D.** A more capable tier adds cost without addressing that the reasoning pass itself earns nothing measurable on a simple routing step.

**References:**

- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)
- [料金](https://docs.claude.com/en/docs/about-claude/pricing)

---

### Q15 Correct: A, B (D2 — Models, Prompting & Context Engineering)

The failure is a monolithic strategy hitting the working-memory cliff: context accumulates every turn and the window fills until earlier material is truncated with no error signal. Budgeting below the ceiling with margin and actively compacting or summarizing accumulated context both keep what the next step needs inside the window, attacking the accumulation directly instead of postponing it.

**Why the others are wrong**

- **C.** A larger window only raises the ceiling; a monolithic strategy still accumulates until it fills, and attention quality can degrade on very long contexts before the hard limit is even reached.
- **D.** A prompt instruction cannot restore content that has already fallen outside the window, and steering the model to 'ignore' context is not a reliable control over how many tokens are sent.

**References:**

- [コンテキストウィンドウの考え方](https://docs.claude.com/en/docs/build-with-claude/context-windows)
- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [長い文脈を扱うコツ](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/long-context-tips)

---

### Q16 Correct: D (D2 — Models, Prompting & Context Engineering)

MCP is a sharing convention across clients, not a calling convention inside a single product, and its reusability payoff requires more than one client consuming the same tool entry point. With exactly one application and none planned, MCP adds a protocol layer and integration cost for a capability the team does not need, so direct API tool use is the right layer for this build.

**Why the others are wrong**

- **A.** 'Future-proof standardization' pays integration cost now for reuse that does not exist and may never arrive; MCP's value is reuse across clients, not standardization for its own sake.
- **B.** Splitting by state-changing versus read-only confuses tool-risk controls with the MCP decision, which turns on cross-client reuse rather than on how dangerous a given tool is.
- **C.** Removing the tools abandons the live lookups the workflow depends on and reintroduces the failure of making the model the source of truth for data another system owns.

**References:**

- [MCP（Anthropic ドキュメント）](https://docs.claude.com/en/docs/agents-and-tools/mcp)
- [Claude Developer Platform 概要](https://docs.claude.com/en/docs/intro)

---

### Q17 Correct: C (D2 — Models, Prompting & Context Engineering)

When a compliance constraint like attorney-client privilege applies, it eliminates entry points before cost, ergonomics, or build effort enter the conversation. A consumer chat product the firm cannot audit end to end fails that bar, whereas the API or SDK behind the firm's own approved gateway, where the firm owns logging, retention, and identity, is what survives a privilege review. Name the constraint and let it filter the options first.

**Why the others are wrong**

- **A.** A system-prompt instruction is steerable and does not create the auditable, firm-owned handling that privilege requires; the constraint is about the surface, not the model's wording.
- **B.** Transport encryption addresses interception in transit, not the end-to-end auditability and data-handling posture the privilege constraint actually turns on.
- **D.** Privileged material can be processed on a properly governed configuration the firm audits end to end, so abandoning the use case is an over-correction.

**References:**

- [信頼・セキュリティ（データ取扱い）](https://trust.anthropic.com/)
- [Claude Developer Platform 概要](https://docs.claude.com/en/docs/intro)

---

### Q18 Correct: A (D2 — Models, Prompting & Context Engineering)

The delivery route is decided by what the partner has already committed to, their cloud agreement, identity system, and data-residency policy, not by feature recency, because the model behaves the same on every route. An existing AWS commitment plus a residency requirement points to the AWS-hosted route with the region pinned, letting billing, identity, and audit inherit from the account the partner already runs.

**Why the others are wrong**

- **B.** New-feature lead time does not override a binding cloud commitment and a residency policy; the route is a procurement and compliance decision, not a features race.
- **C.** Splitting traffic doubles the integration surface and still routes the residency-sensitive half through the uncovered path, breaking the policy it was meant to satisfy.
- **D.** Latency is comparable across routes because the same model serves each, so performance is not the deciding factor when a residency constraint is in play.

**References:**

- [Claude Developer Platform 概要](https://docs.claude.com/en/docs/intro)
- [信頼・セキュリティ（データ取扱い）](https://trust.anthropic.com/)

---

### Q19 Correct: D (D2 — Models, Prompting & Context Engineering)

Context strategy is a spectrum, and monolithic is the right end for bounded, predictable-size, single-shot work where all the material fits, which is exactly this case. Staging retrieval here adds query-time latency, a recall failure mode, and an index to maintain with nothing to gain, and it forfeits the prompt-caching benefit a stable full-document prefix would offer. Progressive strategies earn their place with accumulation across turns or corpora too large to preload, neither of which applies.

**Why the others are wrong**

- **A.** Progressive is not universally superior; on a bounded single-shot task it adds latency and a recall failure mode for a token saving that does not matter when the document already fits.
- **B.** Compaction summarizes context that accumulates across turns, but a one-shot request accumulates nothing between calls, so there is nothing for it to compact.
- **C.** A larger window solves a fitting problem that does not exist here and keeps the unnecessary retrieval layer along with its latency and maintenance cost.

**References:**

- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)

---

### Q20 Correct: B (D3 — Integration)

When the primary endpoint is entirely unavailable, retrying it, however many times, cannot produce a response, because the request has nowhere else to go. A fallback chain in the orchestration layer gives the request an alternative path, a different model tier or a cached response, so the user-facing workflow degrades gracefully instead of failing outright. Fallback behavior should itself be exercised in the eval suite.

**Why the others are wrong**

- **A.** More retries against an endpoint that is fully overloaded still return nothing; retry-with-backoff handles brief transient blips, not sustained unavailability, so the workflow stays down.
- **C.** A more capable tier is not a reliability guarantee; any single endpoint can be overloaded, and one primary path with no alternative is still a single point of failure.
- **D.** After-the-fact logging and a later capacity request do nothing during the outage; the user-facing workflow already failed because there was no alternate path to route to.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [障害の切り分けと事後分析の実例](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues)

---

### Q21 Correct: C (D3 — Integration)

Reliability controls only work when each sits at the stage it governs: new attempts belong close to the API call, a circuit breaker belongs at the service boundary where it can measure a dependency's error rate and fail fast, and fallback chains belong in the orchestration layer where a request can be rerouted. Bundling them at one layer means protecting the wrong part of the system and leaving the right part exposed.

**Why the others are wrong**

- **A.** Raising the threshold silences the symptom without moving the controls to the layers they govern, so the circuit breaker still measures the wrong signal and the fallback still cannot engage at the request level.
- **B.** This inverts the correct placement; retries near the call and fallback in orchestration are what the layers need, and swapping them leaves each control watching the wrong scope.
- **D.** Dropping the circuit breaker and fallback removes real protections and leaves a single failure path, trading a placement bug for a system with no graceful degradation at all.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [障害の切り分けと事後分析の実例](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues)

---

### Q22 Correct: D (D3 — Integration)

A shared key makes tenant traffic indistinguishable at the limit boundary, so attribution and isolation are impossible by construction. Separate API keys per tenant scope the rate limit to each tenant, making consumption attributable and preventing one tenant's burst from throttling the rest. It is the structural fix, not a compensating measure applied after the breach.

**Why the others are wrong**

- **A.** A prompt request cannot change how the shared rate limit aggregates traffic; the tenants remain indistinguishable at the limit boundary and one spike still throttles everyone.
- **B.** Adjusting max_tokens tweaks per-call output size but does not isolate tenants or attribute usage; the shared-key blast radius is unchanged.
- **C.** Tenant-ID logging helps diagnose after the fact but neither isolates the blast radius nor prevents the shared-limit breach; the tenants still throttle each other in real time.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [障害の切り分けと事後分析の実例](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues)

---

### Q23 Correct: A, C (D3 — Integration)

Streaming changes when tokens arrive, not how many, so it improves perceived latency for an interactive user but does nothing for a non-interactive batch job's cost. Message Batches is built for large asynchronous volume with a relaxed deadline at reduced cost, which matches the nightly job but is unacceptable for users waiting on-screen. Matching each workload's dominant constraint, responsiveness versus cost and volume, to the right mechanism is the design point.

**Why the others are wrong**

- **B.** Batch processing is asynchronous with a delayed turnaround, which is the opposite of what an on-screen interactive user needs; cheaper responses are worthless if the user is left waiting minutes or hours.
- **D.** Streaming does not reduce billed tokens and gives no perceived-latency benefit to a non-interactive nightly job, so it addresses neither the cost nor the volume constraint that governs Workload 2.

**References:**

- [Agent SDK: streaming と single mode](https://docs.claude.com/en/api/agent-sdk/streaming-vs-single-mode)
- [Message Batches API（大量・非同期・低コスト）](https://docs.claude.com/en/docs/build-with-claude/batch-processing)

---

### Q24 Correct: C (D3 — Integration)

Prompt caching matches a static prefix starting at the very beginning of the prompt, so any variable content at the top invalidates the cache for everything after it. Because the injected timestamp and user name changed on every request, the 25,000-token handbook was never actually a stable prefix. Reordering so the unchanging handbook comes first and the volatile fields come after makes the large static block cacheable, which is where the savings live.

**Why the others are wrong**

- **A.** TTL is not the problem; the prefix is broken by variable content at the top, so nothing stable is being stored to survive any TTL in the first place.
- **B.** max_tokens affects output billing, not the reprocessing of the large input prefix, which is the actual cost driver here and the thing caching is meant to eliminate.
- **D.** A larger tier still reprocesses the whole prompt when the prefix is not cacheable; model choice does not fix an ordering that prevents the static block from ever being cached.

**References:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)

---

### Q25 Correct: A (D3 — Integration)

Without a bounded timeout, a slow call holds a shared resource indefinitely, so a few tail-latency requests can block the whole service; the failure is unbounded waiting, not the model itself. A per-request timeout tied to the SLA caps how long any one call can hold a thread and lets the system shed or fall back on the slow request while the rest keep flowing. Adding capacity only raises the ceiling that the same pile-up will eventually reach again.

**Why the others are wrong**

- **B.** More threads raise the ceiling but do not bound how long any single call holds one; at a higher peak the same unbounded waiting exhausts the larger pool and the service stalls again.
- **C.** Temperature governs sampling variability, not response duration, so it does not remove the latency tail that causes threads to block.
- **D.** A more capable tier does not guarantee a shorter tail, and with no timeout a single long call still holds a thread indefinitely; the root cause is unbounded waiting, not model tier.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [障害の切り分けと事後分析の実例](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues)

---

### Q26 Correct: C (D3 — Integration)

MCP earns its cost when a capability is shared across multiple consumers and needs one governed point of auth, rate control, and schema. With exactly one consumer and no reuse demand, a direct tool call meets the requirement without adding a service, auth surface, and on-call to maintain. Standing up the server for a single consumer is reuse-and-governance theater that pays operational cost for value that does not yet exist; introduce it when reuse is real.

**Why the others are wrong**

- **A.** Building an MCP server for a single, stable consumer adds a deployable service, auth, and on-call whose reuse benefit is hypothetical — governance theater that pays real operational cost for value that does not exist yet.
- **B.** Describing the endpoint in the prompt is a prompt-only substitute for real integration: the model cannot reliably execute an authenticated call from prose, and no auth, rate control, or schema enforcement lives there.
- **D.** Hard-coding the rate removes the integration but guarantees stale data every time the rate moves, trading a solvable integration for a silent-correctness problem.

**References:**

- [MCP（Anthropic ドキュメント）](https://docs.claude.com/en/docs/agents-and-tools/mcp)
- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q27 Correct: B (D3 — Integration)

The root cause is that a capability owned and updated by another team was forked into your prompt, so their change silently left your copy stale. Consuming the capability through the owner's interface — an agent-to-agent handoff or their MCP server — means every update propagates automatically and there is a single source of truth. The fix is an ownership-and-integration change, not a model, monitoring, or wording change.

**Why the others are wrong**

- **A.** A larger model does not know Risk's proprietary, frequently changing thresholds; capability, not raw reasoning, is missing, so the fork stays stale regardless of model tier.
- **C.** A drift-diff job only detects divergence after it has already caused wrong approvals; it leaves the fork in place and does not make your agent use the current rules.
- **D.** The prompt cannot reach Risk's latest thresholds — the agent has no access to them — so instructing it to use the newest rules is an unenforceable wish.

**References:**

- [リモートMCPサーバ](https://docs.claude.com/en/docs/agents-and-tools/remote-mcp-servers)
- [Agent SDK での MCP 接続](https://docs.claude.com/en/api/agent-sdk/mcp)

---

### Q28 Correct: D (D3 — Integration)

Probabilistic generation will occasionally violate any format no matter how the prompt is worded, so the structural guarantee has to live in code: validate each response against the schema before the write and re-prompt on a parse failure, so nothing invalid reaches the ledger. This client-side validation-and-retry loop closes the gap that a prompt request leaves open. Note this parse-error retry is a correctness gate, distinct from transient-error handling on the transport.

**Why the others are wrong**

- **A.** Prompt wording cannot make a probabilistic generator structurally correct on every call; it lowers the rate but leaves the same unguarded path to the ledger, so corrupt rows still post.
- **B.** A more capable model still emits invalid JSON some fraction of the time, and posting directly with no validation preserves the exact gap that lets malformed rows through.
- **C.** Temperature 0 reduces variance but does not guarantee schema-valid structure, and deleting the parser check removes the only barrier catching the malformed responses that remain.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [評価テストの作り方](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)

---

### Q29 Correct: A (D3 — Integration)

A loose tool schema is the structural cause: free-form strings and no required fields let the model produce arguments the API cannot accept. Encoding the contract in the schema — enums, required fields, correct types, and descriptions — makes invalid arguments rejectable at the boundary and steers the model toward well-formed calls, which is where the defect lives. The fix is the tool-interface definition, not prompt wording, a bigger model, or after-the-fact monitoring.

**Why the others are wrong**

- **B.** Prompt instructions restate the contract in prose the model can still drift from; without schema enforcement the same out-of-enum and missing-field calls recur.
- **C.** A stronger model reduces but does not eliminate malformed arguments, and a permissive schema still accepts the bad calls it does make, so the boundary stays unguarded.
- **D.** A downstream monitor detects broken shipments only after they are rejected or shipped wrong; it never prevents the malformed call the loose schema permits.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [MCP（Anthropic ドキュメント）](https://docs.claude.com/en/docs/agents-and-tools/mcp)

---

### Q30 Correct: C (D3 — Integration)

The pipeline's defining weakness is that it has no exception path: it routes every document through the same flow regardless of extraction confidence, so edge cases post wrong at the same rate clean ones post right. Adding confidence scoring and diverting only low-confidence extractions to human review — plus putting hard documents in the eval set — targets exactly the inputs that fail while leaving the clean majority automated. Reviewing everything or auditing afterward does not fit that shape.

**Why the others are wrong**

- **A.** Human-reviewing every document removes the failure by removing the automation, discarding the throughput the pipeline exists to provide; only the low-confidence tail needs a person.
- **B.** A stronger model narrows but does not close the edge-case error rate, and with no confidence gate the wrong extractions it still makes continue to post silently.
- **D.** A monthly reconciliation detects wrong values only after they have posted and acted downstream; it adds no exception path at the moment of extraction.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [評価テストの作り方](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)

---

### Q31 Correct: B (D3 — Integration)

Extracting an exact authoritative value is a precision task laid over probabilistic generation, so the same input can yield different figures across runs; a single augmented call with a direct write has no place to catch that. A verification step — regenerate-and-compare or a code-based match of the extracted figure against the source — turns the value into something checked before it can post, which is the control the architecture is missing. A clean demo is not evidence of determinism.

**Why the others are wrong**

- **A.** Temperature 0 reduces sampling variance but does not guarantee the extracted number matches the source, and removing the check leaves the wrong-value write path fully unguarded.
- **C.** A more capable model still mis-reads figures some of the time, and writing directly preserves the missing verification that is the actual defect.
- **D.** Nightly reconciliation catches a wrong principal only after it has posted and possibly driven downstream servicing actions; it detects rather than prevents the bad write.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)

---

### Q32 Correct: B (D4 — Evaluation, Testing & Optimization)

Evals authored before code function as acceptance criteria and as the gate every later change must pass: they force success to be defined measurably up front, expose design assumptions while they are still cheap to change, and let the team verify each prompt, model, or retrieval change throughout the build. A suite written only as final QA tends to describe what the system already does rather than what the business required.

**Why the others are wrong**

- **A.** Compute cost is not the reason evals belong first; the ordering matters because it makes success measurable and gives every change a gate. This reframes a design principle as a billing optimization.
- **C.** Manual spot-checks confirm specific inputs produce specific outputs but cannot tell you how the system behaves on inputs nobody thought to test — they are not a substitute for a suite defined against the requirement.
- **D.** This is factually wrong: an eval suite is authored from the task specification and golden dataset, both of which exist before production code. Nothing about eval tooling requires a finished system.

**References:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)
- [評価テストの作り方](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)

---

### Q33 Correct: C (D4 — Evaluation, Testing & Optimization)

Schema validation is unambiguous: the output either parses against the defined structure or it does not, which a function can check in milliseconds with no drift and no API call. Tone, reasoning quality, and persuasiveness all require interpretation and are the province of a model-based (or human) judge, because no deterministic function can supply that judgment.

**Why the others are wrong**

- **A.** Formality is an interpretive property, not a deterministic one; word-count or keyword heuristics do not capture whether tone reads as appropriate to a regulator, so it needs a judge.
- **B.** Assessing whether reasoning is sound and complete requires judgment a function cannot supply — this is the canonical model-based case, not a code-based one.
- **D.** Persuasiveness is an interpretive quality with no single correct answer, so it must be scored by a judge model or human, never by a deterministic check.

**References:**

- [評価テストの作り方](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)
- [Evaluation ツール](https://docs.claude.com/en/docs/test-and-evaluate/eval-tool)

---

### Q34 Correct: A (D4 — Evaluation, Testing & Optimization)

A judge is itself a system that can be wrong, and self-preference bias plus unconstrained free-form scores make its numbers untrustworthy. Calibrating against human-labeled outputs confirms the judge tracks human judgment, using a different model than the generator removes self-preference, and constrained verdicts with required reasoning make inconsistency detectable. Together these are what make an automated grade reliable.

**Why the others are wrong**

- **B.** A more capable model can still exhibit self-preference and still drift on borderline cases; capability does not substitute for calibration against human labels.
- **C.** Averaging more items only stabilizes an already-biased signal — a self-preferring, uncalibrated judge produces a more precise wrong number, not a trustworthy one.
- **D.** Logging scores for later investigation is detection after the harm; it does nothing to make the verdicts themselves correct, and the complaints are already the fallout.

**References:**

- [評価テストの作り方](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)
- [Evaluation ツール](https://docs.claude.com/en/docs/test-and-evaluate/eval-tool)

---

### Q35 Correct: C (D4 — Evaluation, Testing & Optimization)

Turning a business requirement into an eval criterion means naming the specific behavior, setting thresholds that come from the business need, and enumerating failure modes as dataset categories with adversarial inputs. "Accurate" becomes "extract these four fields at these pass rates, with these named failure modes," which is measurable and predictive of production. A vague definition produces a vague eval no matter how it is scored.

**Why the others are wrong**

- **A.** A numeric judge average still rests on an undefined notion of "accuracy" — it quantifies a vague criterion rather than specifying what correct extraction means field by field.
- **B.** Thresholds must come from the business requirement, not from whatever the prototype happens to hit; anchoring to the prototype's number bakes in the current system's limits instead of the need.
- **D.** A better judge does not fix an untestable criterion; without specified fields, thresholds, and failure modes there is nothing concrete for even a top-tier judge to measure against.

**References:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)
- [評価テストの作り方](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)

---

### Q36 Correct: B (D4 — Evaluation, Testing & Optimization)

A model swap is a change like any other and must pass the eval suite as its gate, with the current suite (matching the live prompt) and a per-category breakdown. Aggregate means hide regressions: a change can raise the average while quietly degrading edge cases or adversarial inputs, which is not a better system. Agreeing a rollback criterion before the swap is what makes the gate enforceable.

**Why the others are wrong**

- **A.** An aggregate mean can rise while performance on edge cases and adversarial inputs falls; without the category breakdown, the number does not establish improvement.
- **C.** Serving the unvalidated model to users and watching complaints is detection after users are already exposed — the swap should clear the eval gate first.
- **D.** "More capable is always safe" ignores task fit, cost, latency, and the possibility of category-level regressions; capability tier is not a substitute for an eval gate.

**References:**

- [評価テストの作り方](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)
- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)

---

### Q37 Correct: A, D (D4 — Evaluation, Testing & Optimization)

Both failures are properties of the eval dataset, not the grading method. The set was assembled from convenient inputs, so it never covered the non-standard obligation structures production surfaced — it measured a different input distribution than the one shipped. And it was not refreshed after the prompt changed, so it kept passing against expected outputs the revised system no longer produced. A non-representative and out-of-date golden dataset gives false confidence precisely while a regression is live.

**Why the others are wrong**

- **B.** The scenario shows no mismatch between grading method and behavior; the failure is a dataset that was unrepresentative and stale, which no change of grader would have caught.
- **C.** There is no evidence the same model was used as generator and judge, and self-preference is not what let a whole untested contract class through — the dataset gap is.

**References:**

- [評価テストの作り方](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)
- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)

---

### Q38 Correct: D (D4 — Evaluation, Testing & Optimization)

The token budget per request is where cost models most often go wrong: teams compute an average and treat it as the distribution. When the distribution is skewed, a minority of long documents drives most of the token spend, so an average-based model can understate true cost by two to three times. The fix is to model the distribution — typical cases and the expensive tail — not a single average.

**Why the others are wrong**

- **A.** Latency is a separate dimension from cost; substituting a latency statistic does not explain a token-spend underestimate, and the described error is about the token distribution, not timing.
- **B.** Choosing the tier before knowing volume is not the flaw described; the estimate breaks because it used an average token count against a skewed distribution.
- **C.** Nothing in the scenario indicates output was mispriced at the input rate; the load-bearing error is modeling a skewed token distribution as its average.

**References:**

- [料金](https://docs.claude.com/en/docs/about-claude/pricing)
- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)

---

### Q39 Correct: A (D4 — Evaluation, Testing & Optimization)

SLA breaches are driven by the slow end of the distribution, so p95 measured under realistic concurrent load — not a single-request median from a demo — is the correct design target. The median describes the middle of the pack and says nothing about the tail where the breaches actually occur. Signing off on a single-request median is why the SLA held in the demo and failed in production.

**Why the others are wrong**

- **B.** The median still describes the middle of the distribution; raising the measurement volume does not make it reflect the slow tail that breaches the SLA.
- **C.** The fastest demo latency is a best case, not a target the system trends toward under load — it understates real-world latency even more than the median.
- **D.** Averaging deliberately hides the tail; the slowest requests are exactly what the SLA target must capture, so smoothing them out defeats the purpose.

**References:**

- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)
- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)

---

### Q40 Correct: B (D4 — Evaluation, Testing & Optimization)

Accuracy can only be measured against known-correct answers, so it needs a labeled ground-truth dataset that is representative of production inputs and includes edge cases and counterexamples. Without ground truth there is nothing to score against, and a dataset of only clean inputs will not predict production performance. The metric suite works because each metric — accuracy, latency, cost, safety — has its own defensible measurement basis.

**Why the others are wrong**

- **A.** Scoring outputs with the generating model supplies no external ground truth and invites self-preference; real inputs alone do not tell you which answers were correct.
- **C.** A one-time spot-check of fifty outputs confirms specific cases but is not a representative, reusable measurement basis and cannot track accuracy as the system changes.
- **D.** A judge score without a labeled reference measures agreement with the judge, not correctness; accuracy specifically requires comparison to known-correct outputs.

**References:**

- [評価テストの作り方](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)
- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)

---

### Q41 Correct: C (D4 — Evaluation, Testing & Optimization)

Prompt caching is the most effective cost lever when the system prompt is long and stable: the processed prefix is preserved and not reprocessed on later requests, and cache reads are billed far below the standard input rate. A 5,000-token prefix reused across 50,000 requests is exactly that case, so caching cuts the dominant input-token driver without touching output quality.

**Why the others are wrong**

- **A.** A more capable tier generally costs more per token, not less, and does nothing to address the repeated 5,000-token input prefix that dominates the bill.
- **B.** Raising the output cap adds cost rather than cutting it and does not touch the input-token spend that the breakdown identifies as the driver.
- **D.** Slashing max_tokens trims output cost at the expense of answer quality and still leaves the dominant input-prefix cost fully in place.

**References:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)
- [料金](https://docs.claude.com/en/docs/about-claude/pricing)

---

### Q42 Correct: C (D5 — Governance, Safety & Risk)

Training-time alignment reduces broad classes of harm for every request but never saw this deployment's tenant-isolation rule. A request can fit Claude's general alignment and still violate a deployment-specific rule, so the rule has to live in a layer the architect builds—here a deterministic tool-call/data authorization check. A policy encoded in no layer is enforced by no layer.

**Why the others are wrong**

- **A.** Trained alignment was working as designed; it covers broad harm, not tenant scoping. There was nothing to regress because the rule was never part of training in the first place.
- **B.** Hardening the user-input classifier targets the wrong gate. The request was in-domain and non-adversarial, so no volume of jailbreak examples would classify it as disallowed; isolation is an authorization decision, not a content-screening one.
- **D.** A system-prompt instruction steers behavior but does not enforce it; an unusual or adversarial input can talk the model out of it. Authorization must be a runtime control, not a request to the model.

**References:**

- [ジェイルブレイク／インジェクション緩和](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks)
- [信頼・セキュリティ（データ取扱い）](https://trust.anthropic.com/)

---

### Q43 Correct: D (D5 — Governance, Safety & Risk)

Whether a specific side-effecting action is permitted for this caller in this context is an authorization question the architect owns, not trained behavior the vendor owns. Authorization should be deterministic—an allowlist plus identity and scope—so it is auditable and can be replayed. Trained alignment covers broad harm, and screening judges content, neither of which decides caller permissions.

**Why the others are wrong**

- **A.** Trained behavior covers broad harm applied to every request without configuration; it has no knowledge of this deployment's callers or its authorization model, so it cannot make a per-caller permission decision.
- **B.** System-prompt instructions steer the model but do not enforce anything an adversarial input can override; a permission boundary stated only in the prompt is guidance, not a control.
- **C.** Output screening runs after the model produces text and judges content, not actions. By the time it inspects the response, a side-effecting tool call has already executed, so it cannot authorize the action.

**References:**

- [Claude Code の権限モデル](https://docs.claude.com/en/docs/claude-code/iam)
- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q44 Correct: B (D5 — Governance, Safety & Risk)

The only irreversible action on this path—moving money—ran before any control looked at the request. Output screening judges text, not actions, so a control at the end cannot gate a side effect that has already occurred. A guarded path needs authorization before the side-effecting tool executes (and input screening on the way in), not one filter downstream of the action.

**Why the others are wrong**

- **A.** A more capable judge on the output changes nothing about ordering: the refund still executes before the classifier runs. Screening text after the money moved cannot undo the transaction.
- **C.** Reconciling refunds after the fact is detection, not prevention; the irreversible action has already taken effect, and not every wrong refund is cleanly recoverable. It leaves the unauthorized-action gap open.
- **D.** A prompt instruction is steerable guidance, not an enforced authorization gate. It does not stop a talked-into or malformed tool call from executing the refund.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Claude Code の権限モデル](https://docs.claude.com/en/docs/claude-code/iam)

---

### Q45 Correct: A, C (D5 — Governance, Safety & Risk)

Indirect injection arrives through retrieved content, which reaches the model after user-input screening has already passed, so it needs its own screening control on retrieved text and tool outputs. Isolating untrusted content from trusted instructions handles the input side; deterministic authorization on the side-effecting tools is the second, independent line that stops the induced action even if screening misses the payload. The two controls cover each other's blind spots.

**Why the others are wrong**

- **B.** Tightening the user-message classifier hardens the wrong gate: the malicious instruction never came through the user message, it came through the fetched page after that gate had already passed.
- **D.** Temperature governs sampling randomness, not whether the model treats retrieved text as authoritative; it is knob-twiddling that leaves the injection path and the unauthorized action fully open.

**References:**

- [ジェイルブレイク／インジェクション緩和](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks)
- [検索結果を根拠付きで渡す](https://docs.claude.com/en/docs/build-with-claude/search-results)

---

### Q46 Correct: A (D5 — Governance, Safety & Risk)

Human review is a finite budget spent by stakes: reversibility and cost of a wrong answer set the stakes, and calibrated confidence decides how much of that high-stakes volume can pass unreviewed. A hard-to-reverse, high-cost PO belongs at pre-action approval; the reversible, low-cost majority can run with sampling. This targets attention where a mistake is expensive and irreversible.

**Why the others are wrong**

- **B.** A weekly audit is post-action detection for an action that cannot be recalled once it reaches the supplier, so the damage is already done by the time the log is read.
- **C.** Gating all 2,000+ POs floods reviewers and produces consent fatigue—they approve without reading—so the high-value orders get the same rubber stamp as trivial ones. Route by stakes, not volume.
- **D.** A larger model does not change reversibility or cost of error; a confidently wrong, irreversible order can still ship. Model capability is not a substitute for a human gate on high-stakes actions.

**References:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Claude Code の権限モデル](https://docs.claude.com/en/docs/claude-code/iam)

---

### Q47 Correct: C (D5 — Governance, Safety & Risk)

The decision log is needed for transparency and reconstruction, so removing it destroys a required capability. The exposure comes from unminimized sensitive fields and broad access, which minimization, redaction, scoped access, and a governed retention limit address without losing reconstructability. Logging for transparency and minimizing for compliance use the same log, governed differently.

**Why the others are wrong**

- **A.** Deleting the logs is over-restriction: it eliminates the exposure by eliminating the ability to reconstruct or explain a decision to a regulator, which the deployment is obligated to preserve.
- **B.** Encryption protects data in transit and at rest but does nothing about broad internal read access or the fact that raw identifiers are being retained indefinitely; it addresses a different threat than the one flagged.
- **D.** Restricting reads helps, but keeping every raw field and extending retention ignores minimization and retention-limit obligations, so the core data-governance exposure remains.

**References:**

- [信頼・セキュリティ（データ取扱い）](https://trust.anthropic.com/)
- [商用利用規約](https://www.anthropic.com/legal/commercial-terms)

---

### Q48 Correct: B (D5 — Governance, Safety & Risk)

A regulation states an outcome and leaves the control to you; proving compliance requires a control tied to an accountable owner and a living evidence artifact a reviewer can inspect, revalidated as the system drifts. The residency control was correct on paper and silently false in production because nothing owned it and no artifact tracked where data landed. A control with no owner and no evidence goes non-operational unnoticed and fails at audit.

**Why the others are wrong**

- **A.** Model capability has no bearing on where request metadata is stored; residency is an infrastructure and configuration control, and no model choice would have caught the second-region write.
- **C.** A prompt instruction cannot control where a logging pipeline writes data; residency is enforced by configuration and evidenced by a data-flow record, not by asking the model.
- **D.** Circulating a stronger policy document is more paper, not proof; a reviewer accepts evidence that a control is live, and a broadcast policy still leaves no owner and no artifact showing data stayed in-region.

**References:**

- [信頼・セキュリティ（データ取扱い）](https://trust.anthropic.com/)
- [商用利用規約](https://www.anthropic.com/legal/commercial-terms)

---

### Q49 Correct: D (D5 — Governance, Safety & Risk)

The threat is baked into the bundle upstream, so the defense must move earlier: audit the code against its stated purpose for anomalous or out-of-scope behavior, then contain what the audit might miss by running it sandboxed with least privilege and no standing credentials. A trusted-source policy shrinks the surface, and an explicit recorded verdict makes the decision auditable. Conversation-level screening cannot see code that runs when the Skill is invoked.

**Why the others are wrong**

- **A.** Output monitoring is after-the-fact: by the time a downstream effect appears, the bundled code has already executed, exfiltrated, or written to disk. It does not prevent the code-execution risk.
- **B.** A system-prompt instruction cannot bind code inside a bundle; the executable logic runs regardless of what the prompt says, so this is prompt-only theater against a supply-chain risk.
- **C.** Assuming the platform screens Skills is an unverified assumption the module explicitly warns against; you must confirm what automated vetting actually catches rather than treating the marketplace as a guarantee.

**References:**

- [Agent Skills のベストプラクティス](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices)
- [Claude Code の権限モデル](https://docs.claude.com/en/docs/claude-code/iam)

---

### Q50 Correct: B (D5 — Governance, Safety & Risk)

Explaining or reconstructing one decision requires capturing what drove it—the inputs, retrieved context, output, and routing—keyed so that decision can be replayed and compared. The team logged only outcomes and an aggregate, which cannot answer why a specific applicant was denied or whether similar cases matched. Transparency is an architecture property you instrument per decision, not a property you assume.

**Why the others are wrong**

- **A.** A more capable model does not create a record of what happened; the regulator is asking for reconstruction and consistency evidence, which no model tier provides after the fact.
- **C.** A disclaimer and an appeal path inform the applicant but capture nothing about the original decision, so the team still cannot reconstruct why this denial occurred.
- **D.** An aggregate fairness metric is real but cannot explain or reproduce any single decision; overall numbers can look fine while one applicant's denial remains unexplainable.

**References:**

- [信頼・セキュリティ（データ取扱い）](https://trust.anthropic.com/)
- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)

---

### Q51 Correct: B (D6 — Stakeholder Communication & Lifecycle Management)

An experience word like "invisible" is a preference, not a constraint: it signals that more elicitation is needed. The translation move is to ask what would break the experience and convert each answer into a bounded, testable constraint (a latency budget, a no-re-entry rule, a safe failure path) the design can be built against and measured on.

**Why the others are wrong**

- **A.** Writing the preference down as-is leaves the design nothing to build against; "invisible" is the stakeholder's summary of an experience, not a requirement, and the constraint underneath it is never surfaced.
- **C.** Proposing an architecture before the translation is done is exactly the failure mode where a plausible sketch ends the questions discovery exists to ask; the director's approval of the sketch then hides the constraints that were never elicited.
- **D.** One second is a number the architect invented, not one the stakeholder stated; committing to it fabricates a constraint that may be wrong and skips the elicitation that would have produced the real budget.

**References:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)
- [ユースケースガイド](https://docs.claude.com/en/docs/about-claude/use-case-guides/overview)

---

### Q52 Correct: C (D6 — Stakeholder Communication & Lifecycle Management)

A requirement must trace to something the stakeholder actually said; an assumption is something the design takes for granted that was never stated. Items 1, 2, and 4 each trace to a spoken statement, but no statement authorizes an automated adverse decision with no human in the loop — and it contradicts the sign-off principle the stakeholder did state. An unsourced assumption like this is the most dangerous kind because nobody remembers deciding it, and here it embeds a consequential, unreviewed action.

**Why the others are wrong**

- **A.** Item 1 traces directly to "an officer signs off before anything goes to the borrower," so it is a documented requirement, not an unsourced assumption.
- **B.** Item 2 traces to "it should feel quick"; turning a perceived-responsiveness preference into a latency budget is the intended discovery translation, not an undocumented assumption.
- **D.** Item 4 traces to "we're a regulated lender, keep the paper trail"; an audit-trail requirement is the documented proof obligation the stakeholder named, so it is sourced.

**References:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)
- [ユースケースガイド](https://docs.claude.com/en/docs/about-claude/use-case-guides/overview)

---

### Q53 Correct: D (D6 — Stakeholder Communication & Lifecycle Management)

A complete tradeoff names three elements: what the choice gains, what it gives up, and what a reversal costs once the system depends on the decision. The presentation covered the gain and answered a per-call number, but never surfaced the reversal cost — the load-bearing element that would have turned "the simpler technical answer" into "the better business choice" and let the CTO approve a monthly bill, not just a direction.

**Why the others are wrong**

- **A.** The gain was stated and was not the problem; simplicity was real, and inflating or deflating it would not have exposed the production-volume cost the CTO objected to.
- **B.** A cost range would still have been a per-call figure; the CTO approved an accurate per-call number and was blindsided by the monthly total and the cost of unwinding, which a range does not convey.
- **C.** Caching is a genuine cost lever, but it is not the missing element of the tradeoff frame; even with caching evaluated, the presentation still omitted what reversing a full-context design would cost at scale.

**References:**

- [料金](https://docs.claude.com/en/docs/about-claude/pricing)
- [コンテキストウィンドウの考え方](https://docs.claude.com/en/docs/build-with-claude/context-windows)

---

### Q54 Correct: A (D6 — Stakeholder Communication & Lifecycle Management)

In an architecture review the recommendation is often technically correct yet not understandable to the person who must approve it. The fix is translation, not more detail: frame each option as a package — what it gains, what it gives up, and what a reversal costs — in the stakeholder's business terms, and recommend one, so the VP makes an informed decision they can defend upward.

**Why the others are wrong**

- **B.** More technical detail deepens the exact problem that stalled the meeting; the VP needed the options translated into business consequences, not a denser description of the internals.
- **C.** Handing the decision to the engineering lead removes the actual decision owner; the VP owns the operational tradeoff and must be equipped to choose, not bypassed.
- **D.** Delivering a verdict instead of a decision package leaves the VP approving a recommendation they do not understand, which is exactly the false-alignment failure that surfaces later when the downside appears.

**References:**

- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)
- [料金](https://docs.claude.com/en/docs/about-claude/pricing)

---

### Q55 Correct: C (D6 — Stakeholder Communication & Lifecycle Management)

A capabilities demo answers "what can this system do?" and creates interest; only a scenario-specific demo answers "what does this do with my problem, my workflow, my constraints?" and creates confidence. Using unrelated sample data made the demo feel generic, so the buyer questioned whether the team understood their problem — undoing the trust discovery had earned.

**Why the others are wrong**

- **A.** Adding more generic features makes the demo broader, not more relevant; the miss was recognition of the buyer's own workflow, which more capabilities do not supply.
- **B.** A bigger model does not fix a demo that shows the wrong scenario; the buyer's doubt was about fit to their problem, not raw capability or output quality.
- **D.** No limitation was surfaced here; the demo failed by being generic, and naming a scoped limitation early would generally have signaled rigor rather than eroded confidence.

**References:**

- [ユースケースガイド](https://docs.claude.com/en/docs/about-claude/use-case-guides/overview)
- [Claude Developer Platform 概要](https://docs.claude.com/en/docs/intro)

---

### Q56 Correct: A, C (D6 — Stakeholder Communication & Lifecycle Management)

An SLA names what is measured, what counts as a breach, and what happens when one occurs, and its thresholds must trace to a tangible source — latency to the user-experience expectation, quality to the eval acceptance criteria, availability to business criticality. Tying each number to its source keeps it defensible, and defining the breach and the remedy is what turns a target into a commitment.

**Why the others are wrong**

- **B.** The best latency seen in a proof of concept is a best-case artifact of light load, not a defensible threshold; production volume typically runs orders of magnitude higher and will not hold that number.
- **D.** An industry-standard figure is not traceable to this deployment's users, evals, or criticality, so it is a number chosen because it sounds reasonable — exactly what a defensible SLA must avoid.

**References:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)
- [ユースケースガイド](https://docs.claude.com/en/docs/about-claude/use-case-guides/overview)

---

### Q57 Correct: B (D6 — Stakeholder Communication & Lifecycle Management)

The feedback loop exists because a signal is not yet a decision; triage separates noise from monitorable drift from a breach. A self-resolved spike is noise, cost drift inside budget is monitorable, but a sustained quality decline crossing a committed SLA threshold is a breach — and the SLA defines what the team owes when one occurs, which is what forces escalation beyond the team.

**Why the others are wrong**

- **A.** A single spike that self-resolved is noise; visibility to users does not make a transient, recovered event a stakeholder matter, and escalating it wastes the scarce review attention the loop is meant to protect.
- **C.** Cost still inside the agreed budget has not crossed a threshold, and no rule makes cost automatically outrank quality; this inverts triage by escalating a monitorable drift over an actual breach.
- **D.** Forwarding every raw signal unfiltered defeats the decision layer the feedback loop is; without triage the stakeholder gets noise alongside the breach and the real signal is buried.

**References:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)
- [障害の切り分けと事後分析の実例](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues)

---

### Q58 Correct: D (D6 — Stakeholder Communication & Lifecycle Management)

A dashboard collects and displays signals; a feedback loop maps each signal to a trigger, an owner, and a required action. The eval score was visibly drifting from week 4, but no governance rule connected a slow drift to a review trigger, so a drift that never crossed a hard threshold stayed invisible until a human happened to notice. Monitoring is not a feedback loop.

**Why the others are wrong**

- **A.** Tuning the error-rate alert treats the wrong signal; the drift was in the eval score, not the error rate, and a threshold alarm still misses a gradual decline that never spikes.
- **B.** A bigger model does not supply the missing decision layer; the failure was that no rule escalated a known, collected signal, not that the model was insufficiently capable.
- **C.** Retention only helps someone who is already looking; the problem was that nothing triggered a look, so keeping the data longer detects nothing on its own.

**References:**

- [障害の切り分けと事後分析の実例](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues)
- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)

---

### Q59 Correct: A (D6 — Stakeholder Communication & Lifecycle Management)

Limit placement means deciding in advance which one or two limitations to name and framing them as intentional scope boundaries. If a buyer discovers a limitation mid-demo, confidence drops; naming it early reads as discipline and honesty, and in regulated industries an upfront, clearly scoped boundary signals rigor rather than risk.

**Why the others are wrong**

- **B.** Hiding the limitation and hoping it stays hidden is precisely the failure mode the prior demo showed; when a scrutinizing procurement team discovers it live, confidence collapses.
- **C.** Making a limitation appear to work by swapping models is misleading, not scoping; it manufactures a false impression a regulated buyer's diligence will later expose, destroying trust.
- **D.** Cancelling the demo until the system is perfect forfeits the opportunity over a boundary that could have been framed as intentional scope; a clearly named limit advances the deal rather than sinking it.

**References:**

- [ユースケースガイド](https://docs.claude.com/en/docs/about-claude/use-case-guides/overview)
- [Claude Developer Platform 概要](https://docs.claude.com/en/docs/intro)

---

### Q60 Correct: B (D7 — Developer Productivity & Operational Enablement)

An org-provisioned Skill is the simplest path when a capability genuinely should reach everyone and there is no need for versioning or rollback, which is exactly this asset's profile. Matching the mechanism to the asset's real requirements avoids paying for governance machinery that buys nothing here. Adding plugin-based version control and group targeting would be complexity without a corresponding need.

**Why the others are wrong**

- **A.** A project Skill scopes to individual repositories and versions per team, which fragments an org-wide standard into many copies instead of one baseline everyone shares.
- **C.** Plugin distribution is the strongest governance option, but its group targeting and rollback are unneeded here; choosing it adds a connected repo and version pipeline to solve problems this stable, org-wide asset does not have.
- **D.** An API Skill is for machine-to-machine reuse called from products' own code, not a human-facing capability that engineers invoke in their day-to-day tooling.

**References:**

- [Skills 発表](https://www.anthropic.com/news/skills)
- [Agent Skills のベストプラクティス](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices)

---

### Q61 Correct: C (D7 — Developer Productivity & Operational Enablement)

Leaving model choice unmanaged quietly routes work to a more capable, more expensive tier than the task needs, and at team scale that multiplies across every member and request. The structural fix is the spend posture set in configuration before the bill grows: defaults, allowlists, effort guidance, and per-user and org caps that bound consumption regardless of individual behavior. This puts the control at team setup rather than at monthly cleanup.

**Why the others are wrong**

- **A.** Reconciling spend after the invoice arrives is detection after the fact; it coaches individuals reactively instead of bounding consumption at the configuration layer where it multiplies.
- **B.** Defaulting everyone to the top tier is the exact over-spend pattern the guardrails exist to prevent; a more capable tier costs more per request and is not required for most work.
- **D.** Trimming max_tokens shaves per-call cost marginally but does not address the structural driver, which is unmanaged model-tier selection across the whole team.

**References:**

- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)
- [料金](https://docs.claude.com/en/docs/about-claude/pricing)

---

### Q62 Correct: A (D7 — Developer Productivity & Operational Enablement)

Resolving one incident yourself is firefighting; teaching the team the symptom-to-cause path they can follow again is support that lasts. A runbook of known symptom-cause-action paths plus a clear escalation path lets a first-line engineer resolve recurring issues without the architect, so you are needed only for genuinely new problems. That converts a recurring dependency into team self-sufficiency.

**Why the others are wrong**

- **B.** Being the fast fixer feels responsible but keeps the architect as the single point of resolution; it never builds the team's ability to handle the next familiar issue on its own.
- **C.** More dashboards and alerts surface symptoms but do not tell a first-line engineer which architecture cause to check or what action to take; detection without a documented path still routes every issue to the architect.
- **D.** A more capable model tier does not address authorization, rate-limit, or error-path causes of intermittent tool failures, and it does nothing to build the team's diagnostic self-sufficiency.

**References:**

- [ベストプラクティス](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code 概要](https://docs.claude.com/en/docs/claude-code/overview)

---

### Q63 Correct: A, B (D7 — Developer Productivity & Operational Enablement)

The verification checklist exists to hold AI-generated code to the same correctness, security, maintainability, and human-understanding bar as any other code before it reaches production. The human-understanding check (the author can explain the behavior, including untested inputs) is exactly what would have caught the unvalidated input, and the security check (least-privilege access and input validation) is what stops that class of leak structurally. Both are pre-production gates, not post-hoc measures.

**Why the others are wrong**

- **C.** Exempting AI-generated code from security review because a capable model wrote it is judgment erosion; model capability is not evidence of correctness, and the checklist's whole purpose is to hold that code to the same standard.
- **D.** After-the-fact audit logging detects a problem only once it has already shipped and caused harm; it is not a check that gates the change before production, which is what the checklist is for.

**References:**

- [ベストプラクティス](https://www.anthropic.com/engineering/claude-code-best-practices)

---

## Disclaimer / 免責事項

This is independent study material based on the published Anthropic exam blueprints.
It is not affiliated with, endorsed by, or sponsored by Anthropic.
The items are illustrative only and are **NOT** from the live exam bank.

本問題集は、Anthropic が公開している認定試験ブループリントに基づいて独自に作成した学習用教材です。
Anthropic とは無関係であり、Anthropic による承認・推奨を受けたものではありません。
掲載している問題はすべて出題形式を示すための例題であり、実際の試験問題ではありません。