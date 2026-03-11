#!/usr/bin/env bun
/**
 * Patch script: add inline SVGs to arpanet-myth slides-data.json
 * Target: ≥32 slides with SVGs (currently 5)
 * Existing SVGs: slides 23, 31, 36, 46, 57
 */

import { readFileSync, writeFileSync } from "node:fs";

const dataPath =
	"/workspace/main/docs/20260220120000_arpanet-myth/slides-data.json";
const data = JSON.parse(readFileSync(dataPath, "utf-8"));
const slides = data.slides;

// Color palette
const BG = "#1a1a2e";
const ACCENT1 = "#f9a825";
const ACCENT2 = "#e91e63";
const TEXT = "#ffffff";
const BOX = "#16213e";
const ACCENT3 = "#4fc3f7";
const GREEN = "#69f0ae";
const ORANGE = "#ff7043";

interface SlideData {
	title: string;
	content: string[];
	layout?: string;
	speakerNotes?: string;
}

function addSvgFirst(slide: SlideData, svgHtml: string): SlideData {
	const hasAsset = slide.content.some(
		(c) => c.includes("assets/") || c.includes("<svg"),
	);
	if (hasAsset) return slide;
	return { ...slide, content: [svgHtml, ...slide.content] };
}

// SVG: myth vs fact header
const svgMythFact = `<svg viewBox="0 0 800 360" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="360" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">神話 vs 事実</text>
  <!-- Myth side -->
  <rect x="40" y="50" width="340" height="280" rx="10" fill="${BOX}" stroke="${ACCENT2}" stroke-width="2"/>
  <text x="210" y="80" text-anchor="middle" fill="${ACCENT2}" font-size="16" font-weight="bold" font-family="sans-serif">神話（広く流布）</text>
  <text x="60" y="112" fill="${ACCENT2}" font-size="13" font-family="sans-serif">「ARPANETは核攻撃に耐えるため</text>
  <text x="60" y="130" fill="${ACCENT2}" font-size="13" font-family="sans-serif">に設計された」</text>
  <text x="60" y="160" fill="${TEXT}" font-size="12" font-family="sans-serif">出所: 教科書・Wikipedia・メディア</text>
  <text x="60" y="178" fill="${TEXT}" font-size="12" font-family="sans-serif">→ 軍の核サバイバル技術</text>
  <text x="60" y="196" fill="${TEXT}" font-size="12" font-family="sans-serif">→ 分散型設計が核耐性の証拠</text>
  <text x="60" y="214" fill="${TEXT}" font-size="12" font-family="sans-serif">→ ポール・バランが設計した</text>
  <text x="60" y="250" fill="${ACCENT2}" font-size="14" font-weight="bold" font-family="sans-serif">半分正しくて</text>
  <text x="60" y="272" fill="${ACCENT2}" font-size="14" font-weight="bold" font-family="sans-serif">半分大きく誤解</text>
  <!-- Fact side -->
  <rect x="420" y="50" width="340" height="280" rx="10" fill="${BOX}" stroke="${GREEN}" stroke-width="2"/>
  <text x="590" y="80" text-anchor="middle" fill="${GREEN}" font-size="16" font-weight="bold" font-family="sans-serif">事実（一次資料）</text>
  <text x="435" y="112" fill="${GREEN}" font-size="13" font-family="sans-serif">「研究者のリソース共有のために</text>
  <text x="435" y="130" fill="${GREEN}" font-size="13" font-family="sans-serif">設計された」</text>
  <text x="435" y="160" fill="${TEXT}" font-size="12" font-family="sans-serif">出所: ARPA文書・設計者証言</text>
  <text x="435" y="178" fill="${TEXT}" font-size="12" font-family="sans-serif">→ 高価なコンピュータの共有</text>
  <text x="435" y="196" fill="${TEXT}" font-size="12" font-family="sans-serif">→ 3台の端末問題を解く</text>
  <text x="435" y="214" fill="${TEXT}" font-size="12" font-family="sans-serif">→ バランの研究は別物</text>
  <text x="435" y="250" fill="${GREEN}" font-size="14" font-weight="bold" font-family="sans-serif">核耐性は副産物</text>
  <text x="435" y="272" fill="${GREEN}" font-size="14" font-weight="bold" font-family="sans-serif">（設計目標ではない）</text>
</svg>`;

// SVG: information spread timeline
const svgInfoSpread = `<svg viewBox="0 0 800 340" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">神話の誕生と拡大 — タイムライン</text>
  <!-- Timeline line -->
  <line x1="60" y1="160" x2="740" y2="160" stroke="#555" stroke-width="2"/>
  <!-- 1964: Baran research -->
  <circle cx="100" cy="160" r="10" fill="${ACCENT3}"/>
  <text x="100" y="145" text-anchor="middle" fill="${ACCENT3}" font-size="11" font-weight="bold" font-family="sans-serif">1964</text>
  <text x="100" y="178" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">バランの</text>
  <text x="100" y="192" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">RAND論文</text>
  <text x="100" y="208" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">（核耐性研究）</text>
  <!-- 1969: ARPANET -->
  <circle cx="200" cy="160" r="10" fill="${GREEN}"/>
  <text x="200" y="145" text-anchor="middle" fill="${GREEN}" font-size="11" font-weight="bold" font-family="sans-serif">1969</text>
  <text x="200" y="178" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">ARPANET</text>
  <text x="200" y="192" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">稼働開始</text>
  <text x="200" y="208" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">（リソース共有）</text>
  <!-- 1972: Email -->
  <circle cx="290" cy="160" r="8" fill="${ACCENT1}"/>
  <text x="290" y="145" text-anchor="middle" fill="${ACCENT1}" font-size="10" font-weight="bold" font-family="sans-serif">1972</text>
  <text x="290" y="178" text-anchor="middle" fill="${TEXT}" font-size="9" font-family="sans-serif">メール発明</text>
  <!-- 1980s: Media amplification -->
  <circle cx="400" cy="160" r="12" fill="${ACCENT2}"/>
  <text x="400" y="140" text-anchor="middle" fill="${ACCENT2}" font-size="11" font-weight="bold" font-family="sans-serif">1980〜90s</text>
  <text x="400" y="178" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">メディアが</text>
  <text x="400" y="192" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">「核耐性説」を</text>
  <text x="400" y="206" text-anchor="middle" fill="${ACCENT2}" font-size="10" font-family="sans-serif">繰り返し引用</text>
  <text x="400" y="218" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">TIME / Newsweek</text>
  <!-- 1996: Where Wizards -->
  <circle cx="510" cy="160" r="10" fill="${GREEN}"/>
  <text x="510" y="145" text-anchor="middle" fill="${GREEN}" font-size="11" font-weight="bold" font-family="sans-serif">1996</text>
  <text x="510" y="178" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">Where Wizards</text>
  <text x="510" y="192" text-anchor="middle" fill="${GREEN}" font-size="10" font-family="sans-serif">神話を否定</text>
  <text x="510" y="206" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">（学術的認知）</text>
  <!-- Late 1990s: Wikipedia -->
  <circle cx="610" cy="160" r="12" fill="${ACCENT2}"/>
  <text x="610" y="140" text-anchor="middle" fill="${ACCENT2}" font-size="11" font-weight="bold" font-family="sans-serif">2000s</text>
  <text x="610" y="178" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">Wikipedia</text>
  <text x="610" y="192" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">草創期に「事実」</text>
  <text x="610" y="206" text-anchor="middle" fill="${ACCENT2}" font-size="10" font-family="sans-serif">として世界拡散</text>
  <!-- Today -->
  <circle cx="710" cy="160" r="10" fill="${ORANGE}"/>
  <text x="710" y="145" text-anchor="middle" fill="${ORANGE}" font-size="11" font-weight="bold" font-family="sans-serif">現在</text>
  <text x="710" y="178" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">教科書・授業の</text>
  <text x="710" y="192" text-anchor="middle" fill="${ORANGE}" font-size="10" font-family="sans-serif">定番説明文</text>
  <!-- Key insight -->
  <rect x="80" y="255" width="640" height="60" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1"/>
  <text x="400" y="278" text-anchor="middle" fill="${ACCENT1}" font-size="12" font-weight="bold" font-family="sans-serif">混同のメカニズム</text>
  <text x="400" y="300" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">バランの核耐性研究（1964）+ ARPANETの同時期創設（1969）= 「一緒のもの」と誤認</text>
</svg>`;

