---
marp: true
theme: gaia
size: 16:9
paginate: true
---

<!-- _class: lead -->
# AWS Observability完全ガイド

- OpenTelemetry + CloudWatch + Grafana + X-Ray
- 開発者のためのフルスタック観測入門
- 2026年版 — 実践コマンド・設定例・コスト最適化

<!--
AWS Observabilityの全体像を体系的に学ぶ90枚スライド。Logs/Metrics/Tracesの三本柱からADOT/AMP/AMGまで実践的に解説。
-->

---

# アジェンダ (1/2)

- **Ch.1** — Observabilityとは（三本柱・全体像）
- **Ch.2** — Amazon CloudWatch基礎（Metrics/Logs/Alarms/RUM/Insights）
- **Ch.3** — AWS X-Ray 分散トレーシング（Segment/ServiceMap/サンプリング）
- **Ch.4** — OpenTelemetry on AWS — ADOT完全ガイド
- **Ch.5** — Amazon Managed Prometheus + Grafana


---

# アジェンダ (2/2)

- **Ch.6** — 実践パターン（Serverless/EKS/ECS/マルチアカウント）
- **Ch.7** — コスト最適化（ログ/メトリクス/トレース削減戦略）
- **Ch.8** — まとめ・ツール選択チートシート
- 各章に実践コマンド例・設定スニペット・試験頻出ポイントを収録
- 対象: 開発者（AWS認定 DevOps Pro / SysOps 対策にも活用可）


---

# Observabilityとは — 三本柱

- **Observability（可観測性）= システムの内部状態を外部出力から推測できる能力**
- **Logs（ログ）**: 離散的イベント記録。「何が起きたか」を詳細に記述
- **Metrics（メトリクス）**: 数値の時系列データ。「どの程度か」を定量化
- **Traces（トレース）**: リクエストの因果関係追跡。「どこで詰まったか」を可視化
- MonitoringとObservabilityの違い: Monitoring=既知の障害を検知、Observability=未知の問題を探索
- AWS実装: CW Logs / CW Metrics / X-Ray — ADOT（OpenTelemetry）で統合収集

<!--
Observabilityの定義はControl Theory由来。Honeycombのcharity.wtfが提唱した概念が業界標準に。
-->

---

# なぜObservabilityが重要か

- **マイクロサービス時代の課題**: サービス数増加 → 障害の原因特定が困難
- **MTTR短縮**: 平均復旧時間 2h → 20分（可観測性あり）— 業界調査
- **本番デバッグ**: ステージング再現不可の障害をトレースで直接診断
- **SLO管理**: エラーバジェット消費率を可視化 → リリース判断に活用
- **コスト最適化**: 使われていないリソース・ホットスポットを特定
- **セキュリティ**: 異常アクセスパターンを早期検知（GuardDuty + CloudWatch連携）


---

# AWS Observabilityフルスタック

![w:880 center](assets/observability-stack-overview.svg)


---

<!-- _class: lead -->
# Ch.2 Amazon CloudWatch基礎

- Metrics / Logs / Alarms / Dashboards
- Synthetics / RUM / Container Insights / Lambda Insights


---

# CloudWatch サービス構成マップ

![w:880 center](assets/cloudwatch-service-map.svg)


---

# CloudWatch Metrics — 基本概念

- **Namespace**: メトリクスの名前空間（例: `AWS/Lambda`, `AWS/ECS`, `MyApp/Orders`）
- **Dimension**: メトリクスの識別軸（例: FunctionName=my-func, Region=ap-northeast-1）
- **Resolution**: 標準（1分）vs 高解像度（1秒）— 高解像度は10倍コスト
- **Statistics**: Average/Sum/Min/Max/SampleCount/Percentile（p99など）
- **Retention**: 1秒→3時間, 1分→15日, 5分→63日, 1時間→15ヶ月（自動集約）
- AWS標準メトリクスは**無料**、カスタムメトリクスは$0.30/メトリクス/月（最初10,000無料）


---

# カスタムメトリクス — PutMetricData vs EMF

- **PutMetricData API**: 直接メトリクス送信（シンプルだが高コスト）
- **EMF（Embedded Metric Format）**: CloudWatch Logsに埋め込み → 自動でメトリクス生成（推奨）

```typescript
import { createMetricsLogger, Unit } from 'aws-embedded-metrics';

export const handler = async (event) => {
  const metrics = createMetricsLogger();
  metrics.setNamespace('MyApp/Orders');
  metrics.putDimensions({ Service: 'OrderAPI', Env: 'prod' });

  const start = Date.now();
  const result = await processOrder(event);
  const latency = Date.now() - start;

  metrics.putMetric('OrderLatency', latency, Unit.Milliseconds);
  metrics.putMetric('OrderSuccess', 1, Unit.Count);
  await metrics.flush(); // CloudWatch Logsへ書き込み
  return result;
};
```

<!--
EMFはLambda/ECS/EKSどこでも使える。CloudWatch Logs書き込みコストのみで済むため経済的。
-->

---

# CloudWatch Logs — 基本設定

- **ロググループ**: `/aws/lambda/<name>`, `/aws/eks/<cluster>/cluster` など
- **ログストリーム**: ロググループ内の時系列ストリーム（Lambdaは実行環境ごと）
- **保持期間設定**: Never Expire → 必ず設定（30日/90日/1年など）
- **ログクラス**: Standard（$0.50/GB）vs Infrequent Access（$0.25/GB、Insights使用不可）
- **サブスクリプションフィルター**: Firehose/Lambda/Kinesis へリアルタイム転送
- **メトリクスフィルター**: ログから自動でメトリクス生成（例: `ERROR` 出現カウント）


---

# CloudWatch Logs Insights — 実践クエリ

- Logs Insightsはサーバーレスクエリエンジン（$0.005/GBスキャン）

```bash
# Lambda エラー率分析
filter @message like /ERROR/
| stats count(*) as errors by bin(5m)
| sort @timestamp desc

# レイテンシ分析（p99）
filter @type = "REPORT"
| stats avg(@duration), percentile(@duration, 99) as p99
        by bin(1h)

# 相関ID追跡（構造化ログ）
filter correlationId = "abc-123"
| fields @timestamp, @message, service, statusCode
| sort @timestamp asc

# コールドスタート検出
filter @message like /Init Duration/
| parse @message '* ms' as initDuration
| stats avg(initDuration) by functionName
```


---

# CloudWatch Alarms — 設計パターン

- **単一アラーム**: メトリクス閾値 → OK / ALARM / INSUFFICIENT_DATA
- **複合アラーム（Composite）**: 複数アラームのAND/OR結合 → アラーム疲れ防止
- **Anomaly Detection**: 統計モデルで異常自動検知（閾値設定不要）
- **M of N評価**: N期間中M回違反で発火（スパイク誤検知防止）
- **アクション**: SNS → Lambda/PagerDuty, Auto Scaling, EC2 Actions, Systems Manager
- 試験TIP: `ALARM`状態 = 閾値超過、`INSUFFICIENT_DATA` ≠ アラーム（データ不足）


