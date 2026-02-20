---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "ゲーデルとテスト"
footer: "© 2026"
style: |
  section pre code { font-size: 0.58em; line-height: 1.4; }
  
---

<!-- _class: lead -->
# ゲーデルの不完全性定理とテストの限界

- **なぜテストは「バグがない」を証明できないのか**
- 
- 数学の根本定理がソフトウェアテストに突きつける不都合な真実


---

<!-- _class: lead -->
# 数学界を震撼させた定理

- 1931年、クルト・ゲーデルが数学の基盤を揺るがした


---

# ゲーデル以前の世界 — ヒルベルトの夢

- - **ヒルベルトプログラム（1920年代）**: 数学全体を完全に公理化する壮大な計画
- - **完全性**: すべての真なる命題は証明できるはず
- - **無矛盾性**: 矛盾は決して導かれないはず
- - **決定可能性**: 任意の命題の真偽を機械的に判定できるはず
- 
- <svg viewBox="0 0 800 350" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="50" y="20" width="700" height="310" rx="18" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="55" text-anchor="middle" fill="#e94560" font-size="18" font-weight="bold">ヒルベルトの理想的数学体系</text><rect x="250" y="75" width="300" height="55" rx="10" fill="#0f3460"/><text x="400" y="108" text-anchor="middle" fill="#fff" font-size="16" font-weight="bold">公理系 (Axioms)</text><line x1="400" y1="130" x2="400" y2="155" stroke="#e94560" stroke-width="2"/><polygon points="394,150 406,150 400,160" fill="#e94560"/><rect x="250" y="160" width="300" height="55" rx="10" fill="#16213e"/><text x="400" y="193" text-anchor="middle" fill="#fff" font-size="16" font-weight="bold">推論規則 (Inference)</text><line x1="400" y1="215" x2="400" y2="240" stroke="#e94560" stroke-width="2"/><polygon points="394,235 406,235 400,245" fill="#e94560"/><rect x="250" y="245" width="300" height="55" rx="10" fill="#533483"/><text x="400" y="278" text-anchor="middle" fill="#fff" font-size="16" font-weight="bold">すべての真理 (All Truths)</text><text x="120" y="175" text-anchor="middle" fill="#aaa" font-size="13">完全 ✓</text><text x="120" y="195" text-anchor="middle" fill="#aaa" font-size="13">無矛盾 ✓</text><text x="120" y="215" text-anchor="middle" fill="#aaa" font-size="13">決定可能 ✓</text><text x="680" y="190" text-anchor="middle" fill="#e94560" font-size="14" font-weight="bold">← この夢は</text><text x="680" y="210" text-anchor="middle" fill="#e94560" font-size="14" font-weight="bold">崩壊する</text></svg>


---

# 第一不完全性定理

- - **定理**: 自然数論を含む任意の無矛盾な公理系には、**証明も反証もできない命題**が存在する
- - ゲーデルは「この文は証明できない」という自己参照命題を構成した
- - もし証明できたら矛盾 → 証明できない → しかしそれは真
- 
- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="300" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.4))"/><text x="400" y="45" text-anchor="middle" fill="#e94560" font-size="18" font-weight="bold">ゲーデル文 G の自己参照構造</text><ellipse cx="400" cy="175" rx="200" ry="110" fill="none" stroke="#0f3460" stroke-width="3" stroke-dasharray="8,4"/><text x="400" y="145" text-anchor="middle" fill="#fff" font-size="16" font-weight="bold">G = 「この文Gは</text><text x="400" y="170" text-anchor="middle" fill="#fff" font-size="16" font-weight="bold">公理系Sでは</text><text x="400" y="195" text-anchor="middle" fill="#fff" font-size="16" font-weight="bold">証明できない」</text><path d="M 560 120 C 680 120, 700 230, 560 230" fill="none" stroke="#e94560" stroke-width="2"/><polygon points="563,225 555,235 568,232" fill="#e94560"/><text x="700" y="175" text-anchor="middle" fill="#e94560" font-size="13">自己参照</text><rect x="80" y="240" width="250" height="45" rx="8" fill="#0f3460"/><text x="205" y="268" text-anchor="middle" fill="#4eff4e" font-size="13">Gが証明可能 → 矛盾!</text><rect x="470" y="240" width="250" height="45" rx="8" fill="#0f3460"/><text x="595" y="268" text-anchor="middle" fill="#ffcc00" font-size="13">Gが証明不能 → Gは真</text></svg>


---

# 第二不完全性定理