// SVG: Cold War ARPA context
const svgColdWarContext = `<svg viewBox="0 0 800 340" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">冷戦とARPAの設立背景（1957〜1958年）</text>
  <!-- Sputnik event -->
  <rect x="40" y="50" width="200" height="120" rx="8" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1.5"/>
  <text x="140" y="74" text-anchor="middle" fill="${ACCENT2}" font-size="13" font-weight="bold" font-family="sans-serif">スプートニクショック</text>
  <text x="140" y="96" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">1957年10月4日</text>
  <text x="140" y="114" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">ソ連が世界初の人工衛星を</text>
  <text x="140" y="130" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">打ち上げ</text>
  <text x="140" y="152" text-anchor="middle" fill="${ACCENT2}" font-size="12" font-weight="bold" font-family="sans-serif">「技術で後れを取った」</text>
  <!-- Arrow -->
  <line x1="240" y1="110" x2="278" y2="110" stroke="#aaa" stroke-width="2"/>
  <polygon points="276,105 288,110 276,115" fill="#aaa"/>
  <!-- ARPA formation -->
  <rect x="290" y="50" width="220" height="120" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1.5"/>
  <text x="400" y="74" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">ARPA 設立（1958年2月）</text>
  <text x="305" y="96" fill="${TEXT}" font-size="11" font-family="sans-serif">アイゼンハワー大統領が署名</text>
  <text x="305" y="112" fill="${TEXT}" font-size="11" font-family="sans-serif">目的: 「技術的奇襲を防ぐ」</text>
  <text x="305" y="130" fill="${TEXT}" font-size="11" font-family="sans-serif">方法: 大学・民間への研究委託</text>
  <text x="305" y="150" fill="${ACCENT3}" font-size="11" font-family="sans-serif">→ 基礎研究を加速する機関</text>
  <!-- Arrow -->
  <line x1="510" y1="110" x2="548" y2="110" stroke="#aaa" stroke-width="2"/>
  <polygon points="546,105 558,110 546,115" fill="#aaa"/>
  <!-- IPTO -->
  <rect x="560" y="50" width="200" height="120" rx="8" fill="${BOX}" stroke="${GREEN}" stroke-width="1.5"/>
  <text x="660" y="74" text-anchor="middle" fill="${GREEN}" font-size="13" font-weight="bold" font-family="sans-serif">IPTO 設立（1962年）</text>
  <text x="575" y="96" fill="${TEXT}" font-size="11" font-family="sans-serif">Licklider が初代所長</text>
  <text x="575" y="112" fill="${TEXT}" font-size="11" font-family="sans-serif">使命: コンピュータ科学の</text>
  <text x="575" y="128" fill="${TEXT}" font-size="11" font-family="sans-serif">基礎研究を推進</text>
  <text x="575" y="148" fill="${GREEN}" font-size="11" font-family="sans-serif">→ ARPANETの思想的起源</text>
  <!-- Key point box -->
  <rect x="40" y="195" width="720" height="120" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1"/>
  <text x="400" y="218" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">重要な区別</text>
  <rect x="60" y="232" width="300" height="68" rx="6" fill="#1a1a2e" stroke="${ACCENT2}" stroke-width="1"/>
  <text x="210" y="252" text-anchor="middle" fill="${ACCENT2}" font-size="12" font-weight="bold" font-family="sans-serif">ARPA = 軍の機関 ✓</text>
  <text x="210" y="272" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">→ 予算は軍事費から</text>
  <text x="210" y="290" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">→ 議会承認に安保貢献が必要</text>
  <rect x="440" y="232" width="300" height="68" rx="6" fill="#1a1a2e" stroke="${GREEN}" stroke-width="1"/>
  <text x="590" y="252" text-anchor="middle" fill="${GREEN}" font-size="12" font-weight="bold" font-family="sans-serif">目的 = 研究推進 ✓</text>
  <text x="590" y="272" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">→ 研究者の問題を解く</text>
  <text x="590" y="290" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">→ 核攻撃対策ではない</text>
</svg>`;

// SVG: Licklider vision
const svgLickliderVision = `<svg viewBox="0 0 800 340" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">Licklider の「銀河間コンピュータネットワーク」構想</text>
  <!-- Person box -->
  <rect x="40" y="50" width="200" height="140" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1.5"/>
  <text x="140" y="74" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">J.C.R. Licklider</text>
  <text x="140" y="94" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">心理学者・CS者</text>
  <text x="140" y="112" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">MIT → BBN → ARPA</text>
  <text x="140" y="132" text-anchor="middle" fill="${ACCENT3}" font-size="11" font-family="sans-serif">「コンピュータの父」の一人</text>
  <text x="140" y="152" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">1915〜1990</text>
  <!-- Vision box -->
  <rect x="280" y="50" width="480" height="140" rx="8" fill="${BOX}" stroke="${ACCENT3}" stroke-width="1.5"/>
  <text x="520" y="74" text-anchor="middle" fill="${ACCENT3}" font-size="13" font-weight="bold" font-family="sans-serif">1963年4月メモ「銀河間コンピュータネットワーク」</text>
  <text x="295" y="96" fill="${TEXT}" font-size="11" font-family="sans-serif">「全米の研究者がネットワーク経由でコンピュータを共有する」</text>
  <text x="295" y="114" fill="${TEXT}" font-size="11" font-family="sans-serif">「高価なコンピュータを複数拠点でシェアして研究を加速」</text>
  <text x="295" y="134" fill="${TEXT}" font-size="11" font-family="sans-serif">IBM 7094 の年間リース料: 約 $1,000,000 (1962年)</text>
  <text x="295" y="154" fill="${ACCENT1}" font-size="12" font-weight="bold" font-family="sans-serif">→ タイムシェアリングをネットワーク越しに拡張する発想</text>
  <text x="295" y="175" fill="#aaa" font-size="11" font-family="sans-serif">核戦争への言及: ゼロ</text>
  <!-- Bottom: connection to ARPANET -->
  <rect x="40" y="220" width="720" height="90" rx="8" fill="${BOX}" stroke="${GREEN}" stroke-width="1"/>
  <text x="400" y="244" text-anchor="middle" fill="${GREEN}" font-size="13" font-weight="bold" font-family="sans-serif">ARPANETへの直接的な思想的継承</text>
  <text x="80" y="266" fill="${TEXT}" font-size="11" font-family="sans-serif">Licklider（1960）: 人間とコンピュータの共生を提唱</text>
  <text x="80" y="284" fill="${TEXT}" font-size="11" font-family="sans-serif">↓ Bob Taylor（1966）: 「3台の端末問題」を解く = ARPANETの直接的動機</text>
  <text x="80" y="302" fill="${GREEN}" font-size="11" font-family="sans-serif">↓ ARPANET（1969）: 研究者間のリソース共有ネットワークとして稼働</text>
</svg>`;

