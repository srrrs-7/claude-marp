#!/usr/bin/env bun
// Patch script batch 2: add more SVGs to ai-learning-mechanisms

import { readFileSync, writeFileSync } from "fs";

const FILE = "docs/20260219150000_ai-learning-mechanisms/slides-data.json";
const data = JSON.parse(readFileSync(FILE, "utf-8"));

const SVG_STYLE = `max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0`;

function addSvg(slides: any[], idx: number, svgStr: string) {
	if (!slides[idx].content?.some((c: string) => c.startsWith("<svg"))) {
		slides[idx].content = [svgStr, ...slides[idx].content];
	}
}

const s = data.slides;

// Index 0: Title
addSvg(
	s,
	0,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="90" text-anchor="middle" fill="#f9a825" font-size="32" font-weight="bold">AIの学習の仕組み</text>
  <text x="400" y="130" text-anchor="middle" fill="#ffffff" font-size="18">Deep Learning · Transformers · RLHF</text>
  <line x1="150" y1="150" x2="650" y2="150" stroke="#f9a825" stroke-width="1.5" opacity="0.6"/>
  <text x="400" y="185" text-anchor="middle" fill="#f9a825" font-size="13">勾配降下法から最新アライメント技術まで</text>
  <text x="400" y="215" text-anchor="middle" fill="#ffffff" font-size="11" opacity="0.7">機械学習エンジニア向け深掘り解説</text>
</svg>`,
);

// Index 1: AIの「学習」とは何か
addSvg(
	s,
	1,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">AIの「学習」とは何か</text>
  <!-- Analogy: data -> model -> prediction -->
  <rect x="40" y="90" width="160" height="70" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="120" y="120" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">データ</text>
  <text x="120" y="142" text-anchor="middle" fill="#ffffff" font-size="10">入力・ラベル</text>
  <polygon points="220,125 205,118 205,132" fill="#f9a825"/>
  <line x1="200" y1="125" x2="223" y2="125" stroke="#f9a825" stroke-width="2"/>
  <rect x="223" y="90" width="200" height="70" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="323" y="120" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">モデル学習</text>
  <text x="323" y="142" text-anchor="middle" fill="#ffffff" font-size="10">パラメータ最適化</text>
  <polygon points="445,125 430,118 430,132" fill="#f9a825"/>
  <line x1="423" y1="125" x2="448" y2="125" stroke="#f9a825" stroke-width="2"/>
  <rect x="448" y="90" width="160" height="70" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="528" y="120" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">予測・生成</text>
  <text x="528" y="142" text-anchor="middle" fill="#ffffff" font-size="10">汎化能力</text>
  <!-- Feedback loop -->
  <polygon points="660,125 645,118 645,132" fill="#f9a825"/>
  <line x1="608" y1="125" x2="663" y2="125" stroke="#f9a825" stroke-width="2"/>
  <rect x="663" y="90" width="110" height="70" rx="6" fill="#f9a825" opacity="0.9"/>
  <text x="718" y="122" text-anchor="middle" fill="#1a1a2e" font-size="11" font-weight="bold">損失計算</text>
  <text x="718" y="140" text-anchor="middle" fill="#1a1a2e" font-size="10">誤差評価</text>
  <path d="M 718 160 Q 718 210 323 210 Q 18 210 18 155" fill="none" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="5"/>
  <polygon points="18,155 12,167 24,167" fill="#e91e63"/>
  <text x="400" y="232" text-anchor="middle" fill="#e91e63" font-size="10">誤差逆伝播 → パラメータ更新</text>
</svg>`,
);

// Index 5: 学習パラダイムの概要
addSvg(
	s,
	5,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">学習パラダイムの概要</text>
  <!-- Venn diagram-like: 3 paradigms -->
  <ellipse cx="250" cy="145" rx="140" ry="90" fill="#16213e" stroke="#f9a825" stroke-width="1.5" opacity="0.8"/>
  <text x="190" y="135" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">教師あり</text>
  <text x="190" y="152" text-anchor="middle" fill="#ffffff" font-size="9">ラベル付きデータ</text>
  <text x="190" y="168" text-anchor="middle" fill="#ffffff" font-size="9">回帰・分類</text>
  <ellipse cx="550" cy="145" rx="140" ry="90" fill="#16213e" stroke="#e91e63" stroke-width="1.5" opacity="0.8"/>
  <text x="610" y="135" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold">強化学習</text>
  <text x="610" y="152" text-anchor="middle" fill="#ffffff" font-size="9">報酬最大化</text>
  <text x="610" y="168" text-anchor="middle" fill="#ffffff" font-size="9">RLHF</text>
  <!-- Center overlap: self-supervised -->
  <text x="400" y="130" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="bold">自己教師あり</text>
  <text x="400" y="148" text-anchor="middle" fill="#ffffff" font-size="9">BERT / GPT</text>
  <text x="400" y="165" text-anchor="middle" fill="#ffffff" font-size="9">事前学習</text>
  <!-- Bottom: unsupervised -->
  <rect x="280" y="210" width="240" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="232" text-anchor="middle" fill="#f9a825" font-size="11">教師なし: クラスタリング・生成</text>
</svg>`,
);

// Index 6: 教師あり学習の定式化
addSvg(
	s,
	6,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">教師あり学習の定式化</text>
  <!-- Formula boxes -->
  <rect x="60" y="60" width="680" height="60" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="86" text-anchor="middle" fill="#f9a825" font-size="14" font-family="monospace">f: X → Y</text>
  <text x="400" y="110" text-anchor="middle" fill="#ffffff" font-size="11">訓練データ {(xᵢ, yᵢ)} から関数 f を学習</text>
  <!-- Components -->
  <rect x="60" y="145" width="200" height="70" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="160" y="168" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">仮説空間 H</text>
  <text x="160" y="188" text-anchor="middle" fill="#ffffff" font-size="10">モデルアーキテクチャ</text>
  <text x="160" y="205" text-anchor="middle" fill="#ffffff" font-size="10">パラメータ空間</text>
  <rect x="300" y="145" width="200" height="70" rx="4" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="400" y="168" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold">損失関数 L</text>
  <text x="400" y="188" text-anchor="middle" fill="#ffffff" font-size="10">予測誤差の測定</text>
  <text x="400" y="205" text-anchor="middle" fill="#ffffff" font-size="10">MSE / CrossEntropy</text>
  <rect x="540" y="145" width="200" height="70" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="640" y="168" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">最適化 O</text>
  <text x="640" y="188" text-anchor="middle" fill="#ffffff" font-size="10">損失最小化</text>
  <text x="640" y="205" text-anchor="middle" fill="#ffffff" font-size="10">SGD / Adam</text>
</svg>`,
);

