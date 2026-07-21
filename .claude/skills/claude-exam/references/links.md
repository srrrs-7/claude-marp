# 参照リンク集（ドメイン別）

**このファイルにあるURLだけを問題の `refs` に使う。URLの創作は禁止。**
新しいURLが必要なら、先に到達確認してからこのファイルに追記する:

```bash
curl -s -o /dev/null -w '%{http_code}\n' -L --max-time 15 "<URL>"   # 200 以外は追記しない
```

最終確認: 2026-07-20（全URL HTTP 200）。`scripts/check-exam.ts` は生成物の `refs` がこのファイルに載っているかを検査する。

---

## 0. 認定プログラム本体（冊子の表紙・受験導線に使う）

| 用途 | URL |
|---|---|
| Pearson VUE — Claude Certification Program（受験予約・試験ポリシー） | https://www.pearsonvue.com/us/en/anthropic.html |
| Anthropic Academy — Partner Certifications（4試験の一覧・Exam Guide入手） | https://anthropic-partners.skilljar.com/page/partner-certifications |
| 認定FAQ（合格点・再受験ポリシー・有効期限） | https://anthropic-partners.skilljar.com/page/faq-certifications |
| 試験対策コース一覧 | https://anthropic-partners.skilljar.com/page/claude-certification-exam-prep-courses |
| CCAO-F 認定ページ | https://anthropic-partners.skilljar.com/claude-certified-associate-foundations-certification |
| CCA-F（Architect – Foundations）認定ページ | https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification |

---

## 1. 全試験共通の土台

| 主題 | URL |
|---|---|
| ドキュメント入口 | https://docs.claude.com/en/home |
| Claude Developer Platform 概要 | https://docs.claude.com/en/docs/intro |
| モデル一覧・世代 | https://docs.claude.com/en/docs/about-claude/models/overview |
| モデルの選び方（階層とトレードオフ） | https://docs.claude.com/en/docs/about-claude/models/choosing-a-model |
| 料金 | https://docs.claude.com/en/docs/about-claude/pricing |
| ユースケースガイド | https://docs.claude.com/en/docs/about-claude/use-case-guides/overview |
| コンテキストウィンドウの考え方 | https://docs.claude.com/en/docs/build-with-claude/context-windows |
| プロンプトエンジニアリング概要 | https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview |

---

## 2. CCAO-F（Associate）

| ドメイン | 主題 | URL |
|---|---|---|
| D1 Prompting | システムプロンプトで役割を与える | https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/system-prompts |
| D1 Prompting | XMLタグで指示と資料を分離 | https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags |
| D1 Prompting | 段階的思考を促す | https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought |
| D2 Output Evaluation | ハルシネーションを減らす | https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations |
| D2 Output Evaluation | 引用（Citations）で出典を検証可能にする | https://docs.claude.com/en/docs/build-with-claude/citations |
| D2 Output Evaluation | 成功基準の定義 | https://docs.claude.com/en/docs/test-and-evaluate/define-success |
| D3 Product & Model | モデルの選び方 | https://docs.claude.com/en/docs/about-claude/models/choosing-a-model |
| D3 Product & Model | Artifacts とは | https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them |
| D3 Product & Model | Projects とは | https://support.claude.com/en/articles/9517075-what-are-projects |
| D4 Workflow Integration | 効果的なエージェントの作り方（workflow と agent の境目） | https://www.anthropic.com/engineering/building-effective-agents |
| D5 Configuration | ファイル・知識ソースの扱い | https://docs.claude.com/en/docs/build-with-claude/files |
| D5 Configuration | Agent Skills（再利用可能な手順の外部化） | https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview |
| D6 Governance | 信頼・セキュリティ（データ取扱い） | https://trust.anthropic.com/ |
| D6 Governance | 商用利用規約 | https://www.anthropic.com/legal/commercial-terms |
| D7 Troubleshooting | 長い文脈を扱うコツ | https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/long-context-tips |
| D7 Troubleshooting | トークン数を数える | https://docs.claude.com/en/docs/build-with-claude/token-counting |

---

## 3. CCDV-F（Developer）