---

# CloudWatch Dashboards

- **ウィジェット種類**: Line/Number/Bar/Explorer/Log Table/Alarm Status/Text
- **クロスアカウント表示**: Organizations統合で複数アカウントを一画面に
- **共有ダッシュボード**: URL共有（認証なし）/ Cognito認証付き共有
- **自動ダッシュボード**: サービス別に自動生成（EC2/Lambda/DDB等）
- **Variable機能**: ダッシュボード変数でフィルタ切り替え（環境/リージョン等）
- コスト: 最初3ダッシュボード無料、以降 $3/ダッシュボード/月


---

# CloudWatch Synthetics + RUM

- **Synthetics（合成監視）**: Canaryスクリプト（Node.js/Python）で外形監視
-   - Heartbeat: URL応答確認（最もシンプル）
-   - API Canary: REST APIエンドポイント検証
-   - Broken Link Checker: リンク切れ検出
-   - Visual Monitoring: スクリーンショット比較
- **CloudWatch RUM（リアルユーザー監視）**:
-   - JSスニペット埋め込み → Core Web Vitals / JavaScript エラー収集
-   - LCP/FID/CLS/TTFB をリアルユーザーデータで計測
-   - X-Ray連携でバックエンドトレースとの紐付け可能


---

# Container Insights + Lambda Insights

- **Container Insights（EKS/ECS対応）**:
-   - ADOT/CloudWatch Agentで収集: CPU/Memory/Network/Disk/Pod数
-   - `/aws/containerinsights/<cluster>/performance` へ書き込み
-   - コスト: 約$0.50/ノード/月（概算）
- **Lambda Insights**:
-   - Lambda Layer追加で自動収集: init_duration/used_memory/cpu_total_time
-   - コールドスタート頻度・メモリ使用効率分析に最適
- **試験TIP**: Container Insights はデフォルト無効。eksctl/Console/CDKで明示的に有効化必要


---

<!-- _class: lead -->
# Ch.3 AWS X-Ray — 分散トレーシング

- Trace / Segment / Subsegment / ServiceMap
- Lambda / ECS / EKS 統合 / サンプリング戦略


---

# X-Ray 概念 — Trace構造

- **Trace**: 1リクエストのエンドツーエンドの記録（Trace ID で紐付け）
- **Segment**: サービス1つ分の処理記録（開始/終了時刻・HTTP情報・エラー）
- **Subsegment**: Segment内の細分（DDB呼び出し・外部HTTP・カスタム処理）
- **Annotation**: インデックス可能なキーバリュー（フィルタ検索に使用）
- **Metadata**: 非インデックスの追加情報（大きなオブジェクトも格納可）
- **X-Ray Trace Header**: `X-Amzn-Trace-Id: Root=1-xxx;Parent=yyy;Sampled=1`


---

# X-Ray Service Map

- **Service Map**: サービス間の依存関係グラフを自動生成
- 各ノードに表示される情報:
-   - 平均レイテンシ・リクエスト数/秒・エラー率
-   - Fault（5xx）/ Error（4xx）/ Throttle（429）を色分け
- **ServiceLens**: X-Ray Service Map + CloudWatch Metricsの統合ビュー
-   - メトリクス・ログ・トレースを1画面で確認
-   - SLA違反の原因を数クリックで特定
- **試験TIP**: X-Rayはデフォルトで**サンプリング**（全件記録ではない）→ コスト管理が必要


---

# X-Ray SDK vs X-Ray daemon vs ADOT

- **X-Ray SDK（旧来）**: AWS SDK直接依存、X-Ray固有API、AWS専用
- **X-Ray daemon**: UDP 2000番でセグメント受信 → X-Ray API転送（サイドカー/デーモン）
- **ADOT（OpenTelemetry）**: ベンダーニュートラル、OTLP gRPC/HTTP、X-Ray以外にも送信可
| 比較項目 | X-Ray SDK | ADOT |
| ベンダー依存 | AWS固有 | ベンダーニュートラル |
| Auto-instrument | 一部 | 充実（Java/Node.js/Python）|
| 推奨新規開発 | — | ✅ |
- **推奨**: 新規開発はADOT + OTLP。既存X-Ray SDKはそのまま使用可


---

# Lambda + X-Ray設定

- Active Tracing有効化でLambdaがX-Rayに自動でセグメントを送信

```typescript
# CDKでActive Tracing有効化
const fn = new lambda.Function(this, 'MyFn', {
  tracing: lambda.Tracing.ACTIVE, // PassThrough も選択可
  layers: [adotLayer],            // ADOT Layer追加
});

# Lambda Powertools (TypeScript) でサブセグメント作成
import { Tracer } from '@aws-lambda-powertools/tracer';
const tracer = new Tracer({ serviceName: 'OrderService' });

export const handler = tracer.captureLambdaHandler(async (event) => {
  const segment = tracer.getSegment();
  const subsegment = segment.addNewSubsegment('## fetchFromDB');
  try {
    const result = await db.getOrder(event.orderId);
    tracer.putAnnotation('orderId', event.orderId);
    tracer.putMetadata('orderDetails', result);
    return result;
  } finally { subsegment.close(); }
});
```


---

# ECS/Fargate + X-Ray サイドカー

- ECS TaskDefinitionにX-Ray daemonコンテナをサイドカーとして追加

```typescript
# ECS Task Definition (CDK)
const taskDef = new ecs.FargateTaskDefinition(this, 'Task');

// X-Ray daemon サイドカー
taskDef.addContainer('xray-daemon', {
  image: ecs.ContainerImage.fromRegistry(
    'amazon/aws-xray-daemon'
  ),
  portMappings: [{ containerPort: 2000, protocol: ecs.Protocol.UDP }],
  cpu: 32,
  memoryLimitMiB: 256,
  logging: ecs.LogDrivers.awsLogs({
    logGroup: new logs.LogGroup(this, 'XRayLogs'),
    streamPrefix: 'xray',
  }),
});

// アプリコンテナの環境変数
taskDef.addContainer('app', {
  environment: {
    AWS_XRAY_DAEMON_ADDRESS: 'xray-daemon:2000',
  },
});
```


---

# EKS + X-Ray (ADOT Collector)

- EKSではADOT Operator経由でCollectorを管理し、X-Ray Exporterへ転送

```yaml
# OpenTelemetryCollector CR (X-Ray exporter)
apiVersion: opentelemetry.io/v1alpha1
kind: OpenTelemetryCollector
metadata:
  name: adot-xray
spec:
  mode: daemonset
  serviceAccount: adot-collector  # IRSA設定済み
  config: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
    processors:
      batch:
        timeout: 1s
    exporters:
      awsxray:
        region: ap-northeast-1
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [batch]
          exporters: [awsxray]
```


---

# API Gateway + X-Ray統合