- - **定理**: 無矛盾な公理系は、**自身の無矛盾性を証明できない**
- - システムの健全性を、そのシステム内部から保証することは不可能
- - 外部の「より強い」システムが必要 → しかしそれも自身を証明できない
- 
- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="320" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.4))"/><text x="400" y="45" text-anchor="middle" fill="#e94560" font-size="18" font-weight="bold">システムは自身を検証できない</text><rect x="200" y="65" width="400" height="240" rx="15" fill="none" stroke="#533483" stroke-width="3"/><text x="400" y="90" text-anchor="middle" fill="#533483" font-size="14">システム S₂（より強い）</text><rect x="260" y="105" width="280" height="170" rx="12" fill="none" stroke="#0f3460" stroke-width="3"/><text x="400" y="130" text-anchor="middle" fill="#0f3460" font-size="14">システム S₁</text><rect x="310" y="145" width="180" height="50" rx="8" fill="#16213e"/><text x="400" y="175" text-anchor="middle" fill="#fff" font-size="13">S₁ は無矛盾？</text><text x="400" y="215" text-anchor="middle" fill="#e94560" font-size="16" font-weight="bold">✗ 証明不能</text><text x="400" y="255" text-anchor="middle" fill="#4eff4e" font-size="13">S₂ なら S₁ の無矛盾性を証明可能</text><text x="400" y="290" text-anchor="middle" fill="#ffcc00" font-size="13">...しかし S₂ 自身の無矛盾性は?</text><text x="680" y="170" text-anchor="middle" fill="#aaa" font-size="12">無限後退</text><text x="680" y="190" text-anchor="middle" fill="#aaa" font-size="12">∞ ...</text></svg>


---

<!-- _class: lead -->
# ソフトウェアテストへの応用

- 数学の不完全性が示す、テストの本質的限界


---

# 停止性問題との接続

- - **チューリングの停止性問題（1936年）**: ゲーデルの不完全性定理の計算理論版
- - 「任意のプログラムが停止するか」を判定する万能アルゴリズムは存在しない
- - つまり：**完璧なバグ検出器は数学的に不可能**
- 
- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="280" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.4))"/><text x="400" y="45" text-anchor="middle" fill="#e94560" font-size="18" font-weight="bold">停止性問題 — 万能テスターは存在しない</text><rect x="60" y="70" width="200" height="80" rx="10" fill="#0f3460"/><text x="160" y="105" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">プログラム P</text><text x="160" y="125" text-anchor="middle" fill="#aaa" font-size="12">+ 入力 x</text><line x1="260" y1="110" x2="330" y2="110" stroke="#e94560" stroke-width="2"/><polygon points="325,104 335,110 325,116" fill="#e94560"/><rect x="335" y="70" width="200" height="80" rx="10" fill="#533483"/><text x="435" y="100" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">万能判定器 H</text><text x="435" y="120" text-anchor="middle" fill="#aaa" font-size="12">H(P, x) = ?</text><line x1="535" y1="90" x2="620" y2="70" stroke="#4eff4e" stroke-width="2"/><text x="680" y="72" text-anchor="middle" fill="#4eff4e" font-size="13">停止する</text><line x1="535" y1="130" x2="620" y2="150" stroke="#ff6b6b" stroke-width="2"/><text x="680" y="155" text-anchor="middle" fill="#ff6b6b" font-size="13">停止しない</text><line x1="435" y1="150" x2="435" y2="190" stroke="#e94560" stroke-width="2" stroke-dasharray="5,3"/><rect x="280" y="195" width="310" height="70" rx="10" fill="#16213e" stroke="#e94560" stroke-width="2"/><text x="435" y="220" text-anchor="middle" fill="#e94560" font-size="14" font-weight="bold">矛盾! このHは存在できない</text><text x="435" y="245" text-anchor="middle" fill="#aaa" font-size="12">対角線論法による背理法で証明</text></svg>


---

# テストのパラドックス