// SVG: Bob Taylor 3 terminal problem
const svgThreeTerminals = `<svg viewBox="0 0 800 340" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">Bob Taylorの「3台の端末問題」（1966年）</text>
  <!-- Before: 3 separate terminals -->
  <rect x="40" y="48" width="340" height="250" rx="10" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1.5"/>
  <text x="210" y="72" text-anchor="middle" fill="${ACCENT2}" font-size="14" font-weight="bold" font-family="sans-serif">問題 — 非効率な現状</text>
  <!-- Terminal 1 -->
  <rect x="65" y="88" width="90" height="55" rx="4" fill="#1a1a2e" stroke="${ACCENT3}" stroke-width="1"/>
  <text x="110" y="110" text-anchor="middle" fill="${ACCENT3}" font-size="10" font-weight="bold" font-family="sans-serif">端末①</text>
  <text x="110" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">TX-2 (MIT)</text>
  <!-- Terminal 2 -->
  <rect x="175" y="88" width="90" height="55" rx="4" fill="#1a1a2e" stroke="${ACCENT3}" stroke-width="1"/>
  <text x="220" y="110" text-anchor="middle" fill="${ACCENT3}" font-size="10" font-weight="bold" font-family="sans-serif">端末②</text>
  <text x="220" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">AN/FSQ-32 (SDC)</text>
  <!-- Terminal 3 -->
  <rect x="285" y="88" width="75" height="55" rx="4" fill="#1a1a2e" stroke="${ACCENT3}" stroke-width="1"/>
  <text x="323" y="110" text-anchor="middle" fill="${ACCENT3}" font-size="10" font-weight="bold" font-family="sans-serif">端末③</text>
  <text x="323" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">IBM 360</text>
  <text x="210" y="170" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">3回ログインし直す必要あり</text>
  <text x="210" y="190" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">コマンド体系がバラバラ</text>
  <text x="210" y="210" text-anchor="middle" fill="${ACCENT2}" font-size="13" font-weight="bold" font-family="sans-serif">「非効率極まりない！」</text>
  <text x="210" y="240" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">（Taylor本人の2004年証言）</text>
  <text x="210" y="262" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">核戦争の「か」の字もない</text>
  <!-- After: ARPANET solution -->
  <rect x="420" y="48" width="340" height="250" rx="10" fill="${BOX}" stroke="${GREEN}" stroke-width="1.5"/>
  <text x="590" y="72" text-anchor="middle" fill="${GREEN}" font-size="14" font-weight="bold" font-family="sans-serif">解決 — ARPANET</text>
  <!-- Single terminal -->
  <rect x="535" y="88" width="110" height="55" rx="6" fill="#1a3a1a" stroke="${GREEN}" stroke-width="2"/>
  <text x="590" y="110" text-anchor="middle" fill="${GREEN}" font-size="13" font-weight="bold" font-family="sans-serif">1台の端末</text>
  <text x="590" y="130" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">すべてに接続</text>
  <!-- Connection lines -->
  <line x1="590" y1="143" x2="480" y2="175" stroke="${GREEN}" stroke-width="1.5"/>
  <line x1="590" y1="143" x2="590" y2="175" stroke="${GREEN}" stroke-width="1.5"/>
  <line x1="590" y1="143" x2="700" y2="175" stroke="${GREEN}" stroke-width="1.5"/>
  <!-- Remote computers -->
  <rect x="440" y="175" width="80" height="36" rx="4" fill="${BOX}" stroke="#555" stroke-width="1"/>
  <text x="480" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">MIT</text>
  <rect x="548" y="175" width="80" height="36" rx="4" fill="${BOX}" stroke="#555" stroke-width="1"/>
  <text x="588" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">SDC</text>
  <rect x="656" y="175" width="80" height="36" rx="4" fill="${BOX}" stroke="#555" stroke-width="1"/>
  <text x="696" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">各大学</text>
  <text x="590" y="240" text-anchor="middle" fill="${GREEN}" font-size="12" font-weight="bold" font-family="sans-serif">統一インターフェースで</text>
  <text x="590" y="258" text-anchor="middle" fill="${GREEN}" font-size="12" font-weight="bold" font-family="sans-serif">全リソースにアクセス</text>
  <text x="590" y="278" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">これがARPANETの直接の動機</text>
</svg>`;