- **API Gateway X-Ray有効化**: Tracing → Active で全リクエストにTrace ID付与
- **Sampling Rule適用**: API GW → Lambda → DynamoDB の全ホップを追跡
- **注意点**: API Gateway自身のSegmentは「AWS::ApiGateway::Stage」として記録
- **HTTP API vs REST API**: 両方ともX-Ray対応、設定方法が若干異なる
- **CloudFront連携**: CloudFrontはX-Rayに対応（2023年以降、一部リージョン）
- 試験TIP: API Gatewayでのエラーは`Fault`（5xx）か`Error`（4xx）かで原因特定


---

# X-Ray アノテーションとメタデータ

- **Annotation vs Metadata の使い分け**:

```typescript
// Annotation: インデックス可能 → フィルタ/グループ化に使用
// 型: string/number/boolean のみ
tracer.putAnnotation('userId', userId);
tracer.putAnnotation('orderId', orderId);
tracer.putAnnotation('region', 'ap-northeast-1');

// Metadata: インデックス不可 → 詳細デバッグ情報
// 型: オブジェクト・配列も可（最大64KB）
tracer.putMetadata('requestPayload', event.body);
tracer.putMetadata('dbQueryPlan', queryPlan);

// X-Ray Console でAnnotationフィルタ
// annotation.userId = "user-123" AND annotation.env = "prod"

// X-Ray Groups でアノテーション条件グループ作成
// aws xray create-group --group-name "HighValueOrders"
//   --filter-expression 'annotation.orderValue > 10000'
```


---

# X-Ray Groups と Insights

- **X-Ray Groups**: フィルタ式でトレースをグループ化 → 個別にSamplingRule設定可
- **用途**: サービス別・エラー種別・高優先リクエスト別の分析
- **X-Ray Insights**: エラー急増・レイテンシ異常を自動検知 → SNS通知
-   - Anomaly Detection: 過去のパターンと比較して異常を検出
-   - Root Cause Analysis: 影響を受けたサービスの自動特定
-   - Impact Summary: 影響ユーザー数・リクエスト数の推計
- 試験TIP: X-Ray Insightsは**自動**で異常検知 → 手動アラーム設定不要


---

# X-Ray サンプリングルール

- サンプリングでコストを制御（デフォルト: 5%, 最大1TPS）

```bash
# カスタムサンプリングルール
aws xray create-sampling-rule \
  --sampling-rule '{
    "RuleName": "HighPriorityOrders",
    "Priority": 1,
    "ReservoirSize": 5,
    "FixedRate": 0.10,
    "URLPath": "/api/orders/*",
    "HTTPMethod": "POST",
    "ServiceName": "OrderService",
    "ServiceType": "AWS::Lambda::Function"
  }'

# ヘルスチェックを除外（サンプリング0%）
aws xray create-sampling-rule \
  --sampling-rule '{
    "RuleName": "ExcludeHealthCheck",
    "Priority": 1,
    "ReservoirSize": 0,
    "FixedRate": 0,
    "URLPath": "/health",
    "HTTPMethod": "GET"
  }'
```


---

# X-Ray + ServiceLens統合

- **ServiceLens** = X-Ray Service Map + CloudWatch Metrics + Logs の統合ビュー
- **ノードをクリック**すると表示される情報:
-   - Request rate / Fault rate / Error rate / Throttle rate
-   - 平均レイテンシ / p99レイテンシ
-   - 関連ログ（Logs Insightsへ遷移）
-   - 関連トレース（X-Ray Consoleへ遷移）
- **設定条件**: X-Ray Active Tracing有効 + サービスがX-Ray SDKまたはADOTを使用
- 試験TIP: ServiceLensはCloudWatchのコンソール内（X-Rayコンソールとは別）


---

# トレース分析パターン

- **レイテンシ分析**: 遅いSubsegmentを特定 → DDB/RDS/外部API呼び出しを疑う
- **N+1クエリ検出**: ループ内DB呼び出しがSegmentに多数のSubsegment生成
- **エラー伝播**: 上流エラーが下流Faultになる連鎖を可視化
- **Cold Start影響**: Lambda InitセグメントがTraceの先頭に表示
- **Throttling分析**: `ThrottleException` がSubsegmentに記録 → SQSでバッファリング検討
- **非同期フロー追跡**: SQS/SNS経由でもTrace IDを`AWSTraceHeader`属性で伝播可能


---

# X-Ray コスト最適化

- **X-Rayの料金構造**: 記録$5/1M, 取得$0.50/1M, スキャン$0.50/1Mセグメント
- **最初100万Trace/月は無料（Free Tier）**
- **コスト削減戦略**:
-   - サンプリング率を下げる（本番環境: 1〜5%が多い）
-   - ヘルスチェック・Ping URLをサンプリング0%に設定
-   - Reservoir（固定TPS）を適切に設定し、スパイク時のコスト増を抑制
-   - X-Ray Groups でフィルタ → 取得コストを削減
- **目安**: EKS 100Pod × 1000req/s → サンプリング1% → 約$30/月


---

<!-- _class: lead -->
# Ch.4 OpenTelemetry on AWS (ADOT)

- AWS Distro for OpenTelemetry
- Lambda / EKS / ECS 対応 — Java/Node.js/Python SDK実装


---

# OpenTelemetry概要

- **OpenTelemetry（OTel）**: CNCF（Cloud Native Computing Foundation）のObservability標準
- **目標**: Logs/Metrics/Tracesの収集・変換・エクスポートを統一API/SDKで実現
- **主要コンポーネント**:
-   - **API**: テレメトリ生成の抽象インターフェース（ベンダー非依存）
-   - **SDK**: APIの実装（言語ごと）
-   - **Collector**: エージェント/プロキシ（受信→処理→転送）
-   - **OTLP**: OpenTelemetry Line Protocol（gRPC/HTTP）
- **AWS ADOT**: AWSが管理するOTelディストリビューション（セキュリティパッチ・互換性保証）


---

# OTel三本柱とADOT配置

- **Traces**: OpenTelemetry TraceAPI → OTLP → ADOT Collector → X-Ray / Jaeger
- **Metrics**: OpenTelemetry MetricsAPI → OTLP → ADOT Collector → AMP / CW EMF
- **Logs**: OpenTelemetry LogsAPI → OTLP → ADOT Collector → CW Logs / S3
- **ADOT展開パターン**:
-   - Lambda: Lambda Layer（Extension）としてサイドカー展開
-   - EKS: DaemonSet / Sidecar / Deployment（用途に応じて選択）
-   - ECS: Sidecar コンテナとしてTask Definitionに追加
-   - EC2: systemdサービスとして起動


---

# ADOT Collectorアーキテクチャ

![w:880 center](assets/adot-architecture.svg)


---

# ADOT Collector設定 — フル構成例

- X-Ray + AMP + CloudWatch を同時に受信・転送する設定例