- - テストは **「バグがある」を証明できる**（反例を見つける）
- - しかし **「バグがない」は証明できない**（全ケースの網羅は不可能）
- - ダイクストラ: 「テストはバグの存在を示せるが、不在を示せない」
- 
- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="280" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.4))"/><text x="400" y="45" text-anchor="middle" fill="#e94560" font-size="18" font-weight="bold">証明可能領域 vs 証明不能領域</text><ellipse cx="280" cy="175" rx="180" ry="100" fill="#0f3460" opacity="0.7"/><text x="280" y="145" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">テストで検証可能</text><text x="280" y="170" text-anchor="middle" fill="#4eff4e" font-size="13">バグ発見 ✓</text><text x="280" y="192" text-anchor="middle" fill="#4eff4e" font-size="13">特定パス検証 ✓</text><text x="280" y="214" text-anchor="middle" fill="#4eff4e" font-size="13">回帰テスト ✓</text><rect x="500" y="90" width="250" height="170" rx="12" fill="#16213e" stroke="#e94560" stroke-width="2" stroke-dasharray="6,3"/><text x="625" y="125" text-anchor="middle" fill="#e94560" font-size="14" font-weight="bold">証明不可能</text><text x="625" y="155" text-anchor="middle" fill="#ff6b6b" font-size="13">バグの不在 ✗</text><text x="625" y="177" text-anchor="middle" fill="#ff6b6b" font-size="13">全入力の網羅 ✗</text><text x="625" y="199" text-anchor="middle" fill="#ff6b6b" font-size="13">完全な正しさ ✗</text><text x="625" y="221" text-anchor="middle" fill="#ff6b6b" font-size="13">停止性の保証 ✗</text></svg>


---

# カバレッジ100%の幻想

- - **100%コードカバレッジ ≠ バグゼロ** — すべての行を通過しても、すべての状態は検証できない
- - 状態空間は指数関数的に増大: 変数10個 × 各100状態 = 100¹⁰ = 10²⁰ 通り
- - パスカバレッジの組み合わせ爆発: 条件分岐 n 個 → 最大 2ⁿ パス
- 
- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="260" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.4))"/><text x="400" y="42" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">カバレッジと信頼性の関係</text><line x1="100" y1="220" x2="700" y2="220" stroke="#aaa" stroke-width="2"/><line x1="100" y1="220" x2="100" y2="60" stroke="#aaa" stroke-width="2"/><text x="400" y="248" text-anchor="middle" fill="#aaa" font-size="13">コードカバレッジ (%)</text><text x="60" y="140" text-anchor="middle" fill="#aaa" font-size="13" transform="rotate(-90,60,140)">信頼性</text><path d="M 110 210 Q 300 190, 400 160 Q 500 130, 580 120 Q 650 115, 690 113" fill="none" stroke="#4eff4e" stroke-width="3"/><line x1="110" y1="210" x2="690" y2="80" stroke="#533483" stroke-width="2" stroke-dasharray="6,3"/><text x="710" y="80" fill="#533483" font-size="11">理想</text><text x="710" y="115" fill="#4eff4e" font-size="11">現実</text><line x1="690" y1="220" x2="690" y2="113" stroke="#e94560" stroke-width="1" stroke-dasharray="3,3"/><text x="690" y="235" text-anchor="middle" fill="#e94560" font-size="11">100%</text><rect x="490" y="145" width="200" height="45" rx="6" fill="#16213e" stroke="#e94560" stroke-width="1"/><text x="590" y="165" text-anchor="middle" fill="#ffcc00" font-size="11">カバレッジ100%でも</text><text x="590" y="180" text-anchor="middle" fill="#ffcc00" font-size="11">信頼性にはギャップが残る</text></svg>


---

# 形式検証の限界

- - **形式検証ツール**: Coq, Isabelle, TLA+, Alloy — 数学的に正しさを証明
- - しかし**仕様そのものの正しさ**は証明できない（ゲーデルの限界）
- - 検証できるのは「仕様に対する実装の一致」であり「仕様が正しいか」ではない
- - 現実の制約: 検証コストは開発コストの**3〜10倍**
- 
- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="260" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.4))"/><text x="400" y="42" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">形式検証が証明できること・できないこと</text><rect x="60" y="65" width="300" height="180" rx="12" fill="#0f3460" opacity="0.8"/><text x="210" y="95" text-anchor="middle" fill="#4eff4e" font-size="15" font-weight="bold">証明可能</text><text x="210" y="125" text-anchor="middle" fill="#fff" font-size="13">実装 ⊆ 仕様</text><text x="210" y="150" text-anchor="middle" fill="#fff" font-size="13">デッドロック不在</text><text x="210" y="175" text-anchor="middle" fill="#fff" font-size="13">型安全性</text><text x="210" y="200" text-anchor="middle" fill="#fff" font-size="13">メモリ安全性</text><text x="210" y="225" text-anchor="middle" fill="#aaa" font-size="11">(限定された性質について)</text><rect x="440" y="65" width="300" height="180" rx="12" fill="#16213e" stroke="#e94560" stroke-width="2" stroke-dasharray="5,3"/><text x="590" y="95" text-anchor="middle" fill="#e94560" font-size="15" font-weight="bold">証明不可能</text><text x="590" y="125" text-anchor="middle" fill="#ff6b6b" font-size="13">仕様の正しさ</text><text x="590" y="150" text-anchor="middle" fill="#ff6b6b" font-size="13">ユーザーの意図との一致</text><text x="590" y="175" text-anchor="middle" fill="#ff6b6b" font-size="13">未知の要件</text><text x="590" y="200" text-anchor="middle" fill="#ff6b6b" font-size="13">外部環境の変化</text><text x="590" y="225" text-anchor="middle" fill="#aaa" font-size="11">(ゲーデルの限界)</text></svg>