// SVG: Paul Baran research vs ARPANET distinction
const svgBaranVsArpanet = `<svg viewBox="0 0 800 340" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">バランの研究 vs ARPANET — 完全に別物</text>
  <!-- Baran box -->
  <rect x="40" y="50" width="320" height="230" rx="10" fill="${BOX}" stroke="${ACCENT2}" stroke-width="2"/>
  <text x="200" y="76" text-anchor="middle" fill="${ACCENT2}" font-size="14" font-weight="bold" font-family="sans-serif">ポール・バランの研究</text>
  <text x="200" y="96" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">RAND Corporation (1960〜1964)</text>
  <text x="55" y="120" fill="${TEXT}" font-size="11" font-family="sans-serif">目的: 核攻撃後の軍指揮命令系統維持</text>
  <text x="55" y="138" fill="${TEXT}" font-size="11" font-family="sans-serif">対象: 軍の音声電話網</text>
  <text x="55" y="156" fill="${TEXT}" font-size="11" font-family="sans-serif">結果: AT&amp;T等が実現不可能と判断</text>
  <text x="55" y="174" fill="${ACCENT2}" font-size="11" font-family="sans-serif">→ 1964年に棚上げ</text>
  <text x="55" y="198" fill="${TEXT}" font-size="11" font-family="sans-serif">バラン自身の発言:</text>
  <text x="55" y="216" fill="${TEXT}" font-size="11" font-family="sans-serif">「ARPANETを設計したのは私ではない」</text>
  <text x="55" y="234" fill="#aaa" font-size="10" font-family="sans-serif">（生涯この誤解を訂正し続けた）</text>
  <!-- Not equal sign -->
  <text x="393" y="172" text-anchor="middle" fill="${ACCENT2}" font-size="36" font-weight="bold" font-family="sans-serif">≠</text>
  <!-- ARPANET box -->
  <rect x="440" y="50" width="320" height="230" rx="10" fill="${BOX}" stroke="${GREEN}" stroke-width="2"/>
  <text x="600" y="76" text-anchor="middle" fill="${GREEN}" font-size="14" font-weight="bold" font-family="sans-serif">ARPANET</text>
  <text x="600" y="96" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">ARPA / BBN (1966〜1969)</text>
  <text x="455" y="120" fill="${TEXT}" font-size="11" font-family="sans-serif">目的: 研究者のリソース共有</text>
  <text x="455" y="138" fill="${TEXT}" font-size="11" font-family="sans-serif">対象: 大学・研究機関のコンピュータ</text>
  <text x="455" y="156" fill="${TEXT}" font-size="11" font-family="sans-serif">実現: BBNが設計・構築</text>
  <text x="455" y="174" fill="${GREEN}" font-size="11" font-family="sans-serif">→ 1969年稼働</text>
  <text x="455" y="198" fill="${TEXT}" font-size="11" font-family="sans-serif">Larry Roberts:</text>
  <text x="455" y="216" fill="${TEXT}" font-size="11" font-family="sans-serif">「設計目的はリソース共有だった」</text>
  <text x="455" y="234" fill="#aaa" font-size="10" font-family="sans-serif">（IEEE Annals 1988年）</text>
  <!-- Bottom note -->
  <rect x="40" y="295" width="720" height="35" rx="6" fill="${BOX}" stroke="#444" stroke-width="1"/>
  <text x="400" y="317" text-anchor="middle" fill="${ACCENT1}" font-size="12" font-family="sans-serif">バランのアイデア（パケット交換）は参照されたが、ARPANETの設計書ではない — 「二重の誤り」</text>
</svg>`;

// SVG: Donald Davies independent invention
const svgDonaldDavies = `<svg viewBox="0 0 800 320" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">パケット交換の独立発明 — 核戦争は必要条件ではなかった</text>
  <!-- Baran left -->
  <rect x="40" y="55" width="240" height="185" rx="8" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1.5"/>
  <text x="160" y="78" text-anchor="middle" fill="${ACCENT2}" font-size="13" font-weight="bold" font-family="sans-serif">ポール・バラン (1964)</text>
  <text x="160" y="98" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">RAND Corporation (米)</text>
  <text x="55" y="118" fill="${TEXT}" font-size="11" font-family="sans-serif">動機: 核攻撃後の通信維持</text>
  <text x="55" y="136" fill="${TEXT}" font-size="11" font-family="sans-serif">軍事目的</text>
  <text x="55" y="160" fill="${ACCENT2}" font-size="11" font-family="sans-serif">「分散型ネットワーク」</text>
  <text x="55" y="178" fill="${ACCENT2}" font-size="11" font-family="sans-serif">「パケット分割通信」</text>
  <text x="55" y="198" fill="#aaa" font-size="10" font-family="sans-serif">（採用されず棚上げ）</text>
  <!-- Same result in the middle -->
  <rect x="320" y="100" width="160" height="80" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2"/>
  <text x="400" y="126" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">パケット交換</text>
  <text x="400" y="146" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">Packet Switching</text>
  <text x="400" y="164" text-anchor="middle" fill="${ACCENT1}" font-size="11" font-family="sans-serif">時代の必然</text>
  <!-- Arrows -->
  <line x1="280" y1="148" x2="318" y2="148" stroke="${ACCENT1}" stroke-width="2"/>
  <polygon points="316,143 328,148 316,153" fill="${ACCENT1}"/>
  <line x1="480" y1="148" x2="518" y2="148" stroke="${ACCENT1}" stroke-width="2"/>
  <polygon points="480,143 480,153 518,148" fill="${ACCENT1}"/>
  <!-- Davies right -->
  <rect x="520" y="55" width="240" height="185" rx="8" fill="${BOX}" stroke="${GREEN}" stroke-width="1.5"/>
  <text x="640" y="78" text-anchor="middle" fill="${GREEN}" font-size="13" font-weight="bold" font-family="sans-serif">Donald Davies (1965〜66)</text>
  <text x="640" y="98" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">英国NPL (英)</text>
  <text x="535" y="118" fill="${TEXT}" font-size="11" font-family="sans-serif">動機: 公衆データ通信の効率化</text>
  <text x="535" y="136" fill="${TEXT}" font-size="11" font-family="sans-serif">民間・効率化目的</text>
  <text x="535" y="160" fill="${GREEN}" font-size="11" font-family="sans-serif">「packet」という用語を命名</text>
  <text x="535" y="178" fill="${GREEN}" font-size="11" font-family="sans-serif">核戦争との関係: 皆無</text>
  <text x="535" y="198" fill="#aaa" font-size="10" font-family="sans-serif">（独立に同じ概念に到達）</text>
  <!-- Key insight -->
  <rect x="40" y="262" width="720" height="44" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1"/>
  <text x="400" y="282" text-anchor="middle" fill="${ACCENT1}" font-size="12" font-weight="bold" font-family="sans-serif">結論: 核戦争対策はパケット交換の「必要条件」ではなかった</text>
  <text x="400" y="298" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">異なる動機から同じ技術が独立に生まれた = 「時代の必然」</text>
</svg>`;