```yaml
receivers:
  otlp:
    protocols:
      grpc: { endpoint: 0.0.0.0:4317 }
      http: { endpoint: 0.0.0.0:4318 }
  prometheus:
    config:
      scrape_configs:
        - job_name: 'k8s-pods'
          kubernetes_sd_configs:
            - role: pod
processors:
  batch: { timeout: 5s, send_batch_size: 1000 }
  resourcedetection:
    detectors: [eks, ec2, env]
  filter/drop_health:
    spans:
      exclude:
        match_type: strict
        attributes:
          - { key: http.url, value: /health }
exporters:
  awsxray:  { region: ap-northeast-1 }
  awsemf:   { namespace: MyApp/Metrics, region: ap-northeast-1 }
  prometheusremotewrite:
    endpoint: https://aps-workspaces.../api/v1/remote_write
    auth: { authenticator: sigv4auth }
service:
  pipelines:
    traces:  { receivers: [otlp], processors: [batch,resourcedetection,filter/drop_health], exporters: [awsxray] }
    metrics: { receivers: [otlp,prometheus], processors: [batch], exporters: [awsemf,prometheusremotewrite] }
```


---

# Lambda + ADOT Layer

- Lambda LayerとしてADOTを追加 — 既存コードを変更せずに計装可能

```typescript
# CDK: ADOT Lambda Layer追加
const adotLayer = lambda.LayerVersion.fromLayerVersionArn(
  this, 'AdotLayer',
  `arn:aws:lambda:ap-northeast-1:901920570463:layer:\
   aws-otel-nodejs-amd64-ver-1-18-1:4`
);

const fn = new lambda.Function(this, 'Fn', {
  runtime: lambda.Runtime.NODEJS_20_X,
  handler: 'index.handler',
  layers: [adotLayer],
  environment: {
    AWS_LAMBDA_EXEC_WRAPPER: '/opt/otel-handler',
    OPENTELEMETRY_COLLECTOR_CONFIG_FILE:
      '/var/task/collector.yaml',
  },
  tracing: lambda.Tracing.ACTIVE,
});

// collector.yaml (Lambda内に配置)
// receivers: { otlp: {} }
// exporters: { awsxray: {}, awsemf: {} }
// service:
//   pipelines:
//     traces: { receivers: [otlp], exporters: [awsxray] }
```


---

# EKS + ADOT Operator

- ADOT Operatorは OpenTelemetryCollector CRDを提供 — Collector管理を自動化

```yaml
# ADOT Operator インストール
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm install opentelemetry-operator \
  open-telemetry/opentelemetry-operator \
  --namespace opentelemetry-operator-system

# Auto-instrumentation設定（Java自動計装）
apiVersion: opentelemetry.io/v1alpha1
kind: Instrumentation
metadata:
  name: java-instrumentation
spec:
  exporter:
    endpoint: http://adot-collector:4317
  propagators: [tracecontext, baggage, xray]
  sampler:
    type: parentbased_traceidratio
    argument: "0.05"  # 5%サンプリング
  java:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-java:latest

# PodにAnnotation追加だけで自動計装
metadata:
  annotations:
    instrumentation.opentelemetry.io/inject-java: "true"
```


---

# Java Auto-instrumentation

- **OTel Java Javaagent**: バイトコードインジェクションで自動計装（コード変更不要）
- **対応ライブラリ**: Spring Boot / Quarkus / gRPC / JDBC / Kafka / Redis / MongoDB etc.
- JVM起動オプションに `-javaagent` を追加するだけで動作

```dockerfile
# Dockerfile
FROM amazoncorretto:17
COPY opentelemetry-javaagent.jar /app/
COPY app.jar /app/

ENV JAVA_TOOL_OPTIONS="-javaagent:/app/opentelemetry-javaagent.jar"
ENV OTEL_EXPORTER_OTLP_ENDPOINT="http://adot-collector:4317"
ENV OTEL_RESOURCE_ATTRIBUTES="service.name=order-service,env=prod"
ENV OTEL_PROPAGATORS="tracecontext,baggage,xray"
ENV OTEL_TRACES_SAMPLER="parentbased_traceidratio"
ENV OTEL_TRACES_SAMPLER_ARG="0.05"

CMD ["java", "-jar", "/app/app.jar"]

# 計装される主なライブラリ（自動）
# Spring MVC / WebFlux / RestTemplate / WebClient
# JDBC / Hibernate / R2DBC
# AWS SDK v2（DynamoDB/S3/SQS）
```


---

# Node.js OpenTelemetry SDK

- Node.js SDKによる手動計装とAuto-instrumentation（`@opentelemetry/auto-instrumentations-node`）

```typescript
// tracing.ts (アプリ起動前にimport)
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { AWSXRayPropagator } from '@aws/aws-xray-propagator';
import { AWSXRayIdGenerator } from '@aws/aws-xray-id-generator';

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4317', // ADOT Collector
  }),
  instrumentations: [getNodeAutoInstrumentations()],
  idGenerator: new AWSXRayIdGenerator(),     // X-Ray互換ID
  textMapPropagator: new AWSXRayPropagator(), // X-Ray Trace Header
});

sdk.start(); // Express/Fastify/Koa が自動計装される
```


---

# Python OpenTelemetry SDK

- Python SDK + `opentelemetry-instrument` コマンドで最小変更で計装可能

```python
# pip install
# opentelemetry-sdk opentelemetry-exporter-otlp
# opentelemetry-instrumentation-flask
# opentelemetry-instrumentation-botocore
# aws-opentelemetry-distro

# tracing.py
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.propagators.aws import AwsXRayPropagator

provider = TracerProvider()
exporter = OTLPSpanExporter(endpoint='http://localhost:4317')
provider.add_span_processor(BatchSpanProcessor(exporter))
trace.set_tracer_provider(provider)

tracer = trace.get_tracer(__name__)

@app.route('/order', methods=['POST'])
def create_order():
    with tracer.start_as_current_span('create-order') as span:
        span.set_attribute('order.id', order_id)
        return process_order(request.json)
```


---

# カスタムSpanの作成

- **Span属性のベストプラクティス**: OpenTelemetry Semantic Conventions準拠

```typescript
import { trace, context, SpanStatusCode } from '@opentelemetry/api';
const tracer = trace.getTracer('payment-service', '1.0.0');

async function processPayment(paymentData: PaymentRequest) {
  // 手動Span作成
  return tracer.startActiveSpan('payment.process', async (span) => {
    try {
      // Semantic Conventions準拠の属性
      span.setAttributes({
        'payment.method': paymentData.method,
        'payment.amount': paymentData.amount,
        'payment.currency': paymentData.currency,
        'user.id': paymentData.userId,
        // HTTP Semantic Conventions
        'http.method': 'POST',
        'http.url': 'https://payment-provider.example',
      });
      const result = await callPaymentProvider(paymentData);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (err) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
      span.recordException(err); // スタックトレースを記録
      throw err;
    } finally { span.end(); }
  });
}
```


---

# Baggageによるコンテキスト伝播

- **Baggage**: サービス間をまたいで任意のキーバリューを伝播する仕組み
- **用途**: テナントID・機能フラグ・A/Bテストグループをトレース全体に伝播
- **注意**: Baggageは全ホップに転送される → 機密情報は入れない
- **X-Ray Annotation vs Baggage**: X-Ray Annotationはそのサービスのみ、Baggageは下流全体に伝播
- 実装: HTTPヘッダ `baggage: userId=user-123,feature=new-checkout` で伝播
- 受信側: `propagation.getBaggage(context.active()).getEntry('userId')`