---

<!-- _class: lead -->
# 実践的含意

- 不完全性を受け入れた上で、何ができるか


---

# 「証明」から「信頼」へのパラダイムシフト

- - **旧パラダイム**: 完全な証明を追求 → テストを増やし続ける → 収穫逓減
- - **新パラダイム**: リスクベースのテスト戦略 → 重要なところに集中投資
- - 完全性は不可能 → だから「十分な信頼」を効率的に構築する
- 
- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="260" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.4))"/><text x="400" y="42" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">テスト戦略のパラダイム転換</text><rect x="60" y="65" width="300" height="190" rx="12" fill="#0f3460"/><text x="210" y="95" text-anchor="middle" fill="#aaa" font-size="14" font-weight="bold">旧: 完全性追求</text><text x="210" y="125" text-anchor="middle" fill="#ff6b6b" font-size="13">全パスカバレッジ目標</text><text x="210" y="150" text-anchor="middle" fill="#ff6b6b" font-size="13">テスト数 = 品質の指標</text><text x="210" y="175" text-anchor="middle" fill="#ff6b6b" font-size="13">バグゼロを目指す</text><text x="210" y="205" text-anchor="middle" fill="#ff6b6b" font-size="13">コスト: ∞ に発散</text><text x="210" y="235" text-anchor="middle" fill="#e94560" font-size="16">✗</text><line x1="390" y1="160" x2="430" y2="160" stroke="#e94560" stroke-width="3"/><polygon points="425,154 435,160 425,166" fill="#e94560"/><rect x="440" y="65" width="300" height="190" rx="12" fill="#16213e" stroke="#4eff4e" stroke-width="2"/><text x="590" y="95" text-anchor="middle" fill="#4eff4e" font-size="14" font-weight="bold">新: 信頼構築</text><text x="590" y="125" text-anchor="middle" fill="#4eff4e" font-size="13">リスクベーステスト</text><text x="590" y="150" text-anchor="middle" fill="#4eff4e" font-size="13">テストの質 = 品質の指標</text><text x="590" y="175" text-anchor="middle" fill="#4eff4e" font-size="13">十分な信頼を構築する</text><text x="590" y="205" text-anchor="middle" fill="#4eff4e" font-size="13">コスト: 制御可能</text><text x="590" y="235" text-anchor="middle" fill="#4eff4e" font-size="16">✓</text></svg>


---

# カオスエンジニアリングの哲学

- - **発想の転換**: 「壊れないことの証明」→「壊れても大丈夫な設計」
- - **Netflix Chaos Monkey**: 本番環境でランダムにサーバーを停止
- - 不完全性を前提とした設計 = **レジリエンスエンジニアリング**
- - 障害を避けるのではなく、障害から回復する能力を鍛える
- 
- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="240" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.4))"/><text x="400" y="42" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">カオスエンジニアリングの実践サイクル</text><rect x="80" y="70" width="150" height="50" rx="10" fill="#0f3460"/><text x="155" y="100" text-anchor="middle" fill="#fff" font-size="13">定常状態の定義</text><line x1="230" y1="95" x2="280" y2="95" stroke="#e94560" stroke-width="2"/><polygon points="275,89 285,95 275,101" fill="#e94560"/><rect x="285" y="70" width="150" height="50" rx="10" fill="#533483"/><text x="360" y="100" text-anchor="middle" fill="#fff" font-size="13">障害を注入</text><line x1="435" y1="95" x2="485" y2="95" stroke="#e94560" stroke-width="2"/><polygon points="480,89 490,95 480,101" fill="#e94560"/><rect x="490" y="70" width="150" height="50" rx="10" fill="#0f3460"/><text x="565" y="100" text-anchor="middle" fill="#fff" font-size="13">差異を観測</text><line x1="640" y1="95" x2="690" y2="95" stroke="#e94560" stroke-width="2"/><polygon points="685,89 695,95 685,101" fill="#e94560"/><rect x="615" y="140" width="150" height="50" rx="10" fill="#16213e" stroke="#4eff4e" stroke-width="2"/><text x="690" y="170" text-anchor="middle" fill="#4eff4e" font-size="13">耐障害性向上</text><line x1="690" y1="120" x2="690" y2="135" stroke="#4eff4e" stroke-width="2"/><polygon points="684,132 696,132 690,140" fill="#4eff4e"/><text x="400" y="210" text-anchor="middle" fill="#ffcc00" font-size="14" font-weight="bold">「壊す → 学ぶ → 強くなる」のサイクル</text><text x="400" y="235" text-anchor="middle" fill="#aaa" font-size="12">完全性の証明ではなく、回復力の実証</text></svg>


