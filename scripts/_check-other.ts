import { Glob } from "bun";
import { parse as parseYaml } from "yaml";

// 最新ルール（generate-index.tsと同期）
const RULES = [
	{
		id: "security",
		keywords:
			/セキュリティ|security|\bisms\b|hipaa|devsecops|oauth|saml|oidc|\bmfa\b|compliance|コンプライアンス|認証|認可|authz|guarduty|waf/i,
	},
	{
		id: "infra",
		keywords:
			/ケーブル|cable|半導体|semiconductor|splinternet|スプリンターネット|地政学|geopolitics|arpanet|データセンター|datacenter|accidental.standard|偶然.*標準|carbon.aware|炭素認識|グリーン.*ソフト|green.software/i,
	},
	{
		id: "science",
		keywords:
			/フェルミ|fermi|物理|physics|渋滞|traffic.jam|colony|コロニー|ベンフォード|benford|カオス|chaos|エントロピー|entropy|ゲーデル|godel|マクスウェル|maxwell|シュレーディンガー|schrodinger|スライム|slime|量子|quantum|タコ|octopus|フラクタル|fractal|素数|prime.num|p値|p-value|再現性|replication|宇宙.*構造|cosmic|シンプソン|simpsons|ティッピング|tipping.point|気候.*変動|climate.tip|リスク補償|risk.compensation/i,
	},
	{
		id: "thinking",
		keywords:
			/バイアス|bias|ディストピア|ユートピア|dystopia|utopia|確証|社会論|meiji|明治|jazz|ジャズ|improvisation|即興|デジタルツイン|digital.twin|倫理|ethics|エターナル|eternal.sept|マタイ.*効果|matthew.effect|コミュニティ.*死|pokemon|ポケモン.*都市|ゲーム.*産業|game.industry/i,
	},
	{
		id: "engineering",
		keywords:
			/モノリス|monolith|yagni|仕様書|技術選定|分散|distributed|spec.vs|spec-vs|リファクタリング|refactor|アーキテクチャ|architect|マイクロサービス|microservice|テセウス|theseus|コンウェイ|conway|都市計画|urban.plan|職人|shokunin|craftsmanship|agile|アジャイル|\bux\b|カーゴカルト|cargo.cult|グレシャム|gresham|コードベース|codebase|コードレビュー|code.review|プログラミング言語|programming.lang|law.as.code|法律.*コード|最適化|optimiz|写本.*コード|記憶の宮殿/i,
	},
	{
		id: "aws",
		keywords: /aws|iam|cognito|vpc|lambda|ネットワーキング|networking/i,
	},
	{
		id: "business",
		keywords:
			/oss|オープンソース|motivation|動機|フリーミアム|freemium|スタートアップ|startup|ビジネスモデル|ネットワーク効果|network.effect|情報.*非対称|information.asymmetr|起業家|entrepreneur|edison|post.scarcity|ポスト希少|無料.*コスト|true.cost|vibe.cod/i,
	},
	{
		id: "investment",
		keywords:
			/投資|為替|成長産業|forex|jpy|金融|finance|人民元|yuan|\bcny\b|paradox.of.thrift|倹約.*浪費/i,
	},
	{
		id: "career",
		keywords:
			/マネージメント|management|キャリア|年収|海外就業|部下|career|生産性|productivity/i,
	},
	{
		id: "ai",
		keywords:
			/ai|claude|web技術|技術トレンド|agent|llm|ソフトウェアエンジニア|テクノロジ|アプリケーション|rag|transformer|生成|産業革命/i,
	},
];

function classify(topic: string, slug: string): string {
	const text = `${topic} ${slug}`;
	for (const r of RULES) if (r.keywords.test(text)) return r.id;
	return "other";
}

const glob = new Glob("docs/*/slides.config.yaml");
const others: { slug: string; topic: string }[] = [];

for (const p of glob.scanSync()) {
	const dirName = p.split("/")[1];
	const slug = dirName.replace(/^\d{14}_/, "");
	const htmlGlob = new Glob(`docs/${dirName}/dist/*.html`);
	if (Array.from(htmlGlob.scanSync()).length === 0) continue;
	const config = parseYaml(await Bun.file(p).text()) as Record<string, unknown>;
	const topic = String(config.topic ?? dirName);
	const cat = classify(topic, slug);
	if (cat === "other") others.push({ slug, topic });
}

others.sort((a, b) => a.slug.localeCompare(b.slug));
for (const o of others) console.log(`${o.slug}\n  → ${o.topic}`);
console.log(`\nTotal: ${others.length}`);