---

# ADOT → AMP Exporter設定

- Amazon Managed PrometheusへSigV4認証付きでremote_write

```yaml
# ADOT Collector config.yaml (AMP exporter)
extensions:
  sigv4auth:
    region: ap-northeast-1
    service: aps

exporters:
  prometheusremotewrite:
    endpoint: https://aps-workspaces.ap-northeast-1.amazonaws.com/\
workspaces/ws-xxxxxxxx/api/v1/remote_write
    auth:
      authenticator: sigv4auth
    resource_to_telemetry_conversion:
      enabled: true
    tls:
      insecure: false

# Prometheus remote_write (代替方法)
# prometheus.yml
remote_write:
  - url: https://aps-workspaces.../api/v1/remote_write
    sigv4:
      region: ap-northeast-1
      # IAMロールはIRSAで付与
    queue_config:
      max_samples_per_send: 1000
      batch_send_deadline: 5s
```


---

# OTel vs AWS固有SDK — 選択基準

| シナリオ | 推奨 | 理由 |
| 新規開発（AWS環境） | **ADOT + OTel SDK** | 将来の移植性・Auto-instrument充実 |
| Lambda Powertools利用中 | **Powertools継続** | X-Ray統合済み・シンプル |
| マルチクラウド/ハイブリッド | **OTel SDK** | ベンダーロックイン回避 |
| X-Ray SDK既存コード | **既存継続** | 再実装コスト不要 |
| Prometheus既存環境 | **ADOT（Prom互換）** | スクレイプ設定をそのまま活用 |
- **結論**: 新規は迷わずADOT+OTel SDK。X-RayとPrometheusどちらにも送れる柔軟性


---

<!-- _class: lead -->
# Ch.5 Amazon Managed Prometheus + Grafana

- AMP (Amazon Managed Service for Prometheus)
- AMG (Amazon Managed Grafana) — セットアップ・ダッシュボード設計


---

# Amazon Managed Prometheus (AMP) 概要

- **AMP**: フルマネージドのPrometheusサービス（サーバー管理不要）
- **互換性**: Prometheus API完全互換（PromQL, recording rules, alerting rules）
- **スケール**: 数十億メトリクスを自動スケール（セルフホストでは困難な規模）
- **マルチAZ**: 高可用性レプリケーション（デフォルト）
- **セキュリティ**: VPCエンドポイント + SigV4認証 + IRSA
- **料金**: $0.90/GiB ingested + $0.03/GiB stored/月 + $0.01/DPM query（最初10GiB無料）


---

# AMP ワークスペース作成・IRSA設定

- AMPワークスペース作成とEKSからの書き込みIRSA設定

```bash
# AMP ワークスペース作成
aws amp create-workspace \
  --alias my-workspace \
  --region ap-northeast-1
# → workspaceId: ws-xxxxxxxx

# IRSA設定（ADOT Collector用）
eksctl create iamserviceaccount \
  --name adot-collector \
  --namespace monitoring \
  --cluster my-cluster \
  --attach-policy-arn \
    arn:aws:iam::aws:policy/AmazonPrometheusRemoteWriteAccess \
  --approve --override-existing-serviceaccounts

# 追加ポリシー（X-Ray + CW Logs用）
aws iam attach-role-policy \
  --role-name eksctl-my-cluster-addon-iamserviceacc-... \
  --policy-arn \
    arn:aws:iam::aws:policy/AWSXRayDaemonWriteAccess
```


---

# Prometheus recording rules でコスト最適化

- **recording rules**: 高頻度クエリを事前集計 → クエリコスト削減 + ダッシュボード高速化

```yaml
# AMP Alerting + Recording Rules
aws amp create-rule-groups-namespace \
  --workspace-id ws-xxxxxxxx \
  --name monitoring-rules \
  --data file://rules.yaml

# rules.yaml
groups:
  - name: recording_rules
    rules:
      # 5分集計でカーディナリティ削減
      - record: job:http_requests_total:rate5m
        expr: rate(http_requests_total[5m])
      - record: job:http_error_rate:rate5m
        expr: |
          rate(http_requests_total{status=~"5.."}[5m])
          / rate(http_requests_total[5m])
  - name: alerting_rules
    rules:
      - alert: HighErrorRate
        expr: job:http_error_rate:rate5m > 0.05
        for: 5m
        labels: { severity: critical }
        annotations:
          summary: "Error rate > 5%: {{ $value | humanize }}"
```


---

# Amazon Managed Grafana (AMG) 概要

- **AMG**: フルマネージドのGrafanaサービス（バージョン管理・プラグイン管理不要）
- **データソース**: AMP / CloudWatch / X-Ray / Athena / OpenSearch / Timestream など
- **認証**: IAM Identity Center (SSO) / SAML 2.0 / AWS Organizations連携
- **権限**: Admin / Editor / Viewer の3ロール
- **料金**: $9/active editor/月, $5/active viewer/月（2ユーザーまで無料）
- **Grafana Enterprise**: 追加プラグイン（Datadog/Splunk連携等）有料プランで利用可


---

# AMG セットアップ — IAM Identity Center連携

- **前提**: IAM Identity Center有効化（Organizations推奨）
- **手順**:
-   1. AMGワークスペース作成（Console / CLI）
-   2. 認証プロバイダーにIAM Identity Centerを選択
-   3. データソースをAWS managed（CW/X-Ray/AMP）で追加
-   4. IAM Identity Centerでユーザー/グループをワークスペースに割り当て
-   5. Grafanaコンソールにアクセス（SSO URL経由）
- **SAML統合**: Okta/Azure ADとSAML 2.0で連携可（Enterprise IdP利用時）


---

# Grafana データソース設定

- AMGでAMP/CloudWatch/X-Rayを設定し統合ダッシュボードを作成

```hcl
# Grafana as Code (Terraform)
resource "aws_grafana_workspace" "main" {
  name                     = "prod-observability"
  account_access_type      = "CURRENT_ACCOUNT"
  authentication_providers = ["AWS_SSO"]
  permission_type          = "SERVICE_MANAGED"
  data_sources = [
    "CLOUDWATCH",
    "PROMETHEUS",  # AMP
    "XRAY",
    "AMAZON_OPENSEARCH_SERVICE",
  ]
  role_arn = aws_iam_role.grafana.arn
}

# Grafana IAMロール（各データソースへのRead権限）
# AmazonGrafanaCloudWatchAccess
# AmazonPrometheusQueryAccess
# AWSXRayReadOnlyAccess
# + CloudFormation Stack IDからWorkspace IDを参照
```


---

# Grafana ダッシュボード設計ベストプラクティス