// Index 8: 強化学習の基礎
addSvg(
	s,
	8,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">強化学習の基礎 — MDP</text>
  <!-- RL cycle -->
  <ellipse cx="200" cy="140" rx="80" ry="60" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="200" y="135" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Agent</text>
  <text x="200" y="155" text-anchor="middle" fill="#ffffff" font-size="10">π(a|s)</text>
  <ellipse cx="600" cy="140" rx="80" ry="60" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="135" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">Environment</text>
  <text x="600" y="155" text-anchor="middle" fill="#ffffff" font-size="10">P(s'|s,a)</text>
  <!-- Action arrow -->
  <line x1="280" y1="120" x2="520" y2="120" stroke="#f9a825" stroke-width="2"/>
  <polygon points="520,120 506,113 506,127" fill="#f9a825"/>
  <text x="400" y="113" text-anchor="middle" fill="#f9a825" font-size="11">Action a</text>
  <!-- Reward + State arrows back -->
  <line x1="520" y1="160" x2="280" y2="160" stroke="#e91e63" stroke-width="2"/>
  <polygon points="280,160 294,153 294,167" fill="#e91e63"/>
  <text x="400" y="178" text-anchor="middle" fill="#e91e63" font-size="11">Reward r  +  State s'</text>
  <!-- Goal -->
  <text x="400" y="225" text-anchor="middle" fill="#f9a825" font-size="11">目標: 累積報酬 G = Σ γᵗ rₜ を最大化する方策 π を学習</text>
</svg>`,
);

// Index 9: 汎化誤差と過学習
addSvg(
	s,
	9,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">汎化誤差と過学習</text>
  <!-- Training vs validation loss curves -->
  <line x1="80" y1="220" x2="740" y2="220" stroke="#ffffff" stroke-width="1.5"/>
  <line x1="80" y1="50" x2="80" y2="220" stroke="#ffffff" stroke-width="1.5"/>
  <text x="415" y="240" text-anchor="middle" fill="#ffffff" font-size="11">学習エポック数</text>
  <text x="56" y="135" text-anchor="middle" fill="#ffffff" font-size="10" transform="rotate(-90,56,135)">損失</text>
  <!-- Training loss -->
  <polyline points="80,200 150,175 220,150 300,120 380,95 460,75 540,60 620,50 700,44"
    fill="none" stroke="#f9a825" stroke-width="2.5"/>
  <text x="710" y="42" fill="#f9a825" font-size="10">訓練損失</text>
  <!-- Validation loss -->
  <polyline points="80,200 150,170 220,145 300,120 380,105 460,105 540,115 620,130 700,148"
    fill="none" stroke="#e91e63" stroke-width="2.5"/>
  <text x="710" y="150" fill="#e91e63" font-size="10">検証損失</text>
  <!-- Overfitting marker -->
  <line x1="460" y1="50" x2="460" y2="220" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4" opacity="0.7"/>
  <text x="460" y="44" text-anchor="middle" fill="#f9a825" font-size="10">最適点</text>
  <!-- Overfitting zone shading annotation -->
  <text x="580" y="195" text-anchor="middle" fill="#e91e63" font-size="10">過学習領域</text>
</svg>`,
);

// Index 11: 正則化手法
addSvg(
	s,
	11,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">正則化手法の比較</text>
  <rect x="40" y="55" width="220" height="150" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="150" y="82" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">L1正則化 (Lasso)</text>
  <text x="150" y="107" text-anchor="middle" fill="#ffffff" font-size="10">+ λΣ|wᵢ|</text>
  <text x="150" y="130" text-anchor="middle" fill="#ffffff" font-size="10">スパース解</text>
  <text x="150" y="152" text-anchor="middle" fill="#f9a825" font-size="9">特徴選択に有効</text>
  <text x="150" y="172" text-anchor="middle" fill="#ffffff" font-size="9">不要な重みを0に</text>
  <text x="150" y="192" text-anchor="middle" fill="#f9a825" font-size="9">例: テキスト分類</text>
  <rect x="290" y="55" width="220" height="150" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="82" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">L2正則化 (Ridge)</text>
  <text x="400" y="107" text-anchor="middle" fill="#ffffff" font-size="10">+ λΣwᵢ²</text>
  <text x="400" y="130" text-anchor="middle" fill="#ffffff" font-size="10">重みを均等に縮小</text>
  <text x="400" y="152" text-anchor="middle" fill="#f9a825" font-size="9">滑らかな解</text>
  <text x="400" y="172" text-anchor="middle" fill="#ffffff" font-size="9">数値的安定性高い</text>
  <text x="400" y="192" text-anchor="middle" fill="#f9a825" font-size="9">例: 線形回帰</text>
  <rect x="540" y="55" width="220" height="150" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="650" y="82" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">Dropout</text>
  <text x="650" y="107" text-anchor="middle" fill="#ffffff" font-size="10">確率 p でニューロン無効化</text>
  <text x="650" y="130" text-anchor="middle" fill="#ffffff" font-size="10">アンサンブル効果</text>
  <text x="650" y="152" text-anchor="middle" fill="#f9a825" font-size="9">深層学習に必須</text>
  <text x="650" y="172" text-anchor="middle" fill="#ffffff" font-size="9">p=0.1〜0.5</text>
  <text x="650" y="192" text-anchor="middle" fill="#f9a825" font-size="9">例: Transformer</text>
</svg>`,
);

// Index 13: 損失関数の種類
addSvg(
	s,
	13,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">主要な損失関数</text>
  <!-- Loss function grid -->
  <rect x="40" y="55" width="340" height="70" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="210" y="78" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">MSE (Mean Squared Error)</text>
  <text x="210" y="97" text-anchor="middle" fill="#ffffff" font-size="10">L = Σ(ŷᵢ - yᵢ)² / n</text>
  <text x="210" y="115" text-anchor="middle" fill="#f9a825" font-size="9">回帰問題・外れ値に敏感</text>
  <rect x="420" y="55" width="340" height="70" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="590" y="78" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">Cross-Entropy</text>
  <text x="590" y="97" text-anchor="middle" fill="#ffffff" font-size="10">L = -Σ yᵢ log(ŷᵢ)</text>
  <text x="590" y="115" text-anchor="middle" fill="#f9a825" font-size="9">分類問題・確率出力</text>
  <rect x="40" y="145" width="340" height="70" rx="4" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="210" y="168" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold">Contrastive Loss</text>
  <text x="210" y="187" text-anchor="middle" fill="#ffffff" font-size="10">類似ペア近づけ / 非類似遠ざけ</text>
  <text x="210" y="205" text-anchor="middle" fill="#f9a825" font-size="9">対照学習 (CLIP, SimCLR)</text>
  <rect x="420" y="145" width="340" height="70" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="590" y="168" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">Huber Loss</text>
  <text x="590" y="187" text-anchor="middle" fill="#ffffff" font-size="10">MSE + MAEのハイブリッド</text>
  <text x="590" y="205" text-anchor="middle" fill="#f9a825" font-size="9">外れ値ロバスト回帰</text>
</svg>`,
);

// Index 17: 学習率スケジューリング
addSvg(
	s,
	17,
	`<svg viewBox="0 0 800 280" style="${SVG_STYLE}">
  <rect width="800" height="280" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">学習率スケジューリング</text>
  <!-- Axes -->
  <line x1="80" y1="230" x2="740" y2="230" stroke="#ffffff" stroke-width="1.5"/>
  <line x1="80" y1="50" x2="80" y2="230" stroke="#ffffff" stroke-width="1.5"/>
  <text x="415" y="252" text-anchor="middle" fill="#ffffff" font-size="11">学習ステップ</text>
  <text x="50" y="140" text-anchor="middle" fill="#ffffff" font-size="10" transform="rotate(-90,50,140)">LR</text>
  <!-- Warmup + cosine decay -->
  <polyline points="80,220 160,80 240,80 340,95 440,115 540,140 640,175 720,205"
    fill="none" stroke="#f9a825" stroke-width="2.5"/>
  <text x="730" y="205" fill="#f9a825" font-size="10">Cosine</text>
  <!-- Step decay -->
  <polyline points="80,80 260,80 260,130 440,130 440,170 620,170 620,200 720,200"
    fill="none" stroke="#e91e63" stroke-width="2" stroke-dasharray="6"/>
  <text x="730" y="200" fill="#e91e63" font-size="10">Step</text>
  <!-- Warmup annotation -->
  <line x1="80" y1="60" x2="160" y2="60" stroke="#f9a825" stroke-width="1" stroke-dasharray="3" opacity="0.6"/>
  <line x1="160" y1="60" x2="160" y2="230" stroke="#f9a825" stroke-width="1" stroke-dasharray="3" opacity="0.6"/>
  <text x="120" y="55" text-anchor="middle" fill="#f9a825" font-size="10">Warmup</text>
</svg>`,
);

// Index 21: パーセプトロンからMLPへ
addSvg(
	s,
	21,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">パーセプトロン → MLP の進化</text>
  <!-- Perceptron left -->
  <text x="170" y="55" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">パーセプトロン (1958)</text>
  <circle cx="100" cy="120" r="16" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="100" y="125" text-anchor="middle" fill="#ffffff" font-size="9">x₁</text>
  <circle cx="100" cy="170" r="16" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="100" y="175" text-anchor="middle" fill="#ffffff" font-size="9">x₂</text>
  <circle cx="240" cy="145" r="20" fill="#e91e63" opacity="0.8"/>
  <text x="240" y="150" text-anchor="middle" fill="#ffffff" font-size="10">Σ+θ</text>
  <line x1="116" y1="120" x2="220" y2="138" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="116" y1="170" x2="220" y2="152" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="260" y1="145" x2="310" y2="145" stroke="#f9a825" stroke-width="2"/>
  <polygon points="310,145 296,138 296,152" fill="#f9a825"/>
  <text x="350" y="150" text-anchor="middle" fill="#f9a825" font-size="11">ŷ</text>
  <text x="200" y="220" text-anchor="middle" fill="#ffffff" font-size="9">線形分離のみ</text>

  <!-- MLP right -->
  <text x="580" y="55" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">MLP (多層)</text>
  <!-- Input -->
  <circle cx="430" cy="110" r="12" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <circle cx="430" cy="150" r="12" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <circle cx="430" cy="190" r="12" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <!-- Hidden -->
  <circle cx="560" cy="100" r="12" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <circle cx="560" cy="150" r="12" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <circle cx="560" cy="200" r="12" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <!-- Output -->
  <circle cx="690" cy="150" r="14" fill="#f9a825" opacity="0.9"/>
  <text x="690" y="155" text-anchor="middle" fill="#1a1a2e" font-size="9">ŷ</text>
  <!-- Edges -->
  <line x1="442" y1="112" x2="548" y2="105" stroke="#f9a825" stroke-width="0.8" opacity="0.5"/>
  <line x1="442" y1="112" x2="548" y2="152" stroke="#f9a825" stroke-width="0.8" opacity="0.5"/>
  <line x1="442" y1="150" x2="548" y2="105" stroke="#f9a825" stroke-width="0.8" opacity="0.5"/>
  <line x1="442" y1="150" x2="548" y2="152" stroke="#f9a825" stroke-width="0.8" opacity="0.5"/>
  <line x1="442" y1="150" x2="548" y2="202" stroke="#f9a825" stroke-width="0.8" opacity="0.5"/>
  <line x1="442" y1="190" x2="548" y2="202" stroke="#f9a825" stroke-width="0.8" opacity="0.5"/>
  <line x1="572" y1="105" x2="676" y2="148" stroke="#f9a825" stroke-width="0.8" opacity="0.5"/>
  <line x1="572" y1="152" x2="676" y2="150" stroke="#f9a825" stroke-width="0.8" opacity="0.5"/>
  <line x1="572" y1="202" x2="676" y2="156" stroke="#f9a825" stroke-width="0.8" opacity="0.5"/>
  <text x="580" y="230" text-anchor="middle" fill="#ffffff" font-size="9">非線形分離可能</text>
</svg>`,
);

// Index 22: 活性化関数の進化
addSvg(
	s,
	22,
	`<svg viewBox="0 0 800 280" style="${SVG_STYLE}">
  <rect width="800" height="280" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">活性化関数の進化</text>
  <!-- Axes -->
  <line x1="80" y1="170" x2="740" y2="170" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  <line x1="400" y1="50" x2="400" y2="260" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  <!-- Sigmoid -->
  <polyline points="80,165 140,160 200,148 260,130 320,110 380,92 400,88 420,88 480,95 540,115 600,135 660,152 720,160 740,163"
    fill="none" stroke="#e91e63" stroke-width="2"/>
  <text x="745" y="165" fill="#e91e63" font-size="10">σ</text>
  <!-- ReLU -->
  <polyline points="80,170 399,170 400,170 740,60"
    fill="none" stroke="#f9a825" stroke-width="2.5"/>
  <text x="745" y="62" fill="#f9a825" font-size="10">ReLU</text>
  <!-- GELU (approximate) -->
  <polyline points="80,175 200,172 320,162 380,148 400,145 420,140 480,115 580,80 680,52 740,38"
    fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="5"/>
  <text x="745" y="42" fill="#ffffff" font-size="10">GELU</text>
  <!-- Zero line label -->
  <text x="395" y="167" text-anchor="end" fill="#ffffff" font-size="9" opacity="0.5">0</text>
  <text x="72" y="174" text-anchor="end" fill="#ffffff" font-size="9" opacity="0.5">x=0</text>
  <!-- Labels bottom -->
  <text x="150" y="255" fill="#e91e63" font-size="10">Sigmoid: 勾配消失問題あり</text>
  <text x="400" y="255" text-anchor="middle" fill="#f9a825" font-size="10">ReLU: 高速・シンプル</text>
  <text x="650" y="255" fill="#ffffff" font-size="10">GELU: Transformerで主流</text>
</svg>`,
);

// Index 25: バッチ正規化
addSvg(
	s,
	25,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">バッチ正規化 (Batch Normalization)</text>
  <!-- Before BN -->
  <rect x="40" y="60" width="320" height="155" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="200" y="84" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold">BN なし</text>
  <text x="200" y="108" text-anchor="middle" fill="#ffffff" font-size="10">各層の入力分布が不安定</text>
  <text x="200" y="128" text-anchor="middle" fill="#ffffff" font-size="10">Internal Covariate Shift</text>
  <text x="200" y="150" text-anchor="middle" fill="#e91e63" font-size="10">学習率を小さくせざるを得ない</text>
  <text x="200" y="170" text-anchor="middle" fill="#e91e63" font-size="10">初期化に敏感</text>
  <text x="200" y="192" text-anchor="middle" fill="#e91e63" font-size="10">収束が遅い</text>
  <!-- After BN -->
  <rect x="440" y="60" width="320" height="155" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="600" y="84" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">BN あり</text>
  <text x="600" y="108" text-anchor="middle" fill="#ffffff" font-size="10">μ=0, σ=1 に正規化</text>
  <text x="600" y="128" text-anchor="middle" fill="#ffffff" font-size="10">学習を安定化</text>
  <text x="600" y="150" text-anchor="middle" fill="#f9a825" font-size="10">高い学習率が使える</text>
  <text x="600" y="170" text-anchor="middle" fill="#f9a825" font-size="10">初期化に頑健</text>
  <text x="600" y="192" text-anchor="middle" fill="#f9a825" font-size="10">Dropout代替にもなる</text>
  <!-- Formula -->
  <text x="400" y="240" text-anchor="middle" fill="#ffffff" font-size="11">x̂ = (x - μ) / σ  →  γx̂ + β  (γ, β は学習パラメータ)</text>
</svg>`,
);

// Index 35: Multi-Head Self-Attention
addSvg(
	s,
	35,
	`<svg viewBox="0 0 800 280" style="${SVG_STYLE}">
  <rect width="800" height="280" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">Multi-Head Self-Attention の詳細</text>
  <!-- Multiple heads -->
  <rect x="40" y="60" width="140" height="80" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="110" y="92" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">Head 1</text>
  <text x="110" y="112" text-anchor="middle" fill="#ffffff" font-size="9">Q₁K₁V₁</text>
  <text x="110" y="128" text-anchor="middle" fill="#f9a825" font-size="9">局所関係</text>
  <rect x="200" y="60" width="140" height="80" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="270" y="92" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">Head 2</text>
  <text x="270" y="112" text-anchor="middle" fill="#ffffff" font-size="9">Q₂K₂V₂</text>
  <text x="270" y="128" text-anchor="middle" fill="#f9a825" font-size="9">構文関係</text>
  <rect x="360" y="60" width="140" height="80" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="430" y="92" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">Head 3</text>
  <text x="430" y="112" text-anchor="middle" fill="#ffffff" font-size="9">Q₃K₃V₃</text>
  <text x="430" y="128" text-anchor="middle" fill="#f9a825" font-size="9">意味関係</text>
  <rect x="520" y="60" width="140" height="80" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5" opacity="0.7"/>
  <text x="590" y="92" text-anchor="middle" fill="#f9a825" font-size="11">Head h</text>
  <text x="590" y="112" text-anchor="middle" fill="#ffffff" font-size="9" opacity="0.7">...</text>
  <!-- Concat -->
  <rect x="120" y="190" width="480" height="50" rx="4" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="360" y="212" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">Concat + Linear W⁰</text>
  <text x="360" y="230" text-anchor="middle" fill="#ffffff" font-size="10">全ヘッドの出力を結合して線形変換</text>
  <!-- Arrows down to concat -->
  <line x1="110" y1="140" x2="200" y2="190" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="270" y1="140" x2="270" y2="190" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="430" y1="140" x2="380" y2="190" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="590" y1="140" x2="520" y2="190" stroke="#f9a825" stroke-width="1.5" opacity="0.7"/>
  <!-- h= note -->
  <text x="700" y="100" text-anchor="middle" fill="#f9a825" font-size="11">h=8〜16</text>
  <text x="700" y="118" text-anchor="middle" fill="#ffffff" font-size="10">並列処理</text>
</svg>`,
);

// Index 39: 自己教師あり学習の概念
addSvg(
	s,
	39,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">自己教師あり学習の概念</text>
  <!-- The key idea: create supervision from data itself -->
  <rect x="40" y="70" width="300" height="80" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="190" y="98" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">大量のラベルなしデータ</text>
  <text x="190" y="120" text-anchor="middle" fill="#ffffff" font-size="11">Webテキスト、画像、音声</text>
  <text x="190" y="138" text-anchor="middle" fill="#f9a825" font-size="10">人手ラベル不要</text>
  <!-- Transformation -->
  <rect x="250" y="158" width="300" height="60" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="183" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">自動タスク生成</text>
  <text x="400" y="203" text-anchor="middle" fill="#ffffff" font-size="10">マスク埋め / 次トークン予測 / 回転予測</text>
  <!-- Output: rich representations -->
  <rect x="460" y="70" width="300" height="80" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="610" y="98" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">豊富な特徴表現</text>
  <text x="610" y="120" text-anchor="middle" fill="#ffffff" font-size="11">汎用的な埋め込み</text>
  <text x="610" y="138" text-anchor="middle" fill="#f9a825" font-size="10">下流タスクに転用可能</text>
  <!-- Arrows -->
  <line x1="190" y1="150" x2="310" y2="158" stroke="#f9a825" stroke-width="2"/>
  <polygon points="310,158 298,152 298,164" fill="#f9a825"/>
  <line x1="550" y1="170" x2="590" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="590,150 580,162 594,162" fill="#f9a825"/>
</svg>`,
);

// Index 43: MAE / SimMIM
addSvg(
	s,
	43,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">MAE (Masked Autoencoder) の原理</text>
  <!-- Input image grid with masked patches -->
  <rect x="40" y="70" width="200" height="140" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="140" y="60" text-anchor="middle" fill="#f9a825" font-size="11">入力画像</text>
  <!-- Patches - some masked -->
  <rect x="53" y="83" width="40" height="40" fill="#e91e63" opacity="0.3"/>
  <rect x="98" y="83" width="40" height="40" fill="#f9a825" opacity="0.4"/>
  <text x="118" y="108" text-anchor="middle" fill="#1a1a2e" font-size="9">vis</text>
  <rect x="143" y="83" width="40" height="40" fill="#e91e63" opacity="0.3"/>
  <rect x="188" y="83" width="40" height="40" fill="#f9a825" opacity="0.4"/>
  <text x="208" y="108" text-anchor="middle" fill="#1a1a2e" font-size="9">vis</text>
  <rect x="53" y="128" width="40" height="40" fill="#f9a825" opacity="0.4"/>
  <text x="73" y="153" text-anchor="middle" fill="#1a1a2e" font-size="9">vis</text>
  <rect x="98" y="128" width="40" height="40" fill="#e91e63" opacity="0.3"/>
  <rect x="143" y="128" width="40" height="40" fill="#f9a825" opacity="0.4"/>
  <text x="163" y="153" text-anchor="middle" fill="#1a1a2e" font-size="9">vis</text>
  <rect x="188" y="128" width="40" height="40" fill="#e91e63" opacity="0.3"/>
  <text x="73" y="220" text-anchor="middle" fill="#e91e63" font-size="9">マスク(75%)</text>
  <text x="208" y="220" text-anchor="middle" fill="#f9a825" font-size="9">可視(25%)</text>
  <!-- Encoder -->
  <rect x="280" y="100" width="120" height="80" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="340" y="140" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">Encoder</text>
  <text x="340" y="158" text-anchor="middle" fill="#ffffff" font-size="9">可視パッチのみ処理</text>
  <!-- Decoder -->
  <rect x="440" y="100" width="120" height="80" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="500" y="140" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Decoder</text>
  <text x="500" y="158" text-anchor="middle" fill="#ffffff" font-size="9">マスク部分を再構成</text>
  <!-- Reconstructed -->
  <rect x="600" y="70" width="160" height="140" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="680" y="60" text-anchor="middle" fill="#f9a825" font-size="11">再構成</text>
  <!-- Arrows -->
  <line x1="240" y1="140" x2="280" y2="140" stroke="#f9a825" stroke-width="2"/>
  <polygon points="280,140 267,133 267,147" fill="#f9a825"/>
  <line x1="400" y1="140" x2="440" y2="140" stroke="#f9a825" stroke-width="2"/>
  <polygon points="440,140 427,133 427,147" fill="#f9a825"/>
  <line x1="560" y1="140" x2="600" y2="140" stroke="#f9a825" stroke-width="2"/>
  <polygon points="600,140 587,133 587,147" fill="#f9a825"/>
</svg>`,
);

// Index 56: DPO: 直接選好最適化
addSvg(
	s,
	56,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">DPO vs PPO: アライメント手法比較</text>
  <!-- RLHF/PPO -->
  <rect x="40" y="55" width="330" height="160" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="205" y="80" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">PPO (RLHF)</text>
  <text x="205" y="105" text-anchor="middle" fill="#ffffff" font-size="10">1. SFT モデル</text>
  <text x="205" y="125" text-anchor="middle" fill="#ffffff" font-size="10">2. 報酬モデル学習</text>
  <text x="205" y="145" text-anchor="middle" fill="#ffffff" font-size="10">3. PPO強化学習</text>
  <text x="205" y="165" text-anchor="middle" fill="#e91e63" font-size="10">複雑・不安定・高コスト</text>
  <text x="205" y="190" text-anchor="middle" fill="#ffffff" font-size="9">4つのモデルを同時に保持</text>
  <!-- DPO -->
  <rect x="430" y="55" width="330" height="160" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="595" y="80" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">DPO (Direct Preference)</text>
  <text x="595" y="105" text-anchor="middle" fill="#ffffff" font-size="10">1. SFT モデル</text>
  <text x="595" y="125" text-anchor="middle" fill="#ffffff" font-size="10">2. 選好データで直接最適化</text>
  <text x="595" y="145" text-anchor="middle" fill="#f9a825" font-size="10">報酬モデル不要</text>
  <text x="595" y="165" text-anchor="middle" fill="#f9a825" font-size="10">シンプル・安定・低コスト</text>
  <text x="595" y="190" text-anchor="middle" fill="#ffffff" font-size="9">2つのモデルのみ</text>
  <!-- Arrow from complex to simple -->
  <text x="400" y="145" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" opacity="0.4">→</text>
  <text x="400" y="230" text-anchor="middle" fill="#f9a825" font-size="11">DPO: Llama 2, Mistral等で広く採用</text>
</svg>`,
);

// Index 64: データキュレーションパイプライン
addSvg(
	s,
	64,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">データキュレーションパイプライン</text>
  <!-- Pipeline steps -->
  <rect x="20" y="90" width="120" height="60" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="80" y="115" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">収集</text>
  <text x="80" y="135" text-anchor="middle" fill="#ffffff" font-size="9">Web・書籍・コード</text>
  <polygon points="155,120 141,113 141,127" fill="#f9a825"/>
  <line x1="140" y1="120" x2="158" y2="120" stroke="#f9a825" stroke-width="2"/>
  <rect x="158" y="90" width="120" height="60" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="218" y="115" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">フィルタリング</text>
  <text x="218" y="135" text-anchor="middle" fill="#ffffff" font-size="9">品質・安全性</text>
  <polygon points="293,120 279,113 279,127" fill="#f9a825"/>
  <line x1="278" y1="120" x2="296" y2="120" stroke="#f9a825" stroke-width="2"/>
  <rect x="296" y="90" width="120" height="60" rx="4" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="356" y="115" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold">重複排除</text>
  <text x="356" y="135" text-anchor="middle" fill="#ffffff" font-size="9">MinHash・exact</text>
  <polygon points="431,120 417,113 417,127" fill="#f9a825"/>
  <line x1="416" y1="120" x2="434" y2="120" stroke="#f9a825" stroke-width="2"/>
  <rect x="434" y="90" width="120" height="60" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="494" y="115" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">トークン化</text>
  <text x="494" y="135" text-anchor="middle" fill="#ffffff" font-size="9">BPE・SentencePiece</text>
  <polygon points="569,120 555,113 555,127" fill="#f9a825"/>
  <line x1="554" y1="120" x2="572" y2="120" stroke="#f9a825" stroke-width="2"/>
  <rect x="572" y="90" width="120" height="60" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="632" y="115" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">配分設計</text>
  <text x="632" y="135" text-anchor="middle" fill="#ffffff" font-size="9">混合比率最適化</text>
  <polygon points="707,120 693,113 693,127" fill="#f9a825"/>
  <line x1="692" y1="120" x2="710" y2="120" stroke="#f9a825" stroke-width="2"/>
  <rect x="710" y="90" width="70" height="60" rx="4" fill="#f9a825" opacity="0.9"/>
  <text x="745" y="123" text-anchor="middle" fill="#1a1a2e" font-size="11" font-weight="bold">訓練</text>
  <text x="745" y="140" text-anchor="middle" fill="#1a1a2e" font-size="9">データ</text>
  <!-- Quality note -->
  <text x="400" y="195" text-anchor="middle" fill="#f9a825" font-size="11">品質 &gt; 量: 高品質1Tトークン &gt; 低品質10Tトークン</text>
</svg>`,
);

// Index 76: 拡散モデルの学習
addSvg(
	s,
	76,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">拡散モデルの学習原理</text>
  <!-- Forward process: add noise -->
  <text x="200" y="55" text-anchor="middle" fill="#e91e63" font-size="11">順プロセス (ノイズ付加)</text>
  <rect x="40" y="70" width="70" height="60" rx="4" fill="#f9a825" opacity="0.7"/>
  <text x="75" y="105" text-anchor="middle" fill="#1a1a2e" font-size="9">x₀ 画像</text>
  <polygon points="126,100 112,93 112,107" fill="#e91e63"/>
  <line x1="110" y1="100" x2="129" y2="100" stroke="#e91e63" stroke-width="2"/>
  <rect x="129" y="70" width="60" height="60" rx="4" fill="#e91e63" opacity="0.5"/>
  <text x="159" y="105" text-anchor="middle" fill="#ffffff" font-size="9">x₁</text>
  <polygon points="205,100 191,93 191,107" fill="#e91e63"/>
  <line x1="189" y1="100" x2="208" y2="100" stroke="#e91e63" stroke-width="2"/>
  <rect x="208" y="70" width="60" height="60" rx="4" fill="#e91e63" opacity="0.7"/>
  <text x="238" y="105" text-anchor="middle" fill="#ffffff" font-size="9">x₂</text>
  <text x="295" y="103" text-anchor="middle" fill="#e91e63" font-size="14">...</text>
  <rect x="330" y="70" width="70" height="60" rx="4" fill="#e91e63" opacity="0.9"/>
  <text x="365" y="105" text-anchor="middle" fill="#ffffff" font-size="9">xₜ 雑音</text>
  <!-- Reverse process: denoise -->
  <text x="600" y="55" text-anchor="middle" fill="#f9a825" font-size="11">逆プロセス (ノイズ除去) — 学習対象</text>
  <rect x="430" y="70" width="70" height="60" rx="4" fill="#e91e63" opacity="0.9"/>
  <text x="465" y="105" text-anchor="middle" fill="#ffffff" font-size="9">xₜ</text>
  <rect x="540" y="80" width="120" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="600" y="104" text-anchor="middle" fill="#f9a825" font-size="11">U-Net εθ</text>
  <polygon points="530,100 516,93 516,107" fill="#f9a825"/>
  <line x1="500" y1="100" x2="533" y2="100" stroke="#f9a825" stroke-width="2"/>
  <line x1="660" y1="100" x2="700" y2="100" stroke="#f9a825" stroke-width="2"/>
  <polygon points="700,100 686,93 686,107" fill="#f9a825"/>
  <rect x="700" y="70" width="70" height="60" rx="4" fill="#f9a825" opacity="0.7"/>
  <text x="735" y="105" text-anchor="middle" fill="#1a1a2e" font-size="9">x₀再構成</text>
  <!-- Training objective -->
  <rect x="160" y="170" width="480" height="50" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="192" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">訓練目標: ‖ε - εθ(xₜ, t)‖²</text>
  <text x="400" y="210" text-anchor="middle" fill="#ffffff" font-size="10">付加したノイズ ε を予測するようにモデルを訓練</text>
</svg>`,
);

// Index 81: 主要ベンチマーク概観
addSvg(
	s,
	81,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">主要AIベンチマーク</text>
  <!-- Benchmark grid -->
  <rect x="30" y="55" width="220" height="55" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="140" y="78" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">MMLU</text>
  <text x="140" y="98" text-anchor="middle" fill="#ffffff" font-size="10">57科目の知識 (0-shot)</text>
  <rect x="290" y="55" width="220" height="55" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="78" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">HumanEval</text>
  <text x="400" y="98" text-anchor="middle" fill="#ffffff" font-size="10">コード生成 (pass@1)</text>
  <rect x="550" y="55" width="220" height="55" rx="4" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="660" y="78" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">MATH</text>
  <text x="660" y="98" text-anchor="middle" fill="#ffffff" font-size="10">数学推論 (競技レベル)</text>
  <rect x="30" y="130" width="220" height="55" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="140" y="153" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">HellaSwag</text>
  <text x="140" y="173" text-anchor="middle" fill="#ffffff" font-size="10">常識推論・文脈補完</text>
  <rect x="290" y="130" width="220" height="55" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="153" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">BIG-Bench</text>
  <text x="400" y="173" text-anchor="middle" fill="#ffffff" font-size="10">創発能力テスト (200+)</text>
  <rect x="550" y="130" width="220" height="55" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="660" y="153" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">MT-Bench</text>
  <text x="660" y="173" text-anchor="middle" fill="#ffffff" font-size="10">マルチターン対話評価</text>
  <text x="400" y="215" text-anchor="middle" fill="#f9a825" font-size="10" opacity="0.8">注: ベンチマーク汚染・饱和問題が近年深刻化</text>
</svg>`,
);

// Index 86: 学習パラダイムの変遷まとめ
addSvg(
	s,
	86,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">AI学習パラダイムの変遷</text>
  <!-- Timeline -->
  <line x1="60" y1="130" x2="740" y2="130" stroke="#f9a825" stroke-width="2"/>
  <polygon points="740,130 726,123 726,137" fill="#f9a825"/>
  <circle cx="120" cy="130" r="10" fill="#e91e63"/>
  <text x="120" y="110" text-anchor="middle" fill="#ffffff" font-size="9">1960-80s</text>
  <text x="120" y="150" text-anchor="middle" fill="#f9a825" font-size="9">パーセプトロン</text>
  <text x="120" y="163" text-anchor="middle" fill="#ffffff" font-size="8">ルールベース</text>
  <circle cx="240" cy="130" r="10" fill="#e91e63"/>
  <text x="240" y="110" text-anchor="middle" fill="#ffffff" font-size="9">1990-2000s</text>
  <text x="240" y="150" text-anchor="middle" fill="#f9a825" font-size="9">SVM / RF</text>
  <text x="240" y="163" text-anchor="middle" fill="#ffffff" font-size="8">特徴量エンジニアリング</text>
  <circle cx="380" cy="130" r="10" fill="#e91e63"/>
  <text x="380" y="110" text-anchor="middle" fill="#ffffff" font-size="9">2012</text>
  <text x="380" y="150" text-anchor="middle" fill="#f9a825" font-size="9">Deep Learning</text>
  <text x="380" y="163" text-anchor="middle" fill="#ffffff" font-size="8">AlexNet · GPU時代</text>
  <circle cx="520" cy="130" r="10" fill="#e91e63"/>
  <text x="520" y="110" text-anchor="middle" fill="#ffffff" font-size="9">2017-20</text>
  <text x="520" y="150" text-anchor="middle" fill="#f9a825" font-size="9">Transformer</text>
  <text x="520" y="163" text-anchor="middle" fill="#ffffff" font-size="8">BERT / GPT</text>
  <circle cx="660" cy="130" r="12" fill="#f9a825"/>
  <text x="660" y="108" text-anchor="middle" fill="#ffffff" font-size="9">2022+</text>
  <text x="660" y="150" text-anchor="middle" fill="#f9a825" font-size="9">RLHF / DPO</text>
  <text x="660" y="163" text-anchor="middle" fill="#f9a825" font-size="8">アライメント時代</text>
</svg>`,
);

// Write back
writeFileSync(FILE, JSON.stringify(data, null, 2));
console.log("Done. SVGs batch 2 added to ai-learning-mechanisms slides.");
const svgCount = data.slides.filter((s: any) =>
	s.content?.some((c: string) => c.startsWith("<svg")),
).length;
console.log(
	`SVG slides: ${svgCount} / ${data.slides.length} (${Math.round((svgCount * 100) / data.slides.length)}%)`,
);