// SVG: IMP router concept
const svgIMP = `<svg viewBox="0 0 800 340" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">IMP（Interface Message Processor）— ルーターの祖先</text>
  <!-- Host A -->
  <rect x="40" y="120" width="100" height="60" rx="6" fill="${BOX}" stroke="${ACCENT3}" stroke-width="1.5"/>
  <text x="90" y="147" text-anchor="middle" fill="${ACCENT3}" font-size="11" font-weight="bold" font-family="sans-serif">ホスト A</text>
  <text x="90" y="163" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">IBM 7094</text>
  <!-- IMP A -->
  <rect x="170" y="105" width="90" height="90" rx="8" fill="#1a3a1a" stroke="${GREEN}" stroke-width="2"/>
  <text x="215" y="130" text-anchor="middle" fill="${GREEN}" font-size="11" font-weight="bold" font-family="sans-serif">IMP A</text>
  <text x="215" y="148" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">Honeywell</text>
  <text x="215" y="164" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">DEC 316</text>
  <text x="215" y="182" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">400kg, 2kW</text>
  <!-- Network in middle -->
  <rect x="300" y="130" width="200" height="80" rx="8" fill="${BOX}" stroke="#555" stroke-width="1"/>
  <text x="400" y="158" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">パケット交換</text>
  <text x="400" y="176" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">ネットワーク</text>
  <text x="400" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">50kbps 専用回線</text>
  <!-- IMP B -->
  <rect x="540" y="105" width="90" height="90" rx="8" fill="#1a3a1a" stroke="${GREEN}" stroke-width="2"/>
  <text x="585" y="130" text-anchor="middle" fill="${GREEN}" font-size="11" font-weight="bold" font-family="sans-serif">IMP B</text>
  <text x="585" y="148" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">Honeywell</text>
  <text x="585" y="164" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">DEC 316</text>
  <text x="585" y="182" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">$65,000/台</text>
  <!-- Host B -->
  <rect x="660" y="120" width="100" height="60" rx="6" fill="${BOX}" stroke="${ACCENT3}" stroke-width="1.5"/>
  <text x="710" y="147" text-anchor="middle" fill="${ACCENT3}" font-size="11" font-weight="bold" font-family="sans-serif">ホスト B</text>
  <text x="710" y="163" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">SDS Sigma 7</text>
  <!-- Arrows -->
  <line x1="140" y1="150" x2="170" y2="150" stroke="${ACCENT1}" stroke-width="2"/>
  <polygon points="168,145 180,150 168,155" fill="${ACCENT1}"/>
  <line x1="260" y1="150" x2="300" y2="150" stroke="${ACCENT1}" stroke-width="2"/>
  <polygon points="298,145 310,150 298,155" fill="${ACCENT1}"/>
  <line x1="500" y1="150" x2="540" y2="150" stroke="${ACCENT1}" stroke-width="2"/>
  <polygon points="538,145 550,150 538,155" fill="${ACCENT1}"/>
  <line x1="630" y1="150" x2="660" y2="150" stroke="${ACCENT1}" stroke-width="2"/>
  <polygon points="658,145 670,150 658,155" fill="${ACCENT1}"/>
  <!-- IMPs role -->
  <rect x="40" y="230" width="720" height="80" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1"/>
  <text x="400" y="252" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">IMPの革新的役割</text>
  <text x="60" y="272" fill="${TEXT}" font-size="11" font-family="sans-serif">各ホストはIMPのプロトコルに従うだけでよい（異種コンピュータ間の「翻訳機」）</text>
  <text x="60" y="290" fill="${TEXT}" font-size="11" font-family="sans-serif">→ 現代のルーターの原型　→ 核攻撃対策ではなく相互運用性のための装置</text>
</svg>`;

// SVG: ARPANET network growth 1969-1983
const svgArpanetGrowth = `<svg viewBox="0 0 800 340" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">ARPANETの成長 — 軍事施設はなかった</text>
  <!-- 1969 -->
  <rect x="40" y="50" width="200" height="145" rx="8" fill="${BOX}" stroke="${ACCENT3}" stroke-width="1.5"/>
  <text x="140" y="72" text-anchor="middle" fill="${ACCENT3}" font-size="13" font-weight="bold" font-family="sans-serif">1969年 4ノード</text>
  <text x="55" y="94" fill="${TEXT}" font-size="11" font-family="sans-serif">① UCLA（カリフォルニア大学）</text>
  <text x="55" y="112" fill="${TEXT}" font-size="11" font-family="sans-serif">② SRI（スタンフォード研究所）</text>
  <text x="55" y="130" fill="${TEXT}" font-size="11" font-family="sans-serif">③ UCSB（カリフォルニア大学SB）</text>
  <text x="55" y="148" fill="${TEXT}" font-size="11" font-family="sans-serif">④ U of Utah（ユタ大学）</text>
  <text x="140" y="176" text-anchor="middle" fill="${GREEN}" font-size="12" font-weight="bold" font-family="sans-serif">全て大学・研究機関</text>
  <text x="140" y="194" text-anchor="middle" fill="${ACCENT2}" font-size="11" font-family="sans-serif">軍事施設: ゼロ</text>
  <!-- 1972 -->
  <rect x="270" y="50" width="200" height="145" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1.5"/>
  <text x="370" y="72" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">1972年 23ノード</text>
  <text x="285" y="94" fill="${TEXT}" font-size="11" font-family="sans-serif">MIT・Harvard・CMU</text>
  <text x="285" y="112" fill="${TEXT}" font-size="11" font-family="sans-serif">BBN・RAND（民間研究所）</text>
  <text x="285" y="130" fill="${TEXT}" font-size="11" font-family="sans-serif">最大トラフィック: 電子メール</text>
  <text x="285" y="150" fill="#aaa" font-size="10" font-family="sans-serif">（設計者が計画していなかった）</text>
  <text x="370" y="178" text-anchor="middle" fill="${GREEN}" font-size="11" font-family="sans-serif">研究コミュニティが中心</text>
  <!-- 1983 -->
  <rect x="500" y="50" width="260" height="145" rx="8" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1.5"/>
  <text x="630" y="72" text-anchor="middle" fill="${ACCENT2}" font-size="13" font-weight="bold" font-family="sans-serif">1983年 分割</text>
  <text x="515" y="94" fill="${TEXT}" font-size="11" font-family="sans-serif">MILNET（軍専用）← 分離</text>
  <text x="515" y="112" fill="${TEXT}" font-size="11" font-family="sans-serif">ARPANET（研究用）← 継続</text>
  <text x="515" y="132" fill="${ACCENT3}" font-size="11" font-family="sans-serif">TCP/IPへの切り替えも同年</text>
  <text x="515" y="150" fill="#aaa" font-size="10" font-family="sans-serif">「インターネット誕生」</text>
  <text x="630" y="178" text-anchor="middle" fill="${ACCENT2}" font-size="11" font-family="sans-serif">「軍のネット」は分離後</text>
  <!-- Bottom note -->
  <rect x="40" y="218" width="720" height="90" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1"/>
  <text x="400" y="240" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">重要な事実</text>
  <text x="60" y="262" fill="${TEXT}" font-size="12" font-family="sans-serif">最初の4ノードに軍事施設がないことは「核戦争対策が主目的でない」証拠の一つ</text>
  <text x="60" y="284" fill="${TEXT}" font-size="11" font-family="sans-serif">軍が使うようになったのはARPANETが発展してから — 「軍事技術の民間転用」ではなく</text>
  <text x="60" y="302" fill="${GREEN}" font-size="11" font-family="sans-serif">「民間研究技術を軍も使うようになった」が正確な表現</text>
</svg>`;