- **4 Golden Signals（SREの基本）**:
-   - **Latency**: リクエスト処理時間（p50/p95/p99）
-   - **Traffic**: リクエスト数/秒（RPS）
-   - **Errors**: エラー率（5xx/4xx 比率）
-   - **Saturation**: リソース使用率（CPU/Memory/Disk）
- **USE Method（インフラ向け）**: Utilization / Saturation / Errors
- **RED Method（サービス向け）**: Rate / Errors / Duration
- **ダッシュボード設計原則**: 上位概要 → ドリルダウン / 閾値線を表示 / 変数で環境切替


---

# Grafana アラート設定

- **Grafana Unified Alerting**: ダッシュボードパネルからアラート設定 → 通知チャンネルへ
- **Contact Points**: SNS / PagerDuty / Slack / OpsGenie / Webhook
- **Notification Policies**: ルーティングルール（severity/teamでグループ化）
- **Silences**: メンテナンス時間帯のアラーム抑制
- **評価間隔**: 1分 / 5分 / 15分 → PromQLクエリコストとのトレードオフ
- 試験TIP: AMGアラートはGrafana管理（CloudWatch Alarmsとは独立）— 重複に注意


---

# EKS監視ダッシュボード例

- **EKSダッシュボード構成（AMG + AMP）**:
-   - **Cluster Overview**: Node数・Pod数・Namespace別リソース使用量
-   - **Node Detail**: CPU/Memory使用率・Disk I/O・Network帯域
-   - **Pod Detail**: コンテナCPU/Memory・Restart回数・OOMKill検出
-   - **Deployment Health**: ReplicaSet状態・Rollout進捗
- **Grafana公式ダッシュボードID活用**:
-   - Dashboard ID 17682: Kubernetes All-in-one (AMP版)
-   - Dashboard ID 6417: Kubernetes Cluster (Prometheus)
-   - インポート → Grafana.comダッシュボードIDを入力するだけで即利用


---

# SLO/SLI/エラーバジェット管理

- **SLI（Service Level Indicator）**: 測定値（例: p99レイテンシ、エラー率）
- **SLO（Service Level Objective）**: 目標値（例: p99 < 500ms, 99.9%稼働）
- **エラーバジェット**: 1 - SLO目標値（99.9% SLO → 0.1%のエラーを許容）
- **Grafana SLO Plugin**: SLI/SLO定義 → エラーバジェット消費グラフを自動生成
- **PromQL例**: `1 - (sum(rate(http_errors[30d])) / sum(rate(http_requests[30d])))`
- 運用: エラーバジェット50%消費 → 開発凍結、100%消費 → SRE対応優先


---

# AMG vs セルフホストGrafana

| 比較項目 | Amazon Managed Grafana | セルフホスト |
| 運用負荷 | なし（マネージド） | 高（k8s/ECS管理） |
| バージョン管理 | AWS管理 | 自己管理 |
| HA構成 | 自動 | 手動設定必要 |
| プラグイン | 制限あり | 自由 |
| コスト（小規模）| $9/editor/月 | EC2/Fargate費用 |
| コスト（大規模）| ユーザー数比例 | 固定インフラ費 |
- **推奨**: 小〜中規模はAMG。大規模（50+ユーザー）はセルフホストが経済的な場合も


---

<!-- _class: lead -->
# Ch.6 実践パターン — ユースケース別構成

- Serverless / EKS / ECS / API Gateway / RDS / DynamoDB
- マルチアカウント / Observability as Code


---

# Serverless Observabilityアーキテクチャ

![w:880 center](assets/serverless-observability.svg)


---

# Lambda Powertools — 詳細実装

- **AWS Lambda Powertools**: SRE/DevOpsベストプラクティスをデコレータで提供

```typescript
import { Logger } from '@aws-lambda-powertools/logger';
import { Tracer } from '@aws-lambda-powertools/tracer';
import { Metrics, MetricUnits } from '@aws-lambda-powertools/metrics';

const logger = new Logger({ serviceName: 'OrderService', logLevel: 'INFO' });
const tracer = new Tracer({ serviceName: 'OrderService' });
const metrics = new Metrics({ namespace: 'MyApp', serviceName: 'OrderService' });

export const handler = tracer.captureLambdaHandler(
  logger.injectLambdaContext(
    metrics.logMetrics(
      async (event, context) => {
        logger.info('Processing order', { orderId: event.orderId });
        tracer.putAnnotation('orderId', event.orderId);

        const result = await processOrder(event);

        metrics.addMetric('OrderProcessed', MetricUnits.Count, 1);
        metrics.addDimension('PaymentMethod', event.paymentMethod);
        logger.info('Order completed', { result });
        return result;
      }
    )
  )
);
```


---

# EKS Observabilityスタック

![w:880 center](assets/eks-observability-stack.svg)


---

# ECS Fargate Observability

- **ECS Fargate固有の制約**: DaemonSet不可 → サイドカーコンテナで対応
- **ADOT Sidecar**: Task DefinitionにADOTコンテナを追加
- **FireLens（Fluent Bit）**: ECS標準のログルーターでCloudWatch/S3/Firehoseへ転送
- **Container Insights for ECS**: ECS ConsoleからInsights有効化 → CPU/Memory/Network自動収集
- **設定手順**:
-   1. Task定義にADOT sidecar追加（ports: 4317/4318）
-   2. アプリコンテナ環境変数: `OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317`
-   3. Task RoleにX-Ray/CW権限付与
-   4. ECS CloudWatch Container Insights有効化


---

# API Gateway + Lambda エンドツーエンドトレース

- **完全なトレースフロー**: Client → CloudFront → API GW → Lambda → DynamoDB
- **設定ポイント**:
-   - API GW: Tracing → Active （Stageleベルで設定）
-   - Lambda: ADOT Layer + X-Ray Active Tracing
-   - DynamoDB: AWS SDK v3はX-Ray自動計装（ADOT使用時）
- **Trace Header伝播**: `X-Amzn-Trace-Id` がAPI GW → Lambda自動伝播
- **Custom Domain**: Route 53 → ACM → API GW（この区間はX-Ray外）
- **API GW Access Logs**: `$context.xrayTraceId` でログとトレースを相関


---

# RDS / Aurora 監視

- **RDS Enhanced Monitoring**: OS/プロセスレベルメトリクス（1秒粒度、50指標以上）
- **Performance Insights（PI）**: クエリ別・待機イベント別のDB負荷可視化（7日間無料）
- **CloudWatch RDS Metrics**: CPU/FreeableMemory/DatabaseConnections/ReadLatency
- **PI + X-Ray連携**: アプリトレースのDB Subsegmentとクエリを紐付け
- **推奨アラーム**:
-   - DatabaseConnections > max_connections × 0.8
-   - FreeStorageSpace < 10GB
-   - ReadLatency > 50ms（OLTP目安）
- 試験TIP: Performance InsightsはRDS Pro / Aurora標準（追加料金なし期間あり）


---

# DynamoDB 監視