| ドメイン | 主題 | URL |
|---|---|---|
| D1 Agents & Workflows | 効果的なエージェントの作り方 | https://www.anthropic.com/engineering/building-effective-agents |
| D1 Agents & Workflows | Agent SDK 概要 | https://docs.claude.com/en/api/agent-sdk/overview |
| D2 Applications & Integration | Messages API | https://docs.claude.com/en/api/messages |
| D2 Applications & Integration | Message Batches API（大量・非同期・低コスト） | https://docs.claude.com/en/docs/build-with-claude/batch-processing |
| D2 Applications & Integration | ストリーミング | https://docs.claude.com/en/docs/build-with-claude/streaming |
| D2 Applications & Integration | エラー種別とリトライ | https://docs.claude.com/en/api/errors |
| D2 Applications & Integration | レート制限 | https://docs.claude.com/en/api/rate-limits |
| D2 Applications & Integration | サービスティア | https://docs.claude.com/en/api/service-tiers |
| D2 Applications & Integration | Vision（画像・PDF入力） | https://docs.claude.com/en/docs/build-with-claude/vision |
| D3 Claude Code | Claude Code 概要 | https://docs.claude.com/en/docs/claude-code/overview |
| D3 Claude Code | 代表的なワークフロー | https://docs.claude.com/en/docs/claude-code/common-workflows |
| D4 Eval & Debugging | 評価テストの作り方 | https://docs.claude.com/en/docs/test-and-evaluate/develop-tests |
| D4 Eval & Debugging | Evaluation ツール | https://docs.claude.com/en/docs/test-and-evaluate/eval-tool |
| D5 Model Selection & Optimization | prompt caching | https://docs.claude.com/en/docs/build-with-claude/prompt-caching |
| D5 Model Selection & Optimization | extended thinking | https://docs.claude.com/en/docs/build-with-claude/extended-thinking |
| D5 Model Selection & Optimization | モデルの選び方 | https://docs.claude.com/en/docs/about-claude/models/choosing-a-model |
| D6 Prompt & Context Engineering | 構造化出力 | https://docs.claude.com/en/docs/build-with-claude/structured-outputs |
| D6 Prompt & Context Engineering | 文脈設計の原則 | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents |
| D6 Prompt & Context Engineering | 応答のprefill | https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/prefill-claudes-response |
| D7 Security & Safety | ジェイルブレイク／インジェクション緩和 | https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks |
| D7 Security & Safety | Claude Code のセキュリティモデル | https://docs.claude.com/en/docs/claude-code/security |
| D8 Tools & MCPs | ツール利用 概要 | https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview |
| D8 Tools & MCPs | ツール利用の実装 | https://docs.claude.com/en/docs/agents-and-tools/tool-use/implement-tool-use |
| D8 Tools & MCPs | MCP（Anthropic ドキュメント） | https://docs.claude.com/en/docs/agents-and-tools/mcp |
| D8 Tools & MCPs | リモートMCPサーバ | https://docs.claude.com/en/docs/agents-and-tools/remote-mcp-servers |
| D8 Tools & MCPs | MCP 公式サイト | https://modelcontextprotocol.io/introduction |
| D8 Tools & MCPs | エージェント向けツールの書き方 | https://www.anthropic.com/engineering/writing-tools-for-agents |

---

## 4. CCA-F（Architect – Foundations）

| ドメイン | 主題 | URL |
|---|---|---|
| D1 Agentic Architecture | workflow と agent の使い分け | https://www.anthropic.com/engineering/building-effective-agents |
| D1 Agentic Architecture | マルチエージェント調査システムの設計 | https://www.anthropic.com/engineering/multi-agent-research-system |
| D1 Agentic Architecture | サブエージェント（文脈隔離） | https://docs.claude.com/en/api/agent-sdk/subagents |
| D1 Agentic Architecture | Agent SDK 概要 | https://docs.claude.com/en/api/agent-sdk/overview |
| D2 Claude Code Config | Claude Code 設定 | https://docs.claude.com/en/docs/claude-code/settings |
| D2 Claude Code Config | CLAUDE.md によるメモリ | https://docs.claude.com/en/docs/claude-code/memory |
| D2 Claude Code Config | フック | https://docs.claude.com/en/docs/claude-code/hooks |
| D2 Claude Code Config | headless / 非対話実行（CI） | https://docs.claude.com/en/docs/claude-code/headless |
| D2 Claude Code Config | サブエージェント | https://docs.claude.com/en/docs/claude-code/sub-agents |
| D2 Claude Code Config | スラッシュコマンド | https://docs.claude.com/en/docs/claude-code/slash-commands |
| D2 Claude Code Config | Skills | https://docs.claude.com/en/docs/claude-code/skills |
| D2 Claude Code Config | ベストプラクティス | https://www.anthropic.com/engineering/claude-code-best-practices |
| D3 Prompt & Structured Output | 構造化出力 | https://docs.claude.com/en/docs/build-with-claude/structured-outputs |
| D3 Prompt & Structured Output | XMLタグ | https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags |
| D3 Prompt & Structured Output | extended thinking | https://docs.claude.com/en/docs/build-with-claude/extended-thinking |
| D4 Tool Design & MCP | エージェント向けツールの書き方（説明・スキーマ設計） | https://www.anthropic.com/engineering/writing-tools-for-agents |
| D4 Tool Design & MCP | ツール利用の実装 | https://docs.claude.com/en/docs/agents-and-tools/tool-use/implement-tool-use |
| D4 Tool Design & MCP | MCP | https://docs.claude.com/en/docs/agents-and-tools/mcp |
| D4 Tool Design & MCP | MCP 仕様 | https://modelcontextprotocol.io/specification/2025-06-18 |
| D4 Tool Design & MCP | Agent SDK の権限制御（human-in-the-loop） | https://docs.claude.com/en/api/agent-sdk/permissions |
| D5 Context & Reliability | prompt caching | https://docs.claude.com/en/docs/build-with-claude/prompt-caching |
| D5 Context & Reliability | context editing | https://docs.claude.com/en/docs/build-with-claude/context-editing |
| D5 Context & Reliability | memory ツール | https://docs.claude.com/en/docs/agents-and-tools/tool-use/memory-tool |
| D5 Context & Reliability | 文脈設計の原則 | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents |
| D5 Context & Reliability | エラー処理 | https://docs.claude.com/en/api/errors |