// SVG: Email invention - unexpected killer app
const svgEmailInvention = `<svg viewBox="0 0 800 320" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">メール発明 — 設計者が計画しなかったキラーアプリ（1971年）</text>
  <!-- Person -->
  <rect x="40" y="55" width="200" height="120" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1.5"/>
  <text x="140" y="78" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">Ray Tomlinson</text>
  <text x="140" y="96" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">BBN研究員</text>
  <text x="55" y="116" fill="${TEXT}" font-size="11" font-family="sans-serif">「ARPANETの隙間時間に</text>
  <text x="55" y="132" fill="${TEXT}" font-size="11" font-family="sans-serif">個人プロジェクトとして実装」</text>
  <text x="55" y="150" fill="#aaa" font-size="10" font-family="sans-serif">「別のコンピュータの人に</text>
  <text x="55" y="164" fill="#aaa" font-size="10" font-family="sans-serif">メッセージを送れたら面白い」</text>
  <!-- @ symbol -->
  <rect x="280" y="55" width="240" height="120" rx="8" fill="${BOX}" stroke="${ACCENT3}" stroke-width="1.5"/>
  <text x="400" y="78" text-anchor="middle" fill="${ACCENT3}" font-size="40" font-weight="bold" font-family="sans-serif">@</text>
  <text x="400" y="118" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">ユーザー名@ホスト名</text>
  <text x="295" y="140" fill="${TEXT}" font-size="11" font-family="sans-serif">「他の使われ方をほぼしない」</text>
  <text x="295" y="156" fill="#aaa" font-size="10" font-family="sans-serif">文字として選択</text>
  <text x="295" y="170" fill="${ACCENT3}" font-size="11" font-family="sans-serif">→ 現代メールアドレスの形式</text>
  <!-- Impact -->
  <rect x="560" y="55" width="200" height="120" rx="8" fill="${BOX}" stroke="${GREEN}" stroke-width="1.5"/>
  <text x="660" y="78" text-anchor="middle" fill="${GREEN}" font-size="13" font-weight="bold" font-family="sans-serif">ARPAの反応</text>
  <text x="575" y="98" fill="${TEXT}" font-size="11" font-family="sans-serif">当初は公式サポートなし</text>
  <text x="575" y="116" fill="${TEXT}" font-size="11" font-family="sans-serif">1972年に最大のトラフィックへ</text>
  <text x="575" y="134" fill="${GREEN}" font-size="11" font-family="sans-serif">設計者が計画しなかった</text>
  <text x="575" y="152" fill="${GREEN}" font-size="11" font-family="sans-serif">最重要ユースケース</text>
  <text x="575" y="170" fill="#aaa" font-size="10" font-family="sans-serif">ユーザーが自然に使い始めた</text>
  <!-- Bottom lesson -->
  <rect x="40" y="200" width="720" height="96" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1"/>
  <text x="400" y="222" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">重要な教訓</text>
  <text x="60" y="248" fill="${TEXT}" font-size="12" font-family="sans-serif">最も重要なユースケースは設計者が計画していなかった</text>
  <text x="60" y="268" fill="${GREEN}" font-size="12" font-family="sans-serif">→ オープンなインフラが持つ予測不可能な可能性</text>
  <text x="60" y="288" fill="#aaa" font-size="11" font-family="sans-serif">核戦争対策のシステムなら、電子メールという「文民用途」は設計外だった</text>
</svg>`;

// SVG: TCP/IP Cerf and Kahn
const svgTCPIP = `<svg viewBox="0 0 800 320" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">TCP/IP — インターネットを可能にした設計原則（1974年）</text>
  <!-- NCP box -->
  <rect x="40" y="55" width="200" height="100" rx="8" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1.5"/>
  <text x="140" y="78" text-anchor="middle" fill="${ACCENT2}" font-size="13" font-weight="bold" font-family="sans-serif">NCP（旧プロトコル）</text>
  <text x="55" y="98" fill="${TEXT}" font-size="11" font-family="sans-serif">ARPANETの内部のみで機能</text>
  <text x="55" y="116" fill="${TEXT}" font-size="11" font-family="sans-serif">異ネットワーク間: 不可能</text>
  <text x="55" y="138" fill="${ACCENT2}" font-size="11" font-family="sans-serif">「閉じたネットワーク」</text>
  <!-- Arrow -->
  <line x1="240" y1="105" x2="278" y2="105" stroke="#aaa" stroke-width="2"/>
  <polygon points="276,100 288,105 276,110" fill="#aaa"/>
  <!-- TCP/IP box -->
  <rect x="290" y="48" width="220" height="260" rx="8" fill="${BOX}" stroke="${GREEN}" stroke-width="2"/>
  <text x="400" y="72" text-anchor="middle" fill="${GREEN}" font-size="14" font-weight="bold" font-family="sans-serif">TCP/IP（1974年）</text>
  <text x="400" y="92" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">Vint Cerf &amp; Bob Kahn</text>
  <text x="305" y="116" fill="${GREEN}" font-size="11" font-family="sans-serif">「どんなネットワークも</text>
  <text x="305" y="132" fill="${GREEN}" font-size="11" font-family="sans-serif">繋げられる」</text>
  <text x="305" y="154" fill="${TEXT}" font-size="11" font-family="sans-serif">エンドツーエンド原則</text>
  <text x="305" y="172" fill="${TEXT}" font-size="11" font-family="sans-serif">ネットワーク自体はシンプルに</text>
  <text x="305" y="190" fill="${TEXT}" font-size="11" font-family="sans-serif">複雑さは端点へ</text>
  <text x="305" y="218" fill="${ACCENT1}" font-size="11" font-weight="bold" font-family="sans-serif">1983年1月1日:</text>
  <text x="305" y="236" fill="${ACCENT1}" font-size="11" font-family="sans-serif">NCP→TCP/IP切り替え</text>
  <text x="305" y="254" fill="${ACCENT3}" font-size="11" font-family="sans-serif">「インターネット誕生日」</text>
  <text x="305" y="292" fill="#aaa" font-size="10" font-family="sans-serif">核耐性の言及: なし</text>
  <!-- Internet box -->
  <rect x="560" y="55" width="200" height="100" rx="8" fill="${BOX}" stroke="${ACCENT3}" stroke-width="1.5"/>
  <text x="660" y="78" text-anchor="middle" fill="${ACCENT3}" font-size="13" font-weight="bold" font-family="sans-serif">インターネット</text>
  <text x="575" y="98" fill="${TEXT}" font-size="11" font-family="sans-serif">ネットワークのネットワーク</text>
  <text x="575" y="116" fill="${TEXT}" font-size="11" font-family="sans-serif">普遍的な接続性</text>
  <text x="575" y="138" fill="${GREEN}" font-size="11" font-family="sans-serif">世界中に拡大</text>
  <!-- Arrow -->
  <line x1="510" y1="105" x2="558" y2="105" stroke="#aaa" stroke-width="2"/>
  <polygon points="556,100 568,105 556,110" fill="#aaa"/>
</svg>`;