- **主要メトリクス**: SuccessfulRequestLatency / SystemErrors / UserErrors / ThrottledRequests
- **ConsumedRCU/WCU**: プロビジョンドモードでは上限を監視してスロットリング防止
- **Contributor Insights**: 頻繁にアクセスされるPK/SKを特定（ホットパーティション検出）
- **DDB Streams + Lambda**: 変更イベントをトレースに含めることでデータフロー可視化
- **CloudWatch Alarms推奨**:
-   - ThrottledRequests > 0 → キャパシティ増強またはDAX導入検討
-   - SystemErrors > 0 → AWS側問題（自動回復待ち）
- 試験TIP: UserErrorsは4xx（アプリのバグ）、SystemErrorsは5xx（AWSインフラ）


---

# SQS / SNS / EventBridge 監視

- **SQS重要メトリクス**:
-   - `ApproximateAgeOfOldestMessage`: 最古メッセージ滞留時間（処理遅延の指標）
-   - `ApproximateNumberOfMessagesNotVisible`: 処理中メッセージ数
-   - `NumberOfMessagesSent` / `NumberOfMessagesDeleted`
- **DLQ監視**: `ApproximateNumberOfMessagesVisible > 0` でアラーム → 処理失敗の検知
- **EventBridge失敗検知**: ルールのターゲット失敗 → Dead Letter Queue + CloudWatch
- **X-Rayトレース伝播**: SQS経由でも `AWSTraceHeader` 属性でTrace IDを伝播可能


---

# 相関IDと構造化ログ設計

- **相関ID（Correlation ID）**: リクエストを横断して追跡するためのユニークID

```typescript
// 構造化ログ設計（JSON形式）
const logger = new Logger({
  serviceName: 'OrderService',
  persistentLogAttributes: {
    environment: process.env.ENV,
    version: process.env.SERVICE_VERSION,
  },
});

// X-Ray Trace IDを相関IDとして自動付与（Powertools）
// 出力例:
// {
//   "level": "INFO",
//   "service": "OrderService",
//   "timestamp": "2026-02-19T04:43:39.000Z",
//   "xray_trace_id": "1-65d33c7f-...",
//   "correlation_id": "req-uuid-abc123", // カスタム相関ID
//   "cold_start": false,
//   "message": "Order processed",
//   "orderId": "order-456",
//   "userId": "user-789"
// }

// Logs Insightsで横断検索
// filter correlation_id = 'req-uuid-abc123'
```


---

# カスタムメトリクス設計比較

| 手法 | API | コスト | 用途 |
| PutMetricData | CW API直接 | 高 | シンプルな1件送信 |
| EMF（推奨） | CW Logs経由 | 低 | 複数メトリクス一括・Lambda |
| ADOT + awsemf | Collector経由 | 低 | EKS/ECS複雑なDimension |
| AMP + PromQL | AMP直接 | 中 | Prometheus互換環境 |
- **EMFが推奨される理由**:
-   - CW Logs書き込みコストのみ（PutMetricDataより大幅安）
-   - 1回の書き込みで複数メトリクス＋ログを同時送信
-   - Lambda/ECS/EKSどこでも同じSDKが動作


---

# アラート設計ベストプラクティス

- **アンチパターン**: 閾値多すぎ → アラーム疲れ（Alert Fatigue）
- **ベストプラクティス**:
-   - **症状ベースアラート**: 「CPUが80%」より「レスポンスタイムが遅い」
-   - **Composite Alarm**: 複数条件AND → 誤検知削減
-   - **M of N評価**: 一時的スパイクをフィルタ
-   - **Anomaly Detection**: 閾値チューニングなしで異常検知
-   - **Runbook URL**: アラームにRunbook/Playbookリンクを記載
-   - **オンコールローテーション**: PagerDuty / OpsGenie との連携必須


---

# AIOps — CloudWatch Anomaly Detection

- **Anomaly Detection**: 機械学習モデルで通常パターンを学習 → 逸脱を自動検知
- **設定方法**: メトリクスにAnomaly Detection Band を作成 → Alarmで使用
- **対応メトリクス**: CloudWatch標準 + カスタムメトリクス全て
- **学習期間**: 最低2週間のデータで精度向上（週次パターン・季節性を考慮）
- **Contributor Insights**: どのリソース/ユーザーが高負荷を引き起こしているか自動分析
- **Container Insights + Anomaly Detection**: EKS Pod異常を自動検知 → 自動スケール連携


---

# マルチアカウントObservability

- **CloudWatch Cross-account Observability**: Organizations統合で複数アカウントを一元化
- **Monitoring Account**: 中央ダッシュボード/アラーム管理アカウント
- **Source Accounts**: データを送信するワークロードアカウント
- **設定**: CloudFormation StackSetsで全アカウントに一括デプロイ
- **AMG Cross-account**: AMGワークスペースに複数アカウントのCW/AMP/X-Rayを追加
- **推奨アーキテクチャ**: 共有サービスアカウント（Monitoring）+ 本番/開発/ステージングを分離


---

# Observability as Code (CDK)

- 観測設定をCDKでコード管理 — ダッシュボード・アラーム・ログ保持を再現可能に

```typescript
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import { Dashboard, GraphWidget, Alarm } from 'aws-cdk-lib/aws-cloudwatch';

// ダッシュボードをCDKで定義
const dashboard = new Dashboard(stack, 'AppDashboard', {
  dashboardName: 'OrderService-Production',
});

dashboard.addWidgets(
  new GraphWidget({
    title: 'Order Latency (p99)',
    left: [orderFn.metricDuration({ statistic: 'p99' })],
  }),
  new GraphWidget({
    title: 'Error Rate',
    left: [orderFn.metricErrors({ period: Duration.minutes(1) })],
  })
);

// アラームもコードで管理
const errorAlarm = new Alarm(stack, 'ErrorAlarm', {
  metric: orderFn.metricErrors(),
  threshold: 5,
  evaluationPeriods: 3,
  datapointsToAlarm: 2, // 3of2
  treatMissingData: TreatMissingData.NOT_BREACHING,
});
```


---

<!-- _class: lead -->
# Ch.7 コスト最適化

- CloudWatch Logs / Metrics / X-Ray / AMP/AMG
- S3アーカイブ / ROI計算


---

# Observabilityコスト構造マップ

![w:880 center](assets/observability-cost-map.svg)


---

# CloudWatch Logs コスト削減

- **最大の節約ポイント: 保持期間設定**（Never Expire → 30日で最大90%削減）
- **Infrequent Access (IA) クラス**: 収集コスト50%削減（Logs Insights検索は不可）
-   - 用途: アーカイブ用途・後日分析しないログ
- **Subscription Filter + Firehose → S3**: 長期保存はS3へ（$0.023/GB vs $0.03/GB）
- **ログレベル制御**: Lambda環境変数 `POWERTOOLS_LOG_LEVEL=WARN` で本番INFO抑制
- **CloudWatch Logs Insights コスト**: スキャン量に比例 → 時間範囲を絞る・パーティションキー使用


---

# カスタムメトリクス コスト最適化