---

## 5. CCAR-P（Architect – Professional）

| ドメイン | 主題 | URL |
|---|---|---|
| D1 Solution Design | workflow / agent の設計判断 | https://www.anthropic.com/engineering/building-effective-agents |
| D1 Solution Design | マルチエージェント設計の実例と代償 | https://www.anthropic.com/engineering/multi-agent-research-system |
| D2 Models & Context | prompt caching（静的プレフィックスを先頭へ） | https://docs.claude.com/en/docs/build-with-claude/prompt-caching |
| D2 Models & Context | 文脈設計の原則 | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents |
| D2 Models & Context | 長文脈のコツ | https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/long-context-tips |
| D2 Models & Context | モデルの選び方 | https://docs.claude.com/en/docs/about-claude/models/choosing-a-model |
| D3 Integration | MCP（共有機能のサーバ化） | https://docs.claude.com/en/docs/agents-and-tools/mcp |
| D3 Integration | リモートMCPサーバ | https://docs.claude.com/en/docs/agents-and-tools/remote-mcp-servers |
| D3 Integration | Agent SDK での MCP 接続 | https://docs.claude.com/en/api/agent-sdk/mcp |
| D3 Integration | 検索結果を根拠付きで渡す | https://docs.claude.com/en/docs/build-with-claude/search-results |
| D3 Integration | 埋め込み（RAG の retrieval 側） | https://docs.claude.com/en/docs/build-with-claude/embeddings |
| D3 Integration | Batches API | https://docs.claude.com/en/docs/build-with-claude/batch-processing |
| D4 Evaluation & Optimization | 成功基準の定義 | https://docs.claude.com/en/docs/test-and-evaluate/define-success |
| D4 Evaluation & Optimization | 評価テストの作り方 | https://docs.claude.com/en/docs/test-and-evaluate/develop-tests |
| D4 Evaluation & Optimization | Evaluation ツール | https://docs.claude.com/en/docs/test-and-evaluate/eval-tool |
| D5 Governance & Risk | ジェイルブレイク／インジェクション緩和 | https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks |
| D5 Governance & Risk | ハルシネーション低減 | https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations |
| D5 Governance & Risk | Trust Center | https://trust.anthropic.com/ |
| D5 Governance & Risk | 商用利用規約 | https://www.anthropic.com/legal/commercial-terms |
| D5 Governance & Risk | Claude Code の権限モデル | https://docs.claude.com/en/docs/claude-code/iam |
| D6 Stakeholder & Lifecycle | 障害の切り分けと事後分析の実例 | https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues |
| D6 Stakeholder & Lifecycle | 料金（コスト試算の根拠） | https://docs.claude.com/en/docs/about-claude/pricing |
| D6 Stakeholder & Lifecycle | 成功基準の定義（SLA合意の土台） | https://docs.claude.com/en/docs/test-and-evaluate/define-success |
| D7 Developer Productivity | Claude Code ベストプラクティス | https://www.anthropic.com/engineering/claude-code-best-practices |
| D7 Developer Productivity | Claude Code 概要 | https://docs.claude.com/en/docs/claude-code/overview |
| D7 Developer Productivity | Agent Skills のベストプラクティス | https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices |
| D7 Developer Productivity | Skills 発表 | https://www.anthropic.com/news/skills |
| D7 Developer Productivity | Agent SDK: streaming と single mode | https://docs.claude.com/en/api/agent-sdk/streaming-vs-single-mode |