// SVG: RFC culture
const svgRFCCulture = `<svg viewBox="0 0 800 320" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">RFC文化 — コミュニティによる協調設計</text>
  <!-- RFC concept -->
  <rect x="40" y="50" width="240" height="120" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1.5"/>
  <text x="160" y="74" text-anchor="middle" fill="${ACCENT1}" font-size="14" font-weight="bold" font-family="sans-serif">RFC 1 (1969年4月)</text>
  <text x="55" y="96" fill="${TEXT}" font-size="11" font-family="sans-serif">Steve Crockerが発行</text>
  <text x="55" y="114" fill="${TEXT}" font-size="11" font-family="sans-serif">「私たちの考えを共有します</text>
  <text x="55" y="130" fill="${TEXT}" font-size="11" font-family="sans-serif">批判・改善案をください」</text>
  <text x="55" y="152" fill="${ACCENT1}" font-size="12" font-weight="bold" font-family="sans-serif">Request for Comments</text>
  <!-- Key features -->
  <rect x="320" y="50" width="440" height="120" rx="8" fill="${BOX}" stroke="${GREEN}" stroke-width="1.5"/>
  <text x="540" y="74" text-anchor="middle" fill="${GREEN}" font-size="13" font-weight="bold" font-family="sans-serif">RFC文化の特徴</text>
  <text x="335" y="96" fill="${TEXT}" font-size="11" font-family="sans-serif">誰でも提案できる（学生も研究者も）</text>
  <text x="335" y="114" fill="${TEXT}" font-size="11" font-family="sans-serif">採用は実装と合意によって決まる</text>
  <text x="335" y="132" fill="${TEXT}" font-size="11" font-family="sans-serif">失敗したRFCも記録として残る</text>
  <text x="335" y="152" fill="${GREEN}" font-size="12" font-weight="bold" font-family="sans-serif">権威による押し付けではなく合意形成</text>
  <!-- Legacy -->
  <rect x="40" y="198" width="720" height="100" rx="8" fill="${BOX}" stroke="${ACCENT3}" stroke-width="1"/>
  <text x="400" y="220" text-anchor="middle" fill="${ACCENT3}" font-size="13" font-weight="bold" font-family="sans-serif">現代への継承</text>
  <rect x="60" y="234" width="200" height="50" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
  <text x="160" y="255" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">W3C / IETF / ISO</text>
  <text x="160" y="273" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">標準化団体の基本哲学</text>
  <rect x="300" y="234" width="200" height="50" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
  <text x="400" y="255" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">GitHubのPullRequest</text>
  <text x="400" y="273" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">RFCの精神の現代的継承</text>
  <rect x="540" y="234" width="200" height="50" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
  <text x="640" y="255" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">オープンソース文化</text>
  <text x="640" y="273" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">フラットな合意形成</text>
</svg>`;

// SVG: Why history accuracy matters
const svgHistoryMatters = `<svg viewBox="0 0 800 320" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">歴史の正確さがイノベーション政策に与える影響</text>
  <!-- Wrong narrative -->
  <rect x="40" y="50" width="340" height="220" rx="10" fill="${BOX}" stroke="${ACCENT2}" stroke-width="2"/>
  <text x="210" y="74" text-anchor="middle" fill="${ACCENT2}" font-size="14" font-weight="bold" font-family="sans-serif">神話に基づく主張（誤）</text>
  <text x="55" y="100" fill="${TEXT}" font-size="12" font-family="sans-serif">「インターネットは軍事技術の副産物」</text>
  <text x="55" y="124" fill="${TEXT}" font-size="11" font-family="sans-serif">↓ 「だから軍事研究に投資せよ」</text>
  <text x="55" y="148" fill="${ACCENT2}" font-size="11" font-family="sans-serif">問題: 基礎研究の価値が</text>
  <text x="55" y="166" fill="${ACCENT2}" font-size="11" font-family="sans-serif">「軍事応用」に矮小化される</text>
  <text x="55" y="192" fill="${TEXT}" font-size="11" font-family="sans-serif">ARPA予算承認に「安保貢献」が</text>
  <text x="55" y="210" fill="${TEXT}" font-size="11" font-family="sans-serif">必要だった → 意図的に</text>
  <text x="55" y="228" fill="${ORANGE}" font-size="11" font-family="sans-serif">narrative を利用した可能性</text>
  <text x="55" y="250" fill="#aaa" font-size="10" font-family="sans-serif">（論文・書籍での指摘）</text>
  <!-- Right narrative -->
  <rect x="420" y="50" width="340" height="220" rx="10" fill="${BOX}" stroke="${GREEN}" stroke-width="2"/>
  <text x="590" y="74" text-anchor="middle" fill="${GREEN}" font-size="14" font-weight="bold" font-family="sans-serif">正確な歴史に基づく主張</text>
  <text x="435" y="100" fill="${TEXT}" font-size="12" font-family="sans-serif">「研究者の問題解決が世界を変えた」</text>
  <text x="435" y="124" fill="${TEXT}" font-size="11" font-family="sans-serif">↓ 「基礎研究・実用研究への投資を」</text>
  <text x="435" y="148" fill="${GREEN}" font-size="11" font-family="sans-serif">「不便を解消しようとした</text>
  <text x="435" y="166" fill="${GREEN}" font-size="11" font-family="sans-serif">エンジニアの純粋な動機が</text>
  <text x="435" y="184" fill="${GREEN}" font-size="11" font-family="sans-serif">50年後の世界インフラになった」</text>
  <text x="435" y="214" fill="${TEXT}" font-size="11" font-family="sans-serif">→ より説得力のある</text>
  <text x="435" y="232" fill="${GREEN}" font-size="12" font-weight="bold" font-family="sans-serif">基礎研究投資の正当化</text>
</svg>`;

// SVG: Primary source verification
const svgPrimarySource = `<svg viewBox="0 0 800 320" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">一次資料が示す証拠</text>
  <!-- Document list -->
  <rect x="40" y="50" width="720" height="240" rx="8" fill="${BOX}" stroke="#444" stroke-width="1"/>
  <!-- 1966 proposal -->
  <rect x="60" y="68" width="680" height="42" rx="4" fill="#1a1a2e" stroke="${GREEN}" stroke-width="1"/>
  <text x="76" y="86" fill="${ACCENT1}" font-size="11" font-weight="bold" font-family="sans-serif">1966年 Bob Taylor &amp; Larry Roberts 提案書</text>
  <text x="76" y="102" fill="${TEXT}" font-size="11" font-family="sans-serif">「ARPA資金提供を受けた研究者間でコンピュータリソースを共有する」　核攻撃への言及: ゼロ</text>
  <!-- 1968 RFP -->
  <rect x="60" y="120" width="680" height="42" rx="4" fill="#1a1a2e" stroke="${ACCENT3}" stroke-width="1"/>
  <text x="76" y="138" fill="${ACCENT1}" font-size="11" font-weight="bold" font-family="sans-serif">1968年 ARPANET RFP（提案依頼書）</text>
  <text x="76" y="154" fill="${TEXT}" font-size="11" font-family="sans-serif">要件: 異種コンピュータの相互接続・信頼性・拡張性　軍事要件: ゼロ</text>
  <!-- 1969 BBN report -->
  <rect x="60" y="172" width="680" height="42" rx="4" fill="#1a1a2e" stroke="${ACCENT1}" stroke-width="1"/>
  <text x="76" y="190" fill="${ACCENT1}" font-size="11" font-weight="bold" font-family="sans-serif">1969年 BBN技術報告書 №1822（IMP仕様書）</text>
  <text x="76" y="206" fill="${TEXT}" font-size="11" font-family="sans-serif">詳細な技術仕様　核攻撃への言及: ゼロ　軍事要件: ゼロ</text>
  <!-- Cerf testimony -->
  <rect x="60" y="224" width="680" height="42" rx="4" fill="#1a1a2e" stroke="${ACCENT2}" stroke-width="1"/>
  <text x="76" y="242" fill="${ACCENT1}" font-size="11" font-weight="bold" font-family="sans-serif">Vint Cerf（TCP/IP共同発明者）証言</text>
  <text x="76" y="258" fill="${ACCENT2}" font-size="11" font-family="sans-serif">「核耐性はARPANETの設計目標ではなかった。この神話は後から貼り付けられたラベルだ」</text>
</svg>`;