---

# プロパティベーステスト

- - **QuickCheck / Hypothesis**: 全ケースを網羅せずに**性質（property）**を検証
- - ランダム生成された大量の入力で不変条件をテスト
- - 「すべてのリストに対して reverse(reverse(xs)) == xs」のような性質
- - ゲーデル的限界の中での最善策: **確率的な信頼**の構築

```python
from hypothesis import given, strategies as st

@given(st.lists(st.integers()))
def test_reverse_involution(xs):
    assert list(reversed(list(reversed(xs)))) == xs

@given(st.integers(), st.integers())
def test_addition_commutative(a, b):
    assert a + b == b + a
```


---

# テスト戦略のピラミッド — 不完全性時代版

- - 完全性が不可能なら、**層ごとに異なる種類の信頼**を積み上げる
- 
- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="300" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.4))"/><text x="400" y="42" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">不完全性を前提としたテスト戦略ピラミッド</text><polygon points="400,65 180,280 620,280" fill="none" stroke="#aaa" stroke-width="1" stroke-dasharray="4,2"/><rect x="340" y="70" width="120" height="38" rx="6" fill="#e94560"/><text x="400" y="95" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">カオステスト</text><rect x="290" y="118" width="220" height="38" rx="6" fill="#533483"/><text x="400" y="143" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">プロパティベーステスト</text><rect x="240" y="166" width="320" height="38" rx="6" fill="#0f3460"/><text x="400" y="191" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">統合テスト / E2Eテスト</text><rect x="190" y="214" width="420" height="38" rx="6" fill="#16213e" stroke="#4eff4e" stroke-width="1"/><text x="400" y="239" text-anchor="middle" fill="#4eff4e" font-size="12" font-weight="bold">ユニットテスト + 型システム</text><text x="660" y="87" fill="#e94560" font-size="11">レジリエンス検証</text><text x="660" y="135" fill="#533483" font-size="11">不変条件の確率的検証</text><text x="660" y="183" fill="#0f3460" font-size="11">コンポーネント間の整合性</text><text x="660" y="231" fill="#4eff4e" font-size="11">基本的な正しさの保証</text><text x="400" y="275" text-anchor="middle" fill="#ffcc00" font-size="13" font-weight="bold">各層が異なる種類の「信頼」を提供する</text></svg>


---

<!-- _class: lead -->
# まとめ — 不完全性と共に生きる

- **テストは「完全性の証明」ではなく「信頼の構築」**
- 
- 完全なソフトウェアは **数学的に不可能** である
- 
- だからこそ私たちは:
- - リスクベースで優先順位をつけ
- - 多層的な検証を重ね
- - 障害に対する回復力を鍛え
- - **「十分な信頼」を効率的に獲得する**


---

# 参考文献

- **数学・理論:**
- - [Godel, K. (1931) "Uber formal unentscheidbare Satze"](https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems)
- - [Turing, A. (1936) "On Computable Numbers"](https://en.wikipedia.org/wiki/Turing%27s_proof)
- 
- **ソフトウェアテスト:**
- - [Dijkstra, E.W. "Notes on Structured Programming" (EWD249)](https://www.cs.utexas.edu/~EWD/ewd02xx/EWD249.PDF)
- - [Claessen & Hughes (2000) "QuickCheck" - ICFP](https://www.cs.tufts.edu/~nr/cs257/archive/john-hughes/quick.pdf)
- 
- **カオスエンジニアリング:**
- - [Principles of Chaos Engineering](https://principlesofchaos.org/)
- - [Netflix Chaos Monkey - GitHub](https://github.com/Netflix/chaosmonkey)