- **無料枠を最大活用**: AWS標準メトリクス（EC2/Lambda/RDS）は完全無料
- **カスタムメトリクス削減**:
-   - Dimension数を減らす（High Cardinality避ける）
-   - EMFで複数メトリクスを1 PutLogEvents に集約
-   - 不要なカスタムメトリクスをAWS Console → Metricsから削除
- **高解像度（1秒）は慎重に**: 1分解像度メトリクスの10倍コスト
- **Container Insights**: `--set containerLogs.enabled=false` で不要ログ無効化
- 試験TIP: カスタムメトリクスの課金は「ユニークなメトリクス名+Dimensionの組合せ」単位


---

# X-Ray サンプリング戦略

- サンプリング設定でコスト制御（本番環境の推奨設定）

```bash
# 本番環境向けサンプリングルール設計
# 優先度1: ヘルスチェックを除外
aws xray create-sampling-rule --sampling-rule '{
  "RuleName": "ExcludeHealthCheck",
  "Priority": 1,
  "ReservoirSize": 0,
  "FixedRate": 0,
  "URLPath": "/health",
  "HTTPMethod": "*"
}'

# 優先度2: 高価値APIは5%サンプリング
aws xray create-sampling-rule --sampling-rule '{
  "RuleName": "PaymentAPI",
  "Priority": 2,
  "ReservoirSize": 10,
  "FixedRate": 0.05,
  "URLPath": "/api/payments/*",
  "ServiceName": "PaymentService"
}'

# デフォルト(優先度10000): 1%サンプリング
# ReservoirSize: 1 (TPS), FixedRate: 0.01
# コスト試算: 1000req/s × 1% × 3600 × 24 × 30 = 259.2万/月 → $13/月
```


---

# AMP/AMG コスト最適化

- **AMP削減策**:
-   - Recording Rulesで高頻度メトリクスをダウンサンプリング（15秒 → 5分集計）
-   - `label_drop` / `metric_relabel_configs` で不要ラベル削除
-   - 不要なScrape Targetを除外（`drop` action）
-   - ストレージ保持期間をデフォルト150日 → 実情に合わせて短縮
- **AMG削減策**:
-   - Viewerは共有ダッシュボード（Public/Embed）で対応 → ユーザーコスト削減
-   - 不使用ワークスペースの削除（$0でも残しておくと将来課金の原因に）
- **AMP vs CloudWatch Metrics**: 既存Prometheusスタックがある場合はAMP。なければCWメトリクスが設定シンプル


---

# S3 + Athena ログコールドストレージ

- **アーキテクチャ**: CW Logs → Subscription Filter → Kinesis Firehose → S3（Parquet変換）→ Athena
- **コスト比較（1TB/月のログ）**:
-   - CloudWatch Logs保存: $30/TB/月
-   - S3 Standard: $23/TB/月
-   - S3 Glacier Instant: $4/TB/月
-   - S3 Glacier Deep Archive: $0.99/TB/月
- **Athena でのアドホック分析**: $5/TBスキャン（列形式Parquetで最大90%削減）
- **ライフサイクルルール**: 30日 → Standard-IA → 90日 → Glacier → 365日 → Deep Archive


---

# Observabilityコスト計算例

- **中規模Webアプリ（EKS 20Node、Lambda 500万リクエスト/月）の概算**:
| サービス | 用途 | 月額概算 |
| CW Logs | アプリログ 50GB/月 | $25 |
| CW Metrics | カスタム300個 | $87 |
| X-Ray | 1%サンプリング | $15 |
| Container Insights | 20Node | $10 |
| Lambda Insights | 500万req | $5 |
| AMP | 5GiB/日 ingested | $135 |
| AMG | 3 editors | $27 |
| **合計** | | **約$304/月** |


---

# コストアラーム設定

- Observability費用の予算超過を事前に検知する設定

```bash
# AWS Budgets でObservabilityコスト監視
aws budgets create-budget \
  --account-id $ACCOUNT_ID \
  --budget '{
    "BudgetName": "Observability-Monthly",
    "BudgetLimit": {"Amount": "500", "Unit": "USD"},
    "TimeUnit": "MONTHLY",
    "BudgetType": "COST",
    "CostFilters": {
      "Service": [
        "Amazon CloudWatch",
        "AWS X-Ray",
        "Amazon Managed Service for Prometheus",
        "Amazon Managed Grafana"
      ]
    }
  }' \
  --notifications-with-subscribers '[{
    "Notification": {
      "NotificationType": "ACTUAL",
      "ComparisonOperator": "GREATER_THAN",
      "Threshold": 80,
      "ThresholdType": "PERCENTAGE"
    },
    "Subscribers": [{"SubscriptionType": "SNS",
      "Address": "arn:aws:sns:..."}]
  }]'
```


---

# ROI計算 — Observabilityの投資対効果

- **コスト（例: $304/月 = $3,648/年）**
- **MTTR短縮効果**:
-   - 障害対応: 2時間 → 20分（-83%短縮）
-   - 月2回発生 × エンジニア2名 × $100/h = $280/月 × 12 = $3,360/年節約
- **予防効果**:
-   - 本番障害1件回避 = 売上損失$1,000〜$10,000相当
-   - 年間2件回避で$2,000〜$20,000相当
- **総ROI**: $(3,360 + 2,000〜20,000) / $3,648 = **1.5x〜6x**
- **結論**: Observabilityへの投資はほぼ確実にROIがプラス — コスト最適化しながら継続


---

<!-- _class: lead -->
# Ch.8 まとめ・ツール選択チートシート

- ツール選択指針 / 落とし穴 Top5
- DevOps Pro / SysOps 頻出パターン


---

# ツール選択チートシート

![w:880 center](assets/tools-cheatsheet.svg)


---

# よくある落とし穴 Top5

- **1. CloudWatch Logs保持期間「Never Expire」のまま放置**
-    → 必ず保持期間を設定（コスト爆発の主因）
- **2. 高解像度メトリクスを全部に適用**
-    → 標準解像度で十分なケースが多い（10倍コスト差に注意）
- **3. X-Rayでヘルスチェックをサンプリング100%**
-    → サンプリングルールでURLパスを除外設定
- **4. AMP Label Cardinality爆発**
-    → user_idをDimensionにしない（高カーディナリティ禁止）
- **5. アラーム設定後のRunbook未整備**
-    → アラーム = 誰かが起こされる → 必ず対応手順を明記


---

# 参考資料・次のステップ

- **公式ドキュメント**:
-   - [AWS Observability Best Practices](https://aws-observability.github.io/observability-best-practices/)
-   - [AWS One Observability Workshop](https://catalog.workshops.aws/observability/en-US)
-   - [Lambda Powertools](https://docs.powertools.aws.dev/lambda/typescript/)
-   - [OpenTelemetry AWS Distro](https://aws-otel.github.io/)
- **次のステップ**:
-   - AWS One Observability Workshopをハンズオン実践（無料）
-   - AWS DevOps Professional / SysOps Associate 試験でObservability問題を確認
-   - Production ReadinessをSREの観点でチェックリスト化