// SVG: NSFNET commercialization
const svgNSFNET = `<svg viewBox="0 0 800 320" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">NSFNETへの移行と商業化 — 軍から公共インフラへ</text>
  <!-- Timeline -->
  <line x1="60" y1="140" x2="740" y2="140" stroke="#555" stroke-width="2"/>
  <!-- 1983 split -->
  <circle cx="120" cy="140" r="10" fill="${ACCENT2}"/>
  <text x="120" y="122" text-anchor="middle" fill="${ACCENT2}" font-size="10" font-weight="bold" font-family="sans-serif">1983</text>
  <text x="120" y="158" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">MILNET</text>
  <text x="120" y="172" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">分離</text>
  <text x="120" y="188" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">軍専用ネットに</text>
  <!-- 1986 NSFNET -->
  <circle cx="240" cy="140" r="10" fill="${ACCENT1}"/>
  <text x="240" y="122" text-anchor="middle" fill="${ACCENT1}" font-size="10" font-weight="bold" font-family="sans-serif">1986</text>
  <text x="240" y="158" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">NSFNET</text>
  <text x="240" y="172" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">構築</text>
  <text x="240" y="188" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">全米科学財団</text>
  <!-- 1990 ARPANET end -->
  <circle cx="380" cy="140" r="10" fill="${ACCENT3}"/>
  <text x="380" y="122" text-anchor="middle" fill="${ACCENT3}" font-size="10" font-weight="bold" font-family="sans-serif">1990</text>
  <text x="380" y="158" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">ARPANET</text>
  <text x="380" y="172" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">廃止</text>
  <text x="380" y="188" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">誰も気づかなかった</text>
  <!-- 1991-1995 commercialization -->
  <circle cx="540" cy="140" r="14" fill="${GREEN}"/>
  <text x="540" y="120" text-anchor="middle" fill="${GREEN}" font-size="10" font-weight="bold" font-family="sans-serif">1991〜95</text>
  <text x="540" y="160" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">商業化</text>
  <text x="540" y="176" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">民営化</text>
  <text x="540" y="192" text-anchor="middle" fill="${GREEN}" font-size="9" font-family="sans-serif">AOL・CompuServe</text>
  <!-- Today -->
  <circle cx="700" cy="140" r="12" fill="${ACCENT1}"/>
  <text x="700" y="120" text-anchor="middle" fill="${ACCENT1}" font-size="10" font-weight="bold" font-family="sans-serif">現在</text>
  <text x="700" y="158" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">世界共有</text>
  <text x="700" y="172" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">公共インフラ</text>
  <!-- Bottom insight -->
  <rect x="40" y="218" width="720" height="80" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1"/>
  <text x="400" y="240" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">「軍事技術の民間転用」という説の問題</text>
  <text x="60" y="262" fill="${TEXT}" font-size="11" font-family="sans-serif">正しい表現: 「研究者が自分たちの問題を解くために作ったものを、後に軍・民間が使うようになった」</text>
  <text x="60" y="282" fill="${GREEN}" font-size="12" font-weight="bold" font-family="sans-serif">→ 起源は純粋な工学的動機 → 軍事応用は後発</text>
</svg>`;

// Map SVGs to slides
// Existing SVGs at indices: 23 (network-topology), 31 (packet-vs-circuit), 36 (arpanet-1969), 46 (myth-propagation), 57 (innovation-drivers)
const svgMap: Record<number, string> = {
	// Part 1: myth spread
	3: svgMythFact, // あなたもこの話 1
	4: svgMythFact, // あなたもこの話 2
	5: svgInfoSpread, // 通説の広まり方 1
	6: svgInfoSpread, // 通説の広まり方 2
	7: svgBaranVsArpanet, // 神話の証拠 1
	8: svgBaranVsArpanet, // 神話の証拠 2
	// Part 2: real context
	9: svgColdWarContext, // スプートニク 1
	10: svgColdWarContext, // スプートニク 2
	11: svgLickliderVision, // Licklider 1
	12: svgLickliderVision, // Licklider 2
	13: svgLickliderVision, // IPTO 1
	14: svgLickliderVision, // IPTO 2
	15: svgThreeTerminals, // Bob Taylor 1
	16: svgThreeTerminals, // Bob Taylor 2
	17: svgThreeTerminals, // 本当の動機 1
	18: svgThreeTerminals, // 本当の動機 2
	// Part 3: Baran
	19: svgBaranVsArpanet, // バランの研究 1
	20: svgBaranVsArpanet, // バランの研究 2
	21: svgBaranVsArpanet, // バランと軍 1
	22: svgBaranVsArpanet, // バランと軍 2
	// 23 = existing SVG
	24: svgDonaldDavies, // Davies 1
	25: svgDonaldDavies, // Davies 2
	// Part 4: real design
	26: svgIMP, // 技術的課題 1
	27: svgIMP, // 技術的課題 2
	// 31 = existing SVG
	32: svgIMP, // IMP 1
	33: svgIMP, // IMP 2
	34: svgArpanetGrowth, // 1969年 lo 1
	35: svgArpanetGrowth, // 1969年 lo 2
	// 36 = existing SVG
	37: svgMythFact, // 核攻撃耐性は副産物 1
	38: svgMythFact, // 核攻撃耐性は副産物 2
	// Part 5: primary sources
	39: svgPrimarySource, // ARPA内部文書 1
	40: svgPrimarySource, // ARPA内部文書 2
	41: svgThreeTerminals, // Bob Taylor証言 1
	42: svgThreeTerminals, // Bob Taylor証言 2
	43: svgInfoSpread, // Where Wizards 1
	44: svgInfoSpread, // Where Wizards 2
	// 46 = existing SVG
	// Part 6: what ARPANET created
	47: svgEmailInvention, // Email 1
	48: svgEmailInvention, // Email 2
	49: svgRFCCulture, // RFC 1
	50: svgRFCCulture, // RFC 2
	51: svgTCPIP, // TCP/IP 1
	52: svgTCPIP, // TCP/IP 2
	53: svgNSFNET, // NSFNET 1
	54: svgNSFNET, // NSFNET 2
	// Part 7: why it matters
	55: svgHistoryMatters, // 神話化の影響 1
	56: svgHistoryMatters, // 神話化の影響 2
	// 57 = existing SVG
};

let modifiedCount = 0;
for (const [idxStr, svgContent] of Object.entries(svgMap)) {
	const idx = parseInt(idxStr);
	if (idx >= slides.length) continue;
	const before = slides[idx].content.join("");
	slides[idx] = addSvgFirst(slides[idx], svgContent) as (typeof slides)[0];
	const after = slides[idx].content.join("");
	if (before !== after) modifiedCount++;
}

writeFileSync(dataPath, JSON.stringify(data, null, "\t"), "utf-8");

const svgSlides = slides.filter((s: SlideData) =>
	s.content.some((c: string) => c.includes("<svg") || c.includes("assets/")),
);
console.log(
	`Done. Modified ${modifiedCount} slides. Total slides with SVG: ${svgSlides.length}/${slides.length} (${Math.round((svgSlides.length * 100) / slides.length)}%)`,
);
